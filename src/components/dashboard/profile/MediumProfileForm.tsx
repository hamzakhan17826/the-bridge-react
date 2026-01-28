import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import {
  useMediumProfile,
  type MediumProfileFormData,
  AvailabilityStatus,
} from '../../../hooks/useMediumProfile';

interface MediumProfileFormProps {
  // userId can be added later if needed
}

export default function MediumProfileForm({}: MediumProfileFormProps) {
  const form = useForm<MediumProfileFormData>({
    defaultValues: {
      specialty: '',
      tagline: '',
      focus: '',
      slug: '',
      availabilityStatus: AvailabilityStatus.Available,
      bio: '',
      philosophy: '',
      experienceInYears: undefined,
    },
  });

  const { registerMediumMutation, onSubmit } = useMediumProfile();

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Medium Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="specialty">Specialty *</Label>
              <Input
                id="specialty"
                {...form.register('specialty', {
                  required: 'Specialty is required',
                })}
                placeholder="e.g., Evidential Mediumship"
              />
              {form.formState.errors.specialty && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.specialty.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="tagline">Tagline *</Label>
              <Input
                id="tagline"
                {...form.register('tagline', {
                  required: 'Tagline is required',
                })}
                placeholder="Short professional tagline"
              />
              {form.formState.errors.tagline && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.tagline.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="focus">Focus *</Label>
              <Input
                id="focus"
                {...form.register('focus', { required: 'Focus is required' })}
                placeholder="e.g., Spirit Communication"
              />
              {form.formState.errors.focus && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.focus.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">Slug (Optional)</Label>
              <Input
                id="slug"
                {...form.register('slug')}
                placeholder="URL-friendly identifier"
              />
            </div>

            <div>
              <Label htmlFor="availabilityStatus">Availability Status *</Label>
              <Select
                value={form.watch('availabilityStatus')?.toString()}
                onValueChange={(value) =>
                  form.setValue('availabilityStatus', parseInt(value) as any)
                }
              >
                <SelectTrigger>
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
                  <SelectItem value={AvailabilityStatus.Unavailable.toString()}>
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
              <Label htmlFor="experienceInYears">Experience (Years)</Label>
              <Input
                id="experienceInYears"
                type="number"
                {...form.register('experienceInYears', { valueAsNumber: true })}
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...form.register('bio')}
              placeholder="Tell clients about your background and approach"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="philosophy">Philosophy</Label>
            <Textarea
              id="philosophy"
              {...form.register('philosophy')}
              placeholder="Share your spiritual philosophy or approach"
              rows={4}
            />
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
          Register as Medium
        </Button>
      </div>
    </form>
  );
}
