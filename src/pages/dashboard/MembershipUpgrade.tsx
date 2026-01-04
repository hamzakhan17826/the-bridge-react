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
import { toast } from 'react-toastify';
import api from '../../lib/api';

type MembershipPlan =
  | 'general-sitter'
  | 'development-medium'
  | 'professional-medium';

interface PlanDetails {
  name: string;
  price: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const planDetails: Record<MembershipPlan, PlanDetails> = {
  'general-sitter': {
    name: 'General Sitter',
    price: '$10/month',
    icon: Users,
    features: [
      'Full Replay Library',
      '10% off ALL events',
      '10% off ALL private readings',
      'Early registration access',
      'Monthly newsletter',
      'Select Bridge Library resources',
    ],
  },
  'development-medium': {
    name: 'Development Medium',
    price: '$19/month',
    icon: BookOpen,
    features: [
      'Everything in General Sitter',
      '2 free Development Circles/month',
      'Demo eligibility (once verified)',
      '10% off additional circles/workshops',
      'Development resources in Library',
    ],
  },
  'professional-medium': {
    name: 'Professional Medium',
    price: '$29/month',
    icon: Crown,
    features: [
      'Everything in Development Medium',
      'Public Medium Profile Page',
      'Directory listing in "Meet the Mediums"',
      'Unlimited demonstration eligibility',
      'Charity reading requirement',
      'Full Bridge Library access',
      'Presenter Tools + booking integration',
    ],
  },
};

export default function MembershipUpgrade() {
  const { plan } = useParams<{ plan: string }>();
  const navigate = useNavigate();
  const { setItems } = useBreadcrumb();

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!plan || !planDetails[plan as MembershipPlan]) {
      navigate('/dashboard/membership');
      return;
    }

    const planDetail = planDetails[plan as MembershipPlan];
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership', href: '/dashboard/membership' },
      { label: `Upgrade to ${planDetail.name}` },
    ]);
  }, [plan, setItems, navigate]);

  if (!plan || !planDetails[plan as MembershipPlan]) {
    return null;
  }

  const currentPlan = planDetails[plan as MembershipPlan];
  const IconComponent = currentPlan.icon;

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
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to /Register/Medium
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formDataToSend.append(key, value);
      });
      await api.post('/Register/Medium', formDataToSend);

      toast.success(
        'Application submitted successfully! Admin will review your application.'
      );
      navigate('/dashboard/membership');
    } catch (error) {
      console.error('Failed to submit application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-3xl font-bold">Upgrade to {currentPlan.name}</h1>
          <p className="text-muted-foreground">
            Complete your application for admin approval
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Form */}
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription>
              Please fill out all required information. Your application will be
              reviewed by our admin team.
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
                  <CardTitle>{currentPlan.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    {currentPlan.price}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>Application Process:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        Submit your application with all required information
                      </li>
                      <li>
                        Admin team will review your application (2-3 business
                        days)
                      </li>
                      <li>
                        Once approved, you'll receive access to your new plan
                      </li>
                      <li>Payment will be processed upon approval</li>
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
