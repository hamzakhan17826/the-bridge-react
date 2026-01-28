import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';

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

type ProfileFormData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  dateOfBirth: string;
  gender: string;
};

export default function UserProfile() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const [userId] = useState<string>(getUserIdFromToken() ?? '');

  const form = useForm<ProfileFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      dateOfBirth: '',
      gender: '',
    },
  });

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
  const countryInitializedRef = useRef(false);
  const cityInitializedRef = useRef(false);
  const watchedFirstName = useWatch({
    control: form.control,
    name: 'firstName',
  });
  const watchedLastName = useWatch({ control: form.control, name: 'lastName' });

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
        const formData = form.getValues();
        const emailChanged =
          formData.email.trim() !== (initialProfile?.email || '');
        const usernameChanged =
          formData.userName.trim() !== (initialProfile?.userName || '');
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
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            userName: formData.userName.trim(),
            email: formData.email.trim(),
            addressLine1: formData.addressLine1.trim(),
            addressLine2: formData.addressLine2.trim(),
            postalCode: formData.postalCode.trim(),
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
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

  const handleProfilePictureChange = (
    file: File | null,
    preview: string | null
  ) => {
    setProfilePictureFile(file);
    setProfilePicturePreview(preview);
  };

  useEffect(() => {
    if (profile && !initializedRef.current) {
      form.setValue('firstName', profile.firstName || '');
      form.setValue('lastName', profile.lastName || '');
      form.setValue('userName', profile.userName || '');
      form.setValue('email', profile.email || '');
      form.setValue('addressLine1', profile.addressLine1 || '');
      form.setValue('addressLine2', profile.addressLine2 || '');
      form.setValue('postalCode', profile.postalCode || '');
      form.setValue('dateOfBirth', profile.dateOfBirth || '');
      form.setValue(
        'gender',
        profile.gender === 'Male'
          ? 'M'
          : profile.gender === 'Female'
            ? 'F'
            : profile.gender || ''
      );
      initializedRef.current = true;
    }
  }, [profile, form]);

  // Separate effect for selectedCountry and selectedCity
  useEffect(() => {
    /* eslint-disable */
    if (
      profile?.countryId &&
      countries.length > 0 &&
      !countryInitializedRef.current
    ) {
      const country = countries.find((c) => c.id === profile.countryId);
      if (country) {
        setSelectedCountry({ value: country.id, label: country.name });
        countryInitializedRef.current = true;
      }
    }
    if (profile?.cityId && cities.length > 0 && !cityInitializedRef.current) {
      const city = cities.find((c) => c.id === profile.cityId);
      if (city) {
        setSelectedCity({ value: city.id, label: city.name });
        cityInitializedRef.current = true;
      }
    }
    /* eslint-enable */
  }, [profile, countries, cities]);

  const onSubmit = form.handleSubmit((data) => {
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

    pascalFd.append('UserName', data.userName.trim());

    appendIfChanged(
      'FirstName',
      data.firstName.trim(),
      initialProfile.firstName
    );
    appendIfChanged('LastName', data.lastName.trim(), initialProfile.lastName);
    appendIfChanged('Email', data.email.trim(), initialProfile.email);
    appendIfChanged(
      'AddressLine1',
      data.addressLine1.trim(),
      initialProfile.addressLine1
    );
    appendIfChanged(
      'AddressLine2',
      data.addressLine2.trim(),
      initialProfile.addressLine2
    );
    appendIfChanged(
      'PostalCode',
      data.postalCode.trim(),
      initialProfile.postalCode
    );
    appendIfChanged(
      'DateOfBirth',
      data.dateOfBirth,
      initialProfile.dateOfBirth
    );
    appendIfChanged('Gender', data.gender, initialProfile.gender);

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
  });

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
          fileInputRef={fileInputRef}
          handleProfilePictureUpload={handleProfilePictureUpload}
          firstName={watchedFirstName}
          lastName={watchedLastName}
        />

        <PersonalInfoSection register={form.register} />

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

        <AddressInfoSection register={form.register} />

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
