import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PasswordChangeSectionProps {
  onOpenModal: () => void;
}

export default function PasswordChangeSection({
  onOpenModal,
}: PasswordChangeSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account password for better security.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onOpenModal} type="button" className="btn">
          Change Password
        </Button>
      </CardContent>
    </Card>
  );
}
