import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EventStatus, Tags } from '@/constants/enums';
import type { EventStatusValue, TagsValue } from '@/constants/enums';
import { validateSecurity } from '@/lib/security';

export type EventFormValues = {
  title: string;
  description: string;
  image: string;
  startDateTime: string;
  enrollmentDeadline?: string;
  isPublic: boolean;
  credits: number;
  tags: TagsValue[];
  status: EventStatusValue;
  zoomLink?: string;
  recordingAvailable: boolean;
};

type EventFormProps = {
  defaultValues: EventFormValues;
  initialImageUrl?: string | null;
  requireImage?: boolean;
  isSubmitting?: boolean;
  submitLabel: string;
  resetKey?: number;
  onSubmit: (values: EventFormValues, imageFile: File | null) => Promise<void>;
  extraActions?: ReactNode;
};

export default function EventForm({
  defaultValues,
  initialImageUrl,
  requireImage = false,
  isSubmitting = false,
  submitLabel,
  resetKey,
  onSubmit,
  extraActions,
}: EventFormProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(initialImageUrl ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({ defaultValues });

  const selectedTags = useWatch({ control, name: 'tags' });
  const isPublic = useWatch({ control, name: 'isPublic' });
  const recordingAvailable = useWatch({
    control,
    name: 'recordingAvailable',
  });
  const status = useWatch({ control, name: 'status' });

  const tagEntries = useMemo(
    () => Object.entries(Tags) as [string, TagsValue][],
    []
  );

  const statusEntries = useMemo(
    () => Object.entries(EventStatus) as [string, EventStatusValue][],
    []
  );

  useEffect(() => {
    reset(defaultValues);
    setSelectedImageFile(null);
    setSelectedImagePreview(initialImageUrl ?? null);
  }, [defaultValues, initialImageUrl, reset, resetKey]);

  const handleToggleTag = (
    tagValue: TagsValue,
    checked: boolean | 'indeterminate'
  ) => {
    const isChecked = checked === true;
    if (isChecked && (selectedTags?.length ?? 0) >= 5) {
      setError('tags', {
        type: 'max',
        message: 'Maximum 5 tags allowed.',
      });
      return;
    }
    const nextTags = isChecked
      ? Array.from(new Set([...(selectedTags ?? []), tagValue]))
      : (selectedTags ?? []).filter((tag) => tag !== tagValue);
    setValue('tags', nextTags, { shouldValidate: true });
    if (!isChecked || nextTags.length <= 5) {
      clearErrors('tags');
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setSelectedImageFile(null);
      setSelectedImagePreview(initialImageUrl ?? null);
      setValue('image', '', { shouldValidate: true });
      return;
    }

    setSelectedImageFile(file);
    setValue('image', file.name, { shouldValidate: true });
    clearErrors('image');

    const reader = new FileReader();
    reader.onload = () => setSelectedImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (values: EventFormValues) => {
    if (requireImage && !selectedImageFile) {
      setError('image', {
        type: 'required',
        message: 'Image is required.',
      });
      return;
    }
    await onSubmit(values, selectedImageFile);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Event title"
                {...register('title', {
                  required: 'Title is required',
                  validate: validateSecurity,
                })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min={0}
                {...register('credits', {
                  required: 'Credits are required',
                  valueAsNumber: true,
                })}
              />
              {errors.credits && (
                <p className="text-sm text-red-500">{errors.credits.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={6}
              placeholder="Event description"
              {...register('description', {
                required: 'Description is required',
                validate: validateSecurity,
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="image">Event Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded border bg-white">
                  {selectedImagePreview ? (
                    <img
                      src={selectedImagePreview}
                      alt="Selected event"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      No preview
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">
                    {selectedImageFile?.name ||
                      (initialImageUrl ? 'Current image' : 'No image chosen')}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {initialImageUrl ? 'Replace Image' : 'Upload Image'}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
              <input type="hidden" {...register('image')} />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={String(status)}
                onValueChange={(value) =>
                  setValue('status', Number(value) as EventStatusValue, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusEntries.map(([label, value]) => (
                    <SelectItem key={label} value={String(value)}>
                      {label.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDateTime">Start Date & Time</Label>
              <Input
                id="startDateTime"
                type="datetime-local"
                {...register('startDateTime', {
                  required: 'Start date is required',
                })}
              />
              {errors.startDateTime && (
                <p className="text-sm text-red-500">
                  {errors.startDateTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollmentDeadline">
                Enrollment Deadline (optional)
              </Label>
              <Input
                id="enrollmentDeadline"
                type="datetime-local"
                {...register('enrollmentDeadline')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="zoomLink">Zoom Link</Label>
              <Input
                id="zoomLink"
                placeholder="https://zoom.us/..."
                {...register('zoomLink')}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Tags</Label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {tagEntries.map(([label, value]) => (
                <div key={label} className="flex items-center gap-2">
                  <Checkbox
                    id={`tag-${value}`}
                    checked={selectedTags?.includes(value)}
                    onCheckedChange={(checked) =>
                      handleToggleTag(value, checked)
                    }
                  />
                  <Label htmlFor={`tag-${value}`}>
                    {label.replace(/_/g, ' ')}
                  </Label>
                </div>
              ))}
            </div>
            {errors.tags && (
              <p className="text-sm text-red-500">
                {errors.tags.message as string}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Checkbox
                id="isPublic"
                checked={isPublic}
                onCheckedChange={(checked) =>
                  setValue('isPublic', checked === true)
                }
              />
              <Label htmlFor="isPublic">Public Event</Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="recordingAvailable"
                checked={recordingAvailable}
                onCheckedChange={(checked) =>
                  setValue('recordingAvailable', checked === true)
                }
              />
              <Label htmlFor="recordingAvailable">Recording Available</Label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {extraActions}
            <Button
              type="submit"
              size="lg"
              className="bg-linear-to-r btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
