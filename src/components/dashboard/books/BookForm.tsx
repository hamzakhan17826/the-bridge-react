import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { useTags } from '@/hooks/useTag';
import { Loader2, Image as ImageIcon } from 'lucide-react';

export type BookFormValues = {
  title: string;
  description: string;
  content: string;
  slug: string;
  tagIds: number[];
};

type BookFormProps = {
  defaultValues: BookFormValues;
  initialImageUrl?: string | null;
  requireImage?: boolean;
  isSubmitting?: boolean;
  submitLabel: string;
  resetKey?: number;
  onSubmit: (values: BookFormValues, imageFile: File | null) => Promise<void>;
};

export default function BookForm({
  defaultValues,
  initialImageUrl,
  requireImage = false,
  isSubmitting = false,
  submitLabel,
  resetKey,
  onSubmit,
}: BookFormProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(initialImageUrl ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: availableTags = [] } = useTags();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<BookFormValues>({ defaultValues });

  const selectedTagIds = useWatch({ control, name: 'tagIds' }) || [];
  const contentValue = useWatch({ control, name: 'content' }) || '';

  useEffect(() => {
    reset(defaultValues);
    setSelectedImageFile(null);
    setSelectedImagePreview(initialImageUrl ?? null);
  }, [defaultValues, initialImageUrl, reset, resetKey]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tagId: number) => {
    const current = [...selectedTagIds];
    const index = current.indexOf(tagId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(tagId);
    }
    setValue('tagIds', current);
  };

  const onFormSubmit = (values: BookFormValues) => {
    onSubmit(values, selectedImageFile);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  {...register('slug', { required: 'Slug is required' })}
                  placeholder="e.g. my-awesome-book"
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description (Excerpt)</Label>
                <Textarea
                  id="description"
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  placeholder="Briefly describe what this book is about"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor
                  value={contentValue}
                  onChange={(val) =>
                    setValue('content', val, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
                {errors.content && (
                  <p className="text-sm text-destructive">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div
                  className="relative aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedImagePreview ? (
                    <img
                      src={selectedImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-sm">Upload Image</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {requireImage && !selectedImagePreview && (
                  <p className="text-sm text-destructive">Image is required</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={
                        selectedTagIds.includes(tag.id) ? 'default' : 'outline'
                      }
                      className={`cursor-pointer transition-colors ${
                        selectedTagIds.includes(tag.id)
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                  {availableTags.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">
                      No tags available. Admin must create tags first.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full btn" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
