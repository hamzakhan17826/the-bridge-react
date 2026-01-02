import { Sparkles } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
        <Sparkles className="w-4 h-4" />
        My Profile
      </div>
      <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        Manage Your Account
      </h1>
      <p className="text-gray-600 mt-2">
        Update your personal information and preferences
      </p>
    </div>
  );
};

export default ProfileHeader;
