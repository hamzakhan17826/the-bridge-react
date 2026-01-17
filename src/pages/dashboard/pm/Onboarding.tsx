import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Profile',
  'Services',
  'Availability',
  'Verification & Payout',
  'Review',
];

export default function PMOnboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Professional Medium' },
      { label: 'Onboarding' },
      { label: steps[step] },
    ]);
  }, [setItems, step]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Professional Medium Onboarding</CardTitle>
          <CardDescription>
            Complete these steps to publish your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {steps.map((name, idx) => (
              <Button
                key={name}
                variant={idx === step ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStep(idx)}
              >
                {idx + 1}. {name}
              </Button>
            ))}
          </div>

          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="e.g., Sarah Mitchell" />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" placeholder="Short intro" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell clients about your work" />
              </div>
              <div>
                <Label htmlFor="specialties">Specialties</Label>
                <Input
                  id="specialties"
                  placeholder="e.g., Evidential Mediumship"
                />
              </div>
              <div>
                <Label htmlFor="languages">Languages</Label>
                <Input id="languages" placeholder="e.g., English, Urdu" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input id="serviceName" placeholder="Private Reading" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (mins)</Label>
                  <Input id="duration" type="number" placeholder="60" />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="150" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="requiresPrep" />
                <Label htmlFor="requiresPrep">Requires preparation notes</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="allowReschedule" />
                <Label htmlFor="allowReschedule">Allow rescheduling</Label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" placeholder="e.g., EST" />
                </div>
                <div>
                  <Label htmlFor="buffer">Buffer (mins)</Label>
                  <Input id="buffer" type="number" placeholder="15" />
                </div>
                <div>
                  <Label htmlFor="maxPerDay">Max sessions/day</Label>
                  <Input id="maxPerDay" type="number" placeholder="4" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="mon" defaultChecked />
                <Label htmlFor="mon">Monday</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="tue" defaultChecked />
                <Label htmlFor="tue">Tuesday</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="wed" />
                <Label htmlFor="wed">Wednesday</Label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="idUpload">Government ID (image/pdf)</Label>
                  <Input id="idUpload" type="file" />
                </div>
                <div>
                  <Label htmlFor="sampleWork">Sample Work (link)</Label>
                  <Input id="sampleWork" placeholder="Portfolio or video URL" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="agreement">Compliance Agreement</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox id="agreement" />
                    <span className="text-sm text-muted-foreground">
                      I agree to platform terms and verification policies.
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payoutMethod">Payout Method</Label>
                  <Input id="payoutMethod" placeholder="e.g., Stripe Connect" />
                </div>
                <div>
                  <Label htmlFor="taxInfo">Tax Info</Label>
                  <Input id="taxInfo" placeholder="e.g., TIN / SSN (masked)" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard/pm/payout')}
                >
                  Open Payout Settings
                </Button>
                <Button onClick={() => setStep(4)}>Continue to Review</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Review your entries and publish when ready.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 border rounded">
                  Profile summary (dummy)
                </div>
                <div className="p-3 border rounded">
                  Services summary (dummy)
                </div>
                <div className="p-3 border rounded">
                  Availability summary (dummy)
                </div>
                <div className="p-3 border rounded">
                  Verification & payout (captured)
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => navigate('/dashboard/pm/bookings')}>
                  Publish Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard/pm/services')}
                >
                  Edit Services
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prev} disabled={step === 0}>
              Back
            </Button>
            <Button onClick={next} disabled={step === steps.length - 1}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
