import { toast } from 'react-toastify';
import type { ProfilePictureSectionProps } from '../../types/user';

const ProfilePictureSection = ({
  profile,
  profilePictureFile,
  profilePicturePreview,
  onProfilePictureChange,
}: ProfilePictureSectionProps) => {
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('Image size must be less than 5MB.');
        return;
      }
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        onProfilePictureChange(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Profile Picture
      </label>
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={
              profilePicturePreview ||
              profile?.profilePictureUrl ||
              '/images/default-avatar.png'
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-primary-200"
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-primary-600 text-white p-1 rounded-full cursor-pointer hover:bg-primary-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </label>
        </div>
        <div className="flex-1">
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
          <p className="text-sm text-gray-600 mb-2">
            Upload a new profile picture. Max size: 5MB. Supported formats: JPG,
            PNG, GIF.
          </p>
          {profilePictureFile && (
            <p className="text-sm text-green-600">
              Selected: {profilePictureFile.name} (
              {(profilePictureFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureSection;
