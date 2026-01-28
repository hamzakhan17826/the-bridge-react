import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

import { deleteCookie, emitAuthChange } from '../../lib/auth';
import { getUserIdFromToken } from '../../lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCountries, useCities } from '../../hooks/useRegister';
import { useAuthStore } from '../../stores/authStore';
import type { AppUserProfile } from '../../types/user';
import {
  fetchUserProfile,
  updateUserProfile,
} from '../../services/user-profile';
import {
  ProfilePictureSection,
  PersonalInfoSection,
  LocationInfoSection,
  AddressInfoSection,
  PasswordChangeModal,
} from '../../components/dashboard/profile';

type Opt<T = string> = { value: T; label: string };

export default function UserProfile() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const [userId] = useState<string>(getUserIdFromToken() ?? '');

  const {
    data: profileResponse,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId || null),
    enabled: !!userId,
  });

  const profile = profileResponse?.data;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);

  const [selectedCountry, setSelectedCountry] = useState<Opt<number> | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<Opt<number> | null>(null);

  const { data: countries = [] } = useCountries();
  const { data: cities = [] } = useCities(selectedCountry?.value ?? null);

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
          deleteCookie('jwtToken');
          deleteCookie('refreshToken');
          deleteCookie('userRole');
          deleteCookie('auth');
          deleteCookie('sidebar_state');
          emitAuthChange();
          window.location.reload();
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

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

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
      setGender(
        profile.gender === 'Male'
          ? 'M'
          : profile.gender === 'Female'
            ? 'F'
            : profile.gender || ''
      );
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile || !initialProfile || updateProfileMutation.isPending) return;
    const pascalFd = new FormData();

    const appendIfChanged = (
      key: string,
      current: string | number | undefined,
      initial: string | number | undefined
    ) => {
      if (current !== initial) {
        pascalFd.append(key, current?.toString() || '');
      }
    };

    pascalFd.append('UserName', userName.trim());

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

    const currentCountryId = selectedCountry?.value;
    if (currentCountryId !== initialProfile.countryId) {
      pascalFd.append('CountryId', currentCountryId?.toString() || '');
    }
    const currentCityId = selectedCity?.value;
    if (currentCityId !== initialProfile.cityId) {
      pascalFd.append('CityId', currentCityId?.toString() || '');
    }

    pascalFd.append('ChangeEmailPreferencesKey', 'false');

    if (profilePictureFile) {
      pascalFd.append('ProfilePicture', profilePictureFile);
    }

    if (pascalFd.entries().next().done) {
      toast.info('No changes detected.');
      return;
    }

    updateProfileMutation.mutate(pascalFd);
  };

  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('Image size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        handleProfilePictureChange(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="text-red-500">
        Error loading profile: {profileError.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and personal information.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <ProfilePictureSection
          profile={profile}
          profilePictureFile={profilePictureFile}
          profilePicturePreview={profilePicturePreview}
          onProfilePictureChange={handleProfilePictureChange}
          fileInputRef={fileInputRef}
          handleProfilePictureUpload={handleProfilePictureUpload}
          firstName={firstName}
          lastName={lastName}
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
        />

        <AddressInfoSection
          addressLine1={addressLine1}
          setAddressLine1={setAddressLine1}
          addressLine2={addressLine2}
          setAddressLine2={setAddressLine2}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
        />

        <Separator />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {updateProfileMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Changes
          </Button>
        </div>
      </form>

      <PasswordChangeModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}
