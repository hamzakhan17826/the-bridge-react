import { useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { toast } from 'react-toastify';

interface MediumRegistrationFormProps {
  selectedTier: {
    tierCode: string;
    tierName: string;
  };
  onSubmit: (formData: any) => void;
  isPending: boolean;
}

export default function MediumRegistrationForm({
  selectedTier,
  onSubmit,
  isPending,
}: MediumRegistrationFormProps) {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    experienceInYears: '',
    philosophy: '',
    bio: '',
    availabilityStatus: '',
    slug: '',
    focus: '',
    tagline: '',
    specialty: '',
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
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
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Form</CardTitle>
        <CardDescription>
          {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
            ? 'Please fill out your profile information to get started with your spiritual journey.'
            : 'Please fill out all required information. Your application will be reviewed by our admin team.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photo">Profile Photo *</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={photoPreview || undefined} />
                <AvatarFallback>Photo</AvatarFallback>
              </Avatar>
              <div>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="photo"
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-muted-foreground/25 rounded-md cursor-pointer hover:bg-muted/50"
                >
                  <Upload className="h-4 w-4" />
                  Choose Photo
                </Label>
                {formData.photo && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {formData.photo.name} (
                    {(formData.photo.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience *</Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g. 5"
              value={formData.experienceInYears}
              onChange={(e) =>
                handleInputChange('experienceInYears', e.target.value)
              }
              required
            />
          </div>

          {/* Philosophy */}
          <div className="space-y-2">
            <Label htmlFor="philosophy">Philosophy *</Label>
            <Textarea
              id="philosophy"
              placeholder="Describe your spiritual philosophy..."
              value={formData.philosophy}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange('philosophy', e.target.value)
              }
              required
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange('bio', e.target.value)
              }
              required
            />
          </div>

          {/* Availability Status */}
          <div className="space-y-2">
            <Label htmlFor="availability">Availability Status *</Label>
            <select
              id="availability"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.availabilityStatus}
              onChange={(e) =>
                handleInputChange('availabilityStatus', e.target.value)
              }
              required
            >
              <option value="">Select availability</option>
              <option value="available">Available</option>
              <option value="limited">Limited Availability</option>
              <option value="unavailable">Currently Unavailable</option>
            </select>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              placeholder="your-name"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              required
            />
          </div>

          {/* Focus */}
          <div className="space-y-2">
            <Label htmlFor="focus">Focus Area *</Label>
            <Input
              id="focus"
              placeholder="e.g. Mediumship, Healing, Tarot"
              value={formData.focus}
              onChange={(e) => handleInputChange('focus', e.target.value)}
              required
            />
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input
              id="tagline"
              placeholder="A short, catchy phrase about your services"
              value={formData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              required
            />
          </div>

          {/* Specialty */}
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty *</Label>
            <Input
              id="specialty"
              placeholder="Your main area of expertise"
              value={formData.specialty}
              onChange={(e) => handleInputChange('specialty', e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/90"
            disabled={isPending}
          >
            {isPending
              ? 'Submitting...'
              : selectedTier.tierCode === 'FREETIERMEMBERSHIP'
                ? 'Create Profile'
                : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
