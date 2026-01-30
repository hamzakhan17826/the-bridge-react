import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import SubmitButton from '../components/ui/SubmitButton';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCountries, useCities } from '../hooks/useRegister';
import { fetchCities } from '../services/register';
import type { AppUserProfile } from '../types/user';
import { logout } from '../lib/auth';
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
import { useAuthStore } from '../stores/authStore';
import { fetchUserProfile, updateUserProfile } from '../services/user-profile';

type Opt<T = string> = { value: T; label: string };

export default function UserProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const [userId] = useState<string>(getUserIdFromToken() ?? '');

  const { data: countries = [] } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Opt<number> | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<Opt<number> | null>(null);
  const { data: cities = [] } = useCities(selectedCountry?.value ?? null);

  const {
    data: profileResponse,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId || null),
    enabled: !!userId,
  });

  const profile: AppUserProfile | null = profileResponse?.data || null;

  // Keep auth-store user avatar in sync with latest profile.
  useEffect(() => {
    if (!profile) return;
    const currentUser = useAuthStore.getState().user;
    if (
      currentUser?.userId &&
      profile.userId &&
      currentUser.userId !== profile.userId
    ) {
      return;
    }
    if (profile.profilePictureUrl !== currentUser?.profilePictureUrl) {
      setUser({
        ...(currentUser ?? profile),
        profilePictureUrl: profile.profilePictureUrl,
      });
    }
  }, [profile, setUser]);
  const initialProfile = useMemo(
    () => (profile ? { ...profile } : null),
    [profile]
  );

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (res) => {
      if (res.success) {
        const emailChanged = email.trim() !== (initialProfile?.email || '');
        const usernameChanged =
          userName.trim() !== (initialProfile?.userName || '');
        if (emailChanged || usernameChanged) {
          toast.success('Profile updated successfully! Please log in again.');
          logout();
        } else {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
          // Since res.data is undefined, construct updated user from form
          const updatedUser: AppUserProfile = {
            ...initialProfile!,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            userName: userName.trim(),
            email: email.trim(),
            addressLine1: addressLine1.trim(),
            addressLine2: addressLine2.trim(),
            postalCode: postalCode.trim(),
            dateOfBirth,
            gender,
            countryId: selectedCountry?.value,
            cityId: selectedCity?.value,
            // profilePictureUrl will be updated after refetch
          };
          setUser(updatedUser);
          setProfilePictureFile(null);
          setProfilePicturePreview(null);
        }
      } else {
        toast.error(res.errors?.join(', ') || res.message);
      }
    },
    onError: (error) => {
      toast.error('Update failed: ' + error.message);
    },
  });

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

  const initializedRef = useRef(false);

  // Profile picture change handler
  const handleProfilePictureChange = (
    file: File | null,
    preview: string | null
  ) => {
    setProfilePictureFile(file);
    setProfilePicturePreview(preview);
  };

  useEffect(() => {
    if (profile && !initializedRef.current) {
      /* eslint-disable */
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setUserName(profile.userName || '');
      setEmail(profile.email || '');
      setAddressLine1(profile.addressLine1 || '');
      setAddressLine2(profile.addressLine2 || '');
      setPostalCode(profile.postalCode || '');
      setDateOfBirth(profile.dateOfBirth || '');
      setGender(profile.gender || '');
      /* eslint-enable */
      initializedRef.current = true;
    }
  }, [profile]);

  // Separate effect for selectedCountry
  useEffect(() => {
    if (profile?.countryId && countries.length > 0) {
      const country = countries.find((c) => c.id === profile.countryId);
      if (country) {
        /* eslint-disable */
        setSelectedCountry({ value: country.id, label: country.name });
        /* eslint-enable */
      }
    }
  }, [profile?.countryId, countries]);

  // Separate effect for selectedCity
  useEffect(() => {
    if (profile?.cityId && cities.length > 0) {
      const city = cities.find((c) => c.id === profile.cityId);
      if (city) {
        /* eslint-disable */
        setSelectedCity({ value: city.id, label: city.name });
        /* eslint-enable */
      }
    }
  }, [profile?.cityId, cities]);

  // Select options are handled in LocationInfoSection component

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile || !initialProfile || updateProfileMutation.isPending) return;
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

    updateProfileMutation.mutate(pascalFd);
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
            {profileLoading && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your profile…</p>
              </div>
            )}

            {profileError && (
              <div className="text-center py-8">
                <p className="text-red-600">
                  Error loading profile: {profileError.message}
                </p>
              </div>
            )}

            {!profileLoading && !profileError && (
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
                  onCountryChange={(opt) => {
                    setSelectedCountry(opt ?? null);
                    setSelectedCity(null);
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
                    text={
                      updateProfileMutation.isPending
                        ? 'Saving Changes...'
                        : 'Save Changes'
                    }
                    className="w-full py-3 bg-linear-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                  />
                </div>
              </form>
            )}
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
