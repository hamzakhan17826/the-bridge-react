import { useEffect, useState } from 'react';
import Select from 'react-select';
import type { StylesConfig } from 'react-select';
import { toast } from 'react-toastify';
import SubmitButton from './SubmitButton';
import type { Country, City } from '../../types/types';
import { fetchCountries, fetchCities } from '../../services/register';
import {
  fetchUserProfile,
  updateUserProfile,
  getUserIdFromToken,
  type AppUserProfile,
} from '../../services/user-profile';
import { useNavigate } from 'react-router-dom';
import { deleteCookie, emitAuthChange, getCookie } from '../../lib/auth';
import { verifyChangeEmail } from '@/services/verify-change-email';

type Opt<T = string> = { value: T; label: string };

export default function UserProfile() {
  const navigate = useNavigate();
  const [userId] = useState<string>(getUserIdFromToken() ?? '');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Opt<number> | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<Opt<number> | null>(null);

  const [profile, setProfile] = useState<AppUserProfile | null>(null);
  const [initialProfile, setInitialProfile] = useState<AppUserProfile | null>(
    null
  );

  // Modal state
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  // Controlled states for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const singleStyles: StylesConfig<Opt<number>, false> = {};

  useEffect(() => {
    const init = async () => {
      const ctrs = await fetchCountries();
      setCountries(ctrs);
    };
    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetchUserProfile(userId || null);
      setLoading(false);
      if (res.success && res.data) {
        console.log('🚀 User profile loaded:', res.data);
        setProfile(res.data);
        setInitialProfile({ ...res.data }); // Store initial values for diff
        // Set controlled states
        setFirstName(res.data.firstName || '');
        setLastName(res.data.lastName || '');
        setUserName(res.data.userName || '');
        setAddressLine1(res.data.addressLine1 || '');
        setAddressLine2(res.data.addressLine2 || '');
        setPostalCode(res.data.postalCode || '');
        setDateOfBirth(res.data.dateOfBirth || '');
        setGender(res.data.gender || '');
      } else {
        toast.error(res.errors?.join(', ') || res.message);
      }
    };
    load();
  }, [userId]);

  useEffect(() => {
    const initSelections = async () => {
      if (!profile?.countryId) return;
      const cid = profile.countryId;
      const countryLabel = countries.find((c) => c.id === cid)?.name || '';
      setSelectedCountry({ value: cid, label: countryLabel });
      const data = await fetchCities(cid);
      setCities(data);
      if (profile.cityId) {
        const cityId = profile.cityId;
        const cityLabel = data.find((c) => c.id === cityId)?.name || '';
        setSelectedCity({ value: cityId, label: cityLabel });
      }
    };
    initSelections();
  }, [profile?.countryId, profile?.cityId, countries]);

  const countryOptions: Opt<number>[] = countries.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  const cityOptions: Opt<number>[] = cities.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile || !initialProfile || submitting) return;
    const pascalFd = new FormData();

    // Helper to append only if changed
    const appendIfChanged = (
      key: string,
      current: string | number | undefined,
      initial: string | number | undefined
    ) => {
      if (current !== initial) {
        pascalFd.append(key, current?.toString() || '');
      }
    };

    // Always send required fields
    pascalFd.append('UserName', userName.trim());

    // Compare and append changed fields
    appendIfChanged('FirstName', firstName.trim(), initialProfile.firstName);
    appendIfChanged('LastName', lastName.trim(), initialProfile.lastName);
    appendIfChanged(
      'AddressLine1',
      addressLine1.trim(),
      initialProfile.addressLine1
    );
    appendIfChanged(
      'AddressLine2',
      addressLine2.trim(),
      initialProfile.addressLine2
    );
    appendIfChanged('PostalCode', postalCode.trim(), initialProfile.postalCode);
    appendIfChanged('DateOfBirth', dateOfBirth, initialProfile.dateOfBirth);
    appendIfChanged('Gender', gender, initialProfile.gender);

    // For selects
    const currentCountryId = selectedCountry?.value;
    if (currentCountryId !== initialProfile.countryId) {
      pascalFd.append('CountryId', currentCountryId?.toString() || '');
    }
    const currentCityId = selectedCity?.value;
    if (currentCityId !== initialProfile.cityId) {
      pascalFd.append('CityId', currentCityId?.toString() || '');
    }

    // Always send email? But since read-only, and not changed, skip
    // pascalFd.append('Email', profile.email); // Skip if not changed

    // Always send this?
    pascalFd.append('ChangeEmailPreferencesKey', 'false');

    // If no changes, maybe don't submit
    if (pascalFd.entries().next().done) {
      toast.info('No changes detected.');
      return;
    }

    setSubmitting(true);
    const res = await updateUserProfile(pascalFd);
    setSubmitting(false);
    if (res.success) {
      toast.success(res.message);
      // Logout as per backend requirement, but without page refresh
      deleteCookie('jwtToken');
      deleteCookie('refreshToken');
      deleteCookie('userRole');
      deleteCookie('auth');
      deleteCookie('sidebar_state');
      emitAuthChange();
      // Navigate to login without refresh
      navigate('/login');
    } else {
      toast.error(res.errors?.join(', ') || res.message);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl p-6 md:p-8 mt-4">
            <h3 className="text-2xl md:text-3xl font-grotesk-bold mb-6">
              My Profile
            </h3>

            {loading && <p className="text-gray-600">Loading your profile…</p>}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-grotesk-light text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-grotesk-light text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Email (read-only)
                </label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    name="email"
                    value={profile?.email || ''}
                    readOnly
                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-16 bg-gray-50"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm border border-primary px-1 rounded-2xl text-primary hover:text-white hover:bg-primary cursor-pointer"
                    onClick={() => setEmailModalOpen(true)}
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-grotesk-light text-gray-700">
                    Country
                  </label>
                  <Select<Opt<number>, false>
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={async (opt) => {
                      setSelectedCountry(opt ?? null);
                      if (opt?.value) {
                        const data = await fetchCities(opt.value);
                        setCities(data);
                        setSelectedCity(null);
                      } else {
                        setCities([]);
                        setSelectedCity(null);
                      }
                    }}
                    placeholder="Select country..."
                    classNamePrefix="select"
                    className="mt-2"
                    styles={singleStyles}
                    isClearable
                  />
                </div>
                <div>
                  <label className="block font-grotesk-light text-gray-700">
                    City
                  </label>
                  <Select<Opt<number>, false>
                    options={cityOptions}
                    value={selectedCity}
                    onChange={(opt) => setSelectedCity(opt ?? null)}
                    placeholder={
                      selectedCountry
                        ? 'Select city...'
                        : 'Select country first'
                    }
                    classNamePrefix="select"
                    className="mt-2"
                    styles={singleStyles}
                    isDisabled={!selectedCountry}
                    isClearable
                  />
                </div>
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-grotesk-light text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-grotesk-light text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select…</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <SubmitButton
                text={submitting ? 'Saving…' : 'Save Changes'}
                className="w-full"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Email Change Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Change Email</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newEmail.trim()) return;
                setEmailSubmitting(true);
                const userId = getUserIdFromToken();
                const token = getCookie('jwtToken');
                console.log('userId, token, newEmail :', {
                  userId,
                  token,
                  newEmail,
                });
                if (!userId || !token) {
                  toast.error('Authentication required.');
                  setEmailSubmitting(false);
                  return;
                }
                const res = await verifyChangeEmail(
                  userId,
                  token,
                  newEmail.trim()
                );
                setEmailSubmitting(false);
                if (res.success) {
                  toast.success(res.message);
                  setEmailModalOpen(false);
                  setNewEmail('');
                } else {
                  toast.error(res.message);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  New Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter new email"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmailModalOpen(false);
                    setNewEmail('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={emailSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                  {emailSubmitting ? 'Sending...' : 'Send Verification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
