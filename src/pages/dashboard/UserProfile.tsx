import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';

import { getUserIdFromToken } from '../../lib/utils';
import {
  ProfilePictureSection,
  PersonalInfoSection,
  LocationInfoSection,
  AddressInfoSection,
  PasswordChangeModal,
} from '../../components/dashboard/profile';
import { useProfile, type ProfileFormData } from '../../hooks/useProfile';

export default function UserProfile() {
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
    profile,
    profileLoading,
    profileError,
    updateProfileMutation,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    profilePictureFile,
    profilePicturePreview,
    handleProfilePictureUpload,
    fileInputRef,
    onSubmit,
    countries,
    cities,
  } = useProfile(userId, form);

  const initializedRef = useRef(false);
  const watchedFirstName = useWatch({
    control: form.control,
    name: 'firstName',
  });
  const watchedLastName = useWatch({ control: form.control, name: 'lastName' });

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

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

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
