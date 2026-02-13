import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { validateSecurity } from '@/lib/security';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type {
  AvailabilityStatusType,
  MediumProfileFormData,
} from '../../../types/medium';
import { AvailabilityStatus } from '../../../constants/enums';
import { useMediumProfile } from '../../../hooks/useMedium';

export default function MediumProfileForm() {
  const form = useForm<MediumProfileFormData>({
    defaultValues: {
      Specialty: '',
      Tagline: '',
      Focus: '',
      Slug: '',
      AvailabilityStatus: AvailabilityStatus.Available,
      Bio: '',
      ExperienceInYears: undefined,
      IsBookingEnabled: false,
      FocusAreaTitle1: '',
      FocusAreaDetails1: '',
      FocusAreaTitle2: '',
      FocusAreaDetails2: '',
      FocusAreaTitle3: '',
      FocusAreaDetails3: '',
      FocusAreaTitle4: '',
      FocusAreaDetails4: '',
    },
  });

  const availabilityStatus = useWatch({
    control: form.control,
    name: 'AvailabilityStatus',
  });

  const isBookingEnabled = useWatch({
    control: form.control,
    name: 'IsBookingEnabled',
  });

  const hasPopulatedForm = useRef(false);

  const {
    registerMediumMutation,
    onSubmit,
    error,
    isError,
    existingProfile,
    isLoadingProfile,
    convertToFormData,
  } = useMediumProfile();
  const queryClient = useQueryClient();
  // Populate form with existing profile data when available (only once)
  useEffect(() => {
    if (existingProfile && !hasPopulatedForm.current) {
      const formData = convertToFormData(existingProfile);
      form.reset(formData);
      hasPopulatedForm.current = true;
    }
  }, [existingProfile, convertToFormData, form]);

  // Reset population flag when profile data changes (after update)
  useEffect(() => {
    if (existingProfile) {
      hasPopulatedForm.current = false;
    }
  }, [existingProfile?.id, existingProfile]); // Only reset when the profile ID changes

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
    // Invalidate and refetch the medium profile query after successful submission
    queryClient.invalidateQueries({ queryKey: ['mediumProfile'] });
  });

  return (
    <>
      {isLoadingProfile && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading your profile...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isError && error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-destructive mb-2">
              Registration Failed
            </h3>
            <p className="text-sm text-destructive/80">
              {error?.message ||
                'An unexpected error occurred. Please try again.'}
            </p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Medium Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="Specialty">Speciality *</Label>
                <Input
                  id="Specialty"
                  {...form.register('Specialty', {
                    required: 'Specialty is required',
                    validate: validateSecurity,
                  })}
                  placeholder="e.g., Evidential Mediumship"
                />
                {form.formState.errors.Specialty && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.Specialty.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="Tagline">Tagline *</Label>
                <Input
                  id="Tagline"
                  {...form.register('Tagline', {
                    required: 'Tagline is required',
                    validate: validateSecurity,
                  })}
                  placeholder="Short professional tagline"
                />
                {form.formState.errors.Tagline && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.Tagline.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="Focus">Focus *</Label>
                <Input
                  id="Focus"
                  {...form.register('Focus', {
                    required: 'Focus is required',
                    validate: validateSecurity,
                  })}
                  placeholder="e.g., Spirit Communication"
                />
                {form.formState.errors.Focus && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.Focus.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="Slug">Slug (Optional)</Label>
                <Input
                  id="Slug"
                  {...form.register('Slug')}
                  placeholder="URL-friendly identifier"
                />
              </div>

              <div>
                <Label htmlFor="AvailabilityStatus">
                  Availability Status *
                </Label>
                <Select
                  value={availabilityStatus?.toString()}
                  onValueChange={(value) =>
                    form.setValue(
                      'AvailabilityStatus',
                      parseInt(value, 10) as AvailabilityStatusType
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select availability status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AvailabilityStatus.Available.toString()}>
                      Available
                    </SelectItem>
                    <SelectItem
                      value={AvailabilityStatus.Upcoming_Events.toString()}
                    >
                      Upcoming Events
                    </SelectItem>
                    <SelectItem
                      value={AvailabilityStatus.Book_Reading.toString()}
                    >
                      Book Reading
                    </SelectItem>
                    <SelectItem
                      value={AvailabilityStatus.Private_Sessions_Only.toString()}
                    >
                      Private Sessions Only
                    </SelectItem>
                    <SelectItem
                      value={AvailabilityStatus.Unavailable.toString()}
                    >
                      Unavailable
                    </SelectItem>
                    <SelectItem
                      value={AvailabilityStatus.Public_Sessions_Only.toString()}
                    >
                      Public Sessions Only
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ExperienceInYears">Experience (Years)</Label>
                <Input
                  id="ExperienceInYears"
                  type="number"
                  {...form.register('ExperienceInYears', {
                    valueAsNumber: true,
                  })}
                  placeholder="e.g., 5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="Bio">Bio</Label>
              <Textarea
                id="Bio"
                {...form.register('Bio', {
                  validate: validateSecurity,
                })}
                placeholder="Tell clients about your background and approach"
                rows={4}
              />
              {form.formState.errors.Bio && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.Bio.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="IsBookingEnabled"
                checked={!!isBookingEnabled}
                onCheckedChange={(checked) =>
                  form.setValue('IsBookingEnabled', checked === true)
                }
              />
              <Label htmlFor="IsBookingEnabled">Enable bookings</Label>
            </div>

            <div>
              <Label>Focus Areas (Optional)</Label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(
                  [
                    { title: 'FocusAreaTitle1', details: 'FocusAreaDetails1' },
                    { title: 'FocusAreaTitle2', details: 'FocusAreaDetails2' },
                    { title: 'FocusAreaTitle3', details: 'FocusAreaDetails3' },
                    { title: 'FocusAreaTitle4', details: 'FocusAreaDetails4' },
                  ] as const
                ).map((field, index) => (
                  <div key={field.title} className="space-y-2">
                    <Input
                      {...form.register(field.title, {
                        validate: validateSecurity,
                      })}
                      placeholder={`Focus Area ${index + 1} Title`}
                    />
                    {form.formState.errors[field.title] && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors[field.title]?.message}
                      </p>
                    )}
                    <Textarea
                      {...form.register(field.details, {
                        validate: validateSecurity,
                      })}
                      placeholder={`Focus Area ${index + 1} Details`}
                      rows={3}
                    />
                    {form.formState.errors[field.details] && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors[field.details]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={registerMediumMutation.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {registerMediumMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {existingProfile ? 'Update Profile' : 'Register as Medium'}
          </Button>
        </div>
      </form>
    </>
  );
}
