import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';

import { logout } from '../lib/auth';
import { useCountries, useCities } from './useRegister';
import { useAuthStore } from '../stores/authStore';
import type { AppUserProfile } from '../types/user';
import { fetchUserProfile, updateUserProfile } from '../services/user-profile';

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

export function useProfile(
  userId: string,
  form: UseFormReturn<ProfileFormData>
) {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  const [selectedCountry, setSelectedCountry] = useState<Opt<number> | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<Opt<number> | null>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: profileResponse,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const response = await fetchUserProfile(userId || null);
      return response;
    },
    enabled: !!userId,
  });

  const profile = profileResponse?.data;

  // Keep auth-store user in sync with server profile for fields like profilePictureUrl.
  // This ensures AppSidebar updates after a successful profile-picture upload.
  useEffect(() => {
    if (!profile) return;
    const currentUser = useAuthStore.getState().user;
    if (
      currentUser?.userId &&
      profile.userId &&
      currentUser.userId !== profile.userId
    )
      return;
    if (profile.profilePictureUrl !== currentUser?.profilePictureUrl) {
      setUser({
        ...(currentUser ?? profile),
        profilePictureUrl: profile.profilePictureUrl,
      });
    }
  }, [profile, setUser]);

  const { data: countries = [] } = useCountries();
  const derivedCountry = (() => {
    if (!profile?.countryId) return null;
    const country = countries.find((c) => c.id === profile.countryId);
    return country
      ? ({ value: country.id, label: country.name } as Opt<number>)
      : null;
  })();

  const effectiveSelectedCountry = selectedCountry ?? derivedCountry;

  const { data: cities = [] } = useCities(
    effectiveSelectedCountry?.value ?? null
  );

  const derivedCity = (() => {
    if (!profile?.cityId) return null;
    const city = cities.find((c) => c.id === profile.cityId);
    return city ? ({ value: city.id, label: city.name } as Opt<number>) : null;
  })();

  const effectiveSelectedCity = selectedCity ?? derivedCity;

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
          logout();
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

  const handleProfilePictureChange = (
    file: File | null,
    preview: string | null
  ) => {
    setProfilePictureFile(file);
    setProfilePicturePreview(preview);
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

  return {
    profile,
    profileLoading,
    profileError,
    updateProfileMutation,
    selectedCountry: effectiveSelectedCountry,
    setSelectedCountry,
    selectedCity: effectiveSelectedCity,
    setSelectedCity,
    profilePictureFile,
    setProfilePictureFile,
    profilePicturePreview,
    setProfilePicturePreview,
    handleProfilePictureChange,
    handleProfilePictureUpload,
    fileInputRef,
    onSubmit,
    countries,
    cities,
  };
}

export type { ProfileFormData, Opt };
