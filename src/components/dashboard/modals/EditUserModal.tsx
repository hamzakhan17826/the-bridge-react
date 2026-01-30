import { useEffect, useRef, startTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { Loader2 } from 'lucide-react';
import { useEditUser } from '../../../hooks/useUsers';
import { useCountries, useCities } from '../../../hooks/useLocation';
import type {
  AppUsersBasicDataUser,
  EditUserFormData,
  EditUserResponse,
} from '../../../types/user';
import type { Country, City } from '../../../types/api';

interface EditUserModalProps {
  user: AppUsersBasicDataUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditUserModal({
  user,
  isOpen,
  onClose,
}: EditUserModalProps) {
  // const [profilePictureState, setProfilePictureState] = useState<{
  //   file: File | null;
  //   preview: string | null;
  // }>({
  //   file: null,
  //   preview: null,
  // });
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const hasPopulatedForm = useRef(false);
  const cityInitializedRef = useRef(false);
  const previousCountryId = useRef<number | undefined>(undefined);
  const { userData, isLoadingUser, updateUserMutation } = useEditUser(
    user?.id || ''
  );

  // Convert API response to form data format
  const convertToFormData = (response: EditUserResponse): EditUserFormData => {
    const user = response.users[0]; // Get the first (and only) user from the response
    return {
      userID: user.id,
      FirstName: user.firstName,
      LastName: user.lastName,
      UserName: user.userName,
      CountryId: user.countryId,
      CityId: user.cityId,
      AddressLine1: user.addressLine1,
      AddressLine2: user.addressLine2,
      PostalCode: user.postalCode,
      DateOfBirth: user.dateOfBirth || '',
      Gender: user.gender,
      IsDeleted: user.isDeleted,
      IsBlocked: user.isBlocked,
      ProfilePicture: null, // Initialize as null, user can upload new picture
    };
  };

  const form = useForm<EditUserFormData>({
    defaultValues: {
      userID: '',
      FirstName: '',
      LastName: '',
      UserName: '',
      CountryId: 0,
      CityId: 0,
      AddressLine1: '',
      AddressLine2: '',
      PostalCode: '',
      DateOfBirth: '',
      Gender: '',
      IsDeleted: false,
      IsBlocked: false,
      ProfilePicture: null,
    },
  });

  // Watch form values
  const genderValue = useWatch({
    control: form.control,
    name: 'Gender',
  });

  const countryIdValue = useWatch({
    control: form.control,
    name: 'CountryId',
  });

  const cityIdValue = useWatch({
    control: form.control,
    name: 'CityId',
  });

  const isBlockedValue = useWatch({
    control: form.control,
    name: 'IsBlocked',
  });

  const isDeletedValue = useWatch({
    control: form.control,
    name: 'IsDeleted',
  });

  const { data: countries = [] } = useCountries();
  const { data: cities = [] } = useCities(countryIdValue);

  // Profile picture upload handler
  // const handleProfilePictureUpload = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // Validate file type
  //     if (!file.type.startsWith('image/')) {
  //       toast.error('Please select a valid image file.');
  //       return;
  //     }
  //     // Validate file size (max 5MB)
  //     const maxSize = 5 * 1024 * 1024; // 5MB
  //     if (file.size > maxSize) {
  //       toast.error('Image size must be less than 5MB.');
  //       return;
  //     }
  //     // Create preview
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setProfilePictureState({
  //         file,
  //         preview: e.target?.result as string,
  //       });
  //       form.setValue('ProfilePicture', file);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Reset form when user changes
  useEffect(() => {
    if (user?.id) {
      // Reset form to default values when user changes
      startTransition(() => {
        form.reset({
          userID: '',
          FirstName: '',
          LastName: '',
          UserName: '',
          CountryId: 0,
          CityId: 0,
          AddressLine1: '',
          AddressLine2: '',
          PostalCode: '',
          DateOfBirth: '',
          Gender: '',
          IsDeleted: false,
          IsBlocked: false,
          ProfilePicture: null,
        });
      });
      hasPopulatedForm.current = false;
      cityInitializedRef.current = false;
      previousCountryId.current = undefined;

      // Reset profile picture state
      // startTransition(() => {
      //   setProfilePictureState({
      //     file: null,
      //     preview: null,
      //   });
      // });
    }
  }, [user?.id, form]);

  // Populate form when user data and cities are loaded (only once per user)
  useEffect(() => {
    if (
      userData &&
      user?.id &&
      cities.length > 0 &&
      !hasPopulatedForm.current
    ) {
      const formData = convertToFormData(userData);
      console.log('Converting userData to formData:', { userData, formData });
      // Populate the entire form at once
      startTransition(() => {
        form.reset(formData);
      });
      previousCountryId.current = formData.CountryId;
      hasPopulatedForm.current = true;
      cityInitializedRef.current = true;
    }
  }, [userData, user?.id, cities.length, form]);

  // Update cities when country changes
  useEffect(() => {
    if (countryIdValue !== previousCountryId.current) {
      previousCountryId.current = countryIdValue;
      form.setValue('CityId', 0); // Reset city when country changes
    }
  }, [countryIdValue, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log('Form data being submitted:', data);
    console.log('User data from API:', userData);

    // Use the userID from the API response, not from the form
    const correctUserId = userData?.users[0]?.id;
    if (!correctUserId) {
      console.error('No user ID available from API response');
      return;
    }

    const updateData = {
      ...data,
      userID: correctUserId, // Use the correct userID from API
    };

    console.log('Corrected data being sent:', updateData);

    try {
      const result = await updateUserMutation.mutateAsync(updateData);
      console.log('Update result:', result);

      // Only close modal if update was successful
      if (result.result === true) {
        onClose();
      }
      // If result is false, modal stays open and error toast is shown by the mutation
    } catch (error) {
      console.error('Update failed:', error);
      // Modal stays open on error
    }
  });

  const isLoading = isLoadingUser || updateUserMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dashboard-theme max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. Changes will be saved to the database.
          </DialogDescription>
        </DialogHeader>

        {isLoadingUser && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading user data...</span>
          </div>
        )}

        {!isLoadingUser && userData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Picture</h3>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      profilePictureState.preview ||
                      userData?.users[0]?.profilePictureUrl ||
                      '/placeholder-avatar.png'
                    }
                    alt="Profile Picture"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>

                  {profilePictureState.file && (
                    <p className="text-sm text-green-600">
                      Selected: {profilePictureState.file.name} (
                      {(profilePictureState.file.size / 1024 / 1024).toFixed(2)}{' '}
                      MB)
                    </p>
                  )}
                </div>
              </div>
            </div> */}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="FirstName">First Name</Label>
                <Input
                  id="FirstName"
                  {...form.register('FirstName', {
                    required: 'First name is required',
                  })}
                  placeholder="Enter first name"
                />
                {form.formState.errors.FirstName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.FirstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="LastName">Last Name</Label>
                <Input
                  id="LastName"
                  {...form.register('LastName', {
                    required: 'Last name is required',
                  })}
                  placeholder="Enter last name"
                />
                {form.formState.errors.LastName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.LastName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="UserName">Username</Label>
                <Input
                  id="UserName"
                  {...form.register('UserName', {
                    required: 'Username is required',
                  })}
                  placeholder="Enter username"
                />
                {form.formState.errors.UserName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.UserName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="Gender">Gender</Label>
                <Select
                  value={genderValue || ''}
                  onValueChange={(value) => form.setValue('Gender', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="DateOfBirth">Date of Birth</Label>
                <Input
                  id="DateOfBirth"
                  type="date"
                  {...form.register('DateOfBirth')}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Address Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="CountryId">Country</Label>
                  <Select
                    value={(countryIdValue || 0).toString()}
                    onValueChange={(value) =>
                      form.setValue('CountryId', parseInt(value, 10))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country: Country) => (
                        <SelectItem
                          key={country.id}
                          value={country.id.toString()}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="CityId">City</Label>
                  <Select
                    value={(cityIdValue || 0).toString()}
                    onValueChange={(value) =>
                      form.setValue('CityId', parseInt(value, 10))
                    }
                    disabled={!countryIdValue}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city: City) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="AddressLine1">Address Line 1</Label>
                  <Input
                    id="AddressLine1"
                    {...form.register('AddressLine1')}
                    placeholder="Enter address line 1"
                  />
                </div>

                <div>
                  <Label htmlFor="AddressLine2">Address Line 2</Label>
                  <Input
                    id="AddressLine2"
                    {...form.register('AddressLine2')}
                    placeholder="Enter address line 2"
                  />
                </div>

                <div>
                  <Label htmlFor="PostalCode">Postal Code</Label>
                  <Input
                    id="PostalCode"
                    {...form.register('PostalCode')}
                    placeholder="Enter postal code"
                  />
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Status Information</h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="IsBlocked"
                  checked={isBlockedValue || false}
                  onCheckedChange={(checked) =>
                    form.setValue('IsBlocked', checked as boolean)
                  }
                />
                <Label htmlFor="IsBlocked">Blocked</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="IsDeleted"
                  checked={isDeletedValue || false}
                  onCheckedChange={(checked) =>
                    form.setValue('IsDeleted', checked as boolean)
                  }
                />
                <Label htmlFor="IsDeleted">Deleted</Label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="btn">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update User
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
