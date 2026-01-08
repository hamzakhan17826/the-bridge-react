import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import {
  CheckCircle,
  Users,
  BookOpen,
  Crown,
  Upload,
  //   ArrowLeft,
} from 'lucide-react';
import { useRegisterMedium } from '../../hooks/useMediumRegistration';
import { useSubscriptionTiers } from '../../hooks/useMembership';
import { toast } from 'react-toastify';

export default function MembershipUpgrade() {
  const { plan } = useParams<{ plan: string }>();
  const navigate = useNavigate();
  const { setItems } = useBreadcrumb();

  // React Query hooks
  const { data: tiers = [], isLoading: tiersLoading } = useSubscriptionTiers();
  const registerMediumMutation = useRegisterMedium();

  // Find selected tier based on plan parameter
  const selectedTier = tiers.find(
    (tier) => tier.tierCode.toLowerCase() === plan
  );

  // Helper function to get tier icon
  const getTierIcon = (tierCode: string) => {
    switch (tierCode) {
      case 'GENERALMEMBERSHIP':
        return Users;
      case 'DEVELOPMENTMEDIUM':
        return BookOpen;
      case 'PROFESSIONALMEDIUM':
        return Crown;
      case 'FREETIERMEMBERSHIP':
        return Users; // Default for free tier
      default:
        return Users;
    }
  };

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

  useEffect(() => {
    if (!plan) {
      navigate('/dashboard/membership');
      return;
    }

    // If tiers are loaded but selected tier not found
    if (tiers.length > 0 && !selectedTier) {
      navigate('/dashboard/membership');
      return;
    }

    if (selectedTier) {
      const isFree = selectedTier.tierCode === 'FREETIERMEMBERSHIP';
      setItems([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Membership', href: '/dashboard/membership' },
        {
          label: isFree
            ? `Get Started with ${selectedTier.tierName}`
            : `Upgrade to ${selectedTier.tierName}`,
        },
      ]);
    }
  }, [plan, selectedTier, tiers, setItems, navigate]);

  if (!plan) {
    return null;
  }

  if (tiersLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (!selectedTier) {
    return null;
  }

  const IconComponent = getTierIcon(selectedTier.tierCode);

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

    registerMediumMutation.mutate(formData, {
      onSuccess: () => {
        navigate('/dashboard/membership');
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard/membership')}
          className="w-fit"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Membership
        </Button> */}
        <div>
          <h1 className="text-3xl font-bold">
            {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
              ? `Get Started with ${selectedTier.tierName}`
              : `Upgrade to ${selectedTier.tierName}`}
          </h1>
          <p className="text-muted-foreground">
            {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
              ? 'Complete your profile to start your spiritual journey'
              : 'Complete your application for admin approval'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Form */}
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
                  onChange={(e) =>
                    handleInputChange('specialty', e.target.value)
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/90"
                disabled={registerMediumMutation.isPending}
              >
                {registerMediumMutation.isPending
                  ? 'Submitting...'
                  : selectedTier.tierCode === 'FREETIERMEMBERSHIP'
                    ? 'Create Profile'
                    : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Side - Plan Details */}
        <div className="space-y-6">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{selectedTier.tierName}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    ${selectedTier.basePrice}/month
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {selectedTier.features
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((feature) => (
                        <li
                          key={feature.id}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm">{feature.name}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>
                        {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
                          ? 'Getting Started:'
                          : 'Application Process:'}
                      </strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {selectedTier.tierCode === 'FREETIERMEMBERSHIP' ? (
                        <>
                          <li>Complete your profile information</li>
                          <li>Your profile will be created immediately</li>
                          <li>Start exploring our community and resources</li>
                          <li>Access all free tier features right away</li>
                        </>
                      ) : (
                        <>
                          <li>
                            Submit your application with all required
                            information
                          </li>
                          <li>
                            Admin team will review your application (2-3
                            business days)
                          </li>
                          <li>
                            Once approved, you'll receive access to your new
                            plan
                          </li>
                          <li>Payment will be processed upon approval</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
