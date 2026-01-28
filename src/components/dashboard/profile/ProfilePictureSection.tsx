import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import type { AppUserProfile } from '../../../types/user';

interface ProfilePictureSectionProps {
  profile: AppUserProfile | undefined;
  profilePictureFile: File | null;
  profilePicturePreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleProfilePictureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  firstName: string;
  lastName: string;
}

export default function ProfilePictureSection({
  profile,
  profilePictureFile,
  profilePicturePreview,
  fileInputRef,
  handleProfilePictureUpload,
  firstName,
  lastName,
}: ProfilePictureSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>
          Upload a new profile picture. Max size: 5MB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={profilePicturePreview || profile?.profilePictureUrl}
            />
            <AvatarFallback>
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
            {profilePictureFile && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {profilePictureFile.name} (
                {(profilePictureFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
