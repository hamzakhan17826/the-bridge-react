import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Crown, User } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type MembershipPlan =
  | 'Free'
  | 'General Sitter'
  | 'Development Medium'
  | 'Professional Medium';

export default function Membership() {
  const { user } = useAuthStore();
  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();
  const currentPlan: MembershipPlan = user ? 'Free' : 'Free'; // Default to Free for logged-in users

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership' },
    ]);
  }, [setItems]);

  const handleUpgrade = (plan: MembershipPlan) => {
    navigate(
      `/dashboard/membership/upgrade/${plan.toLowerCase().replace(' ', '-')}`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Membership Plans</h1>
        <p className="text-muted-foreground">
          Upgrade your account to unlock more features and benefits.
        </p>
      </div>

      {/* Current Plan Section */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Your Current Plan
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary"
                >
                  {currentPlan}
                </Badge>
              </CardTitle>
              <CardDescription className="mb-0">
                {currentPlan === 'Free'
                  ? 'You are registered as a free user. Upgrade to access premium features.'
                  : 'Enjoy your premium benefits!'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose your membership plan to unlock premium features and
              benefits.
            </p>

            {/* Plan Selection - One per row */}
            <div className="space-y-4">
              {/* General Sitter Row */}
              <div className="grid grid-cols-12 gap-4 p-4 border-2 rounded-lg items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <Users className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">General Sitter</div>
                    <div className="text-2xl font-bold">
                      $10<span className="text-sm font-normal">/month</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Starter Plan
                    </div>
                  </div>
                </div>
                <div className="col-span-7">
                  <div className="font-medium mb-2 text-sm">Features:</div>
                  <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                    <div>• Full Replay Library</div>
                    <div>• 10% off ALL events</div>
                    <div>• 10% off ALL private readings</div>
                    <div>• Early registration access</div>
                    <div>• Monthly newsletter</div>
                    <div>• Select Bridge Library resources</div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpgrade('General Sitter')}
                  >
                    Upgrade
                  </Button>
                </div>
              </div>

              {/* Development Medium Row */}
              <div className="grid grid-cols-12 gap-4 p-4 border-2 rounded-lg items-center border-primary bg-primary/5">
                <div className="col-span-3 flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">Development Medium</div>
                    <div className="text-2xl font-bold">
                      $19<span className="text-sm font-normal">/month</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Growth Plan
                    </div>
                  </div>
                </div>
                <div className="col-span-7">
                  <div className="font-medium mb-2 text-sm">Features:</div>
                  <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                    <div>• Everything in General Sitter</div>
                    <div>• 2 free Development Circles/month</div>
                    <div>• Demo eligibility (once verified)</div>
                    <div>• 10% off additional circles/workshops</div>
                    <div>• Development resources in Library</div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleUpgrade('Development Medium')}
                  >
                    Upgrade
                  </Button>
                </div>
              </div>

              {/* Professional Medium Row */}
              <div className="grid grid-cols-12 gap-4 p-4 border-2 rounded-lg items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <Crown className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">Professional Medium</div>
                    <div className="text-2xl font-bold">
                      $29<span className="text-sm font-normal">/month</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Professional Plan
                    </div>
                  </div>
                </div>
                <div className="col-span-7">
                  <div className="font-medium mb-2 text-sm">Features:</div>
                  <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                    <div>• Everything in Development Medium</div>
                    <div>• Public Medium Profile Page</div>
                    <div>• Directory listing in "Meet the Mediums"</div>
                    <div>• Unlimited demonstration eligibility</div>
                    <div>• Charity reading requirement</div>
                    <div>• Full Bridge Library access</div>
                    <div>• Presenter Tools + booking integration</div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpgrade('Professional Medium')}
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commented out lower cards for now */}
      {/*<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="relative">
        <CardHeader>
            <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
                <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
                <CardTitle>General Sitter</CardTitle>
                <CardDescription className="mb-0">
                Starter Plan
                </CardDescription>
            </div>
            </div>
            <div className="mt-4">
            <div className="text-3xl font-bold">$10</div>
            <div className="text-sm text-muted-foreground">/month</div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
            For sitters & spiritual seekers looking for insight, healing,
            and meaningful connection
            </p>
            <Button variant="outline" className="w-full mb-4">
            Join Now
            </Button>
            <div>
            <h4 className="font-semibold mb-2">What's Included:</h4>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Full Replay Library
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                10% off ALL events
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                10% off ALL private readings
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Early registration access
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Monthly newsletter
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Select Bridge Library resources
                </li>
            </ul>
            </div>
        </CardContent>
        </Card>

        <Card className="relative border-primary">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground hover:bg-muted-foreground">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
            </Badge>
        </div>
        <CardHeader className="pt-8">
            <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
                <BookOpen className="h-6 w-6 text-muted-600" />
            </div>
            <div>
                <CardTitle>Development Medium</CardTitle>
                <CardDescription className="mb-0">
                Growth Plan
                </CardDescription>
            </div>
            </div>
            <div className="mt-4">
            <div className="text-3xl font-bold">$19</div>
            <div className="text-sm text-muted-foreground">/month</div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
            For developing mediums seeking structure, guided practice,
            confidence, and professional growth
            </p>
            <Button className="w-full mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
            Start Growing
            </Button>
            <div>
            <h4 className="font-semibold mb-2">
                Everything in General, plus:
            </h4>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />2 free
                Development Circles/month
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Demo eligibility (once verified)
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                10% off additional circles/workshops
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Development resources in Library
                </li>
            </ul>
            </div>
        </CardContent>
        </Card>

        <Card className="relative">
        <CardHeader>
            <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
                <Crown className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
                <CardTitle>Professional Medium</CardTitle>
                <CardDescription className="mb-0">
                Professional Plan
                </CardDescription>
            </div>
            </div>
            <div className="mt-4">
            <div className="text-3xl font-bold">$29</div>
            <div className="text-sm text-muted-foreground">/month</div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
            For active, serving mediums ready for public visibility,
            professional support, and aligned opportunities
            </p>
            <Button variant="outline" className="w-full mb-4">
            Join Now
            </Button>
            <div>
            <h4 className="font-semibold mb-2">
                Everything in Development, plus:
            </h4>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Public Medium Profile Page
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Directory listing in "Meet the Mediums"
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Unlimited demonstration eligibility
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Charity reading requirement
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Full Bridge Library access
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Presenter Tools + booking integration
                </li>
            </ul>
            </div>
        </CardContent>
        </Card>
        </div> */}
    </div>
  );
}
