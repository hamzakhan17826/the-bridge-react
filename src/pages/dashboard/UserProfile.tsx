import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Upload, User, MapPin, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

type Opt<T = string> = { value: T; label: string };

export default function UserProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
          navigate('/login');
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
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Upload a new profile picture. Max size: 5MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={profilePicturePreview || profile?.profilePictureUrl}
                />
                <AvatarFallback>
                  {firstName?.[0]}
                  {lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
                {profilePictureFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {profilePictureFile.name} (
                    {(profilePictureFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Country</Label>
                <Select
                  value={selectedCountry}
                  onChange={(opt) => {
                    setSelectedCountry(opt ?? null);
                    setSelectedCity(null);
                  }}
                  options={countries.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  placeholder="Select country"
                  className="mt-1"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.375rem',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#9ca3af' },
                      '&:focus-within': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 1px #3b82f6',
                      },
                    }),
                  }}
                  isClearable
                />
              </div>
              <div>
                <Label>City</Label>
                <Select
                  value={selectedCity}
                  onChange={(opt) => setSelectedCity(opt ?? null)}
                  options={cities.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  placeholder={
                    selectedCountry ? 'Select city...' : 'Select country first'
                  }
                  className="mt-1"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.375rem',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#9ca3af' },
                      '&:focus-within': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 1px #3b82f6',
                      },
                    }),
                  }}
                  isDisabled={!selectedCountry}
                  isClearable
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

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

      {/* Password Change Modal - Placeholder for now */}
      {passwordModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Password change functionality to be implemented.</p>
              <Button
                onClick={() => setPasswordModalOpen(false)}
                className="mt-4"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
