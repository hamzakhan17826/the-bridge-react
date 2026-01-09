import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SubmitButton from '../components/ui/SubmitButton';
import type { Country, City } from '../types/api';
import { fetchCountries, fetchCities } from '../services/register';
import { fetchUserProfile, updateUserProfile } from '../services/user-profile';
import type { AppUserProfile } from '../types/user';
import { useNavigate } from 'react-router-dom';
import { deleteCookie, emitAuthChange } from '../lib/auth';
import {
  ProfileHeader,
  ProfilePictureSection,
  PersonalInfoSection,
  LocationInfoSection,
  AddressInfoSection,
  PasswordChangeSection,
  PasswordChangeModal,
} from '../components/profile';
import { getUserIdFromToken } from '../lib/utils';

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

  // Password change modal states
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  // Profile picture states
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

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

  // Profile picture change handler
  const handleProfilePictureChange = (
    file: File | null,
    preview: string | null
  ) => {
    setProfilePictureFile(file);
    setProfilePicturePreview(preview);
  };

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

  // Select options are handled in LocationInfoSection component

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

    // Append profile picture if selected
    if (profilePictureFile) {
      pascalFd.append('ProfilePicture', profilePictureFile);
    }

    // If no changes, maybe don't submit
    if (pascalFd.entries().next().done) {
      toast.info('No changes detected.');
      return;
    }

    setSubmitting(true);
    const res = await updateUserProfile(pascalFd);
    setSubmitting(false);
    if (res.success) {
      const emailChanged = email.trim() !== (initialProfile?.email || '');
      const usernameChanged =
        userName.trim() !== (initialProfile?.userName || '');
      if (emailChanged || usernameChanged) {
        toast.success('Profile updated successfully! Please log in again.');
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
        toast.success(res.message);
        // Reload profile to show updated data
        const reloadRes = await fetchUserProfile(userId || null);
        if (reloadRes.success && reloadRes.data) {
          setProfile(reloadRes.data);
          setInitialProfile({ ...reloadRes.data });
          // Update controlled states if needed
          setFirstName(reloadRes.data.firstName || '');
          setLastName(reloadRes.data.lastName || '');
          setUserName(reloadRes.data.userName || '');
          setEmail(reloadRes.data.email || '');
          setAddressLine1(reloadRes.data.addressLine1 || '');
          setAddressLine2(reloadRes.data.addressLine2 || '');
          setPostalCode(reloadRes.data.postalCode || '');
          setDateOfBirth(reloadRes.data.dateOfBirth || '');
          setGender(reloadRes.data.gender || '');
          // Reset profile picture states
          setProfilePictureFile(null);
          setProfilePicturePreview(null);
        }
      }
    } else {
      toast.error(res.errors?.join(', ') || res.message);
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-linear-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Decorative orbs */}
      {/* <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-30 animate-pulse"></div> */}
      {/* <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse"></div> */}
      {/* <div className="absolute top-1/2 left-11/12 w-16 h-16 bg-pink-200 rounded-full opacity-25 animate-pulse"></div> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-4xl">
          <ProfileHeader />

          <div className="bg-white rounded-3xl shadow-2xl border border-primary-100 p-8 md:p-12">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your profile…</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <ProfilePictureSection
                  profile={profile}
                  profilePictureFile={profilePictureFile}
                  profilePicturePreview={profilePicturePreview}
                  onProfilePictureChange={handleProfilePictureChange}
                />

                <PersonalInfoSection
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  userName={userName}
                  setUserName={setUserName}
                  email={email}
                  setEmail={setEmail}
                  dateOfBirth={dateOfBirth}
                  setDateOfBirth={setDateOfBirth}
                  gender={gender}
                  setGender={setGender}
                />
              </div>

              {/* Location Information */}
              <LocationInfoSection
                countries={countries}
                cities={cities}
                selectedCountry={selectedCountry}
                selectedCity={selectedCity}
                onCountryChange={async (opt) => {
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
                onCityChange={(opt) => setSelectedCity(opt ?? null)}
                fetchCities={fetchCities}
              />

              {/* Address Information */}
              <AddressInfoSection
                addressLine1={addressLine1}
                setAddressLine1={setAddressLine1}
                addressLine2={addressLine2}
                setAddressLine2={setAddressLine2}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
              />

              {/* Change Password Section */}
              <PasswordChangeSection
                onOpenModal={() => setPasswordModalOpen(true)}
              />

              <div className="pt-6 border-t border-gray-200">
                <SubmitButton
                  text={submitting ? 'Saving Changes...' : 'Save Changes'}
                  className="w-full py-3 bg-linear-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </section>
  );
}
