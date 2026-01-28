import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import type { UseFormRegister } from 'react-hook-form';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  dateOfBirth: string;
  gender: string;
};

interface PersonalInfoSectionProps {
  register: UseFormRegister<ProfileFormData>;
}

export default function PersonalInfoSection({
  register,
}: PersonalInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register('firstName')} />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register('lastName')} />
          </div>
        </div>
        <div>
          <Label htmlFor="userName">Username</Label>
          <Input id="userName" {...register('userName')} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              {...register('gender')}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
