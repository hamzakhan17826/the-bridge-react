import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home } from 'lucide-react';
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

interface AddressInfoSectionProps {
  register: UseFormRegister<ProfileFormData>;
}

export default function AddressInfoSection({
  register,
}: AddressInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Address Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input id="addressLine1" {...register('addressLine1')} />
        </div>
        <div>
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input id="addressLine2" {...register('addressLine2')} />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" {...register('postalCode')} />
        </div>
      </CardContent>
    </Card>
  );
}
