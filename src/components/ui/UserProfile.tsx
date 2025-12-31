import { useEffect, useState } from 'react';
import Select from 'react-select';
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
import { deleteCookie, emitAuthChange } from '../../lib/auth';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Users,
  Home,
  Hash,
  Sparkles,
} from 'lucide-react';

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
  // const [emailModalOpen, setEmailModalOpen] = useState(false);
  // const [newEmail, setNewEmail] = useState('');
  // const [emailSubmitting, setEmailSubmitting] = useState(false);

  // Controlled states for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

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
        setEmail(res.data.email || '');
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
    appendIfChanged('Email', email.trim(), initialProfile.email);
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
    <section className="relative py-16 md:py-24 bg-linear-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative orbs */}
      {/* <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-pulse"></div> */}
      {/* <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div> */}
      {/* <div className="absolute top-1/2 left-11/12 w-16 h-16 bg-pink-200 rounded-full opacity-25 animate-pulse"></div> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              My Profile
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Manage Your Account
            </h1>
            <p className="text-gray-600 mt-2">
              Update your personal information and preferences
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 p-8 md:p-12">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your profile…</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      placeholder="Enter username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none"
                      >
                        <option value="">Select gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Location Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: '0.75rem',
                          borderColor: '#d1d5db',
                          '&:hover': { borderColor: '#9333ea' },
                          '&:focus-within': {
                            borderColor: '#9333ea',
                            boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.1)',
                          },
                          paddingLeft: '2.5rem',
                          minHeight: '48px',
                        }),
                        placeholder: (base) => ({ ...base, color: '#9ca3af' }),
                      }}
                      isClearable
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: '0.75rem',
                          borderColor: '#d1d5db',
                          '&:hover': { borderColor: '#9333ea' },
                          '&:focus-within': {
                            borderColor: '#9333ea',
                            boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.1)',
                          },
                          paddingLeft: '2.5rem',
                          minHeight: '48px',
                        }),
                        placeholder: (base) => ({ ...base, color: '#9ca3af' }),
                      }}
                      isDisabled={!selectedCountry}
                      isClearable
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Home className="w-5 h-5 text-purple-600" />
                  Address Information
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address Line 1
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="addressLine1"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                        placeholder="Enter address line 1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address Line 2
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="addressLine2"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                        placeholder="Enter address line 2 (optional)"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                        placeholder="Enter postal code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <SubmitButton
                  text={submitting ? 'Saving Changes...' : 'Save Changes'}
                  className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Email Change Modal */}
      {/*
      {emailModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 p-8 w-full max-w-md relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-200 rounded-full opacity-50"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-600" />
              Change Email
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newEmail.trim()) return;
                setEmailSubmitting(true);
                const userId = getUserIdFromToken();
                const token = getCookie('jwtToken');
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
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    placeholder="Enter new email address"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setEmailModalOpen(false);
                    setNewEmail('');
                  }}
                  className="px-6 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={emailSubmitting}
                  className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {emailSubmitting ? 'Sending...' : 'Send Verification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      */}
    </section>
  );
}
