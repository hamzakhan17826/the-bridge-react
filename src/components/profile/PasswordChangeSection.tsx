interface PasswordChangeSectionProps {
  onOpenModal: () => void;
}

const PasswordChangeSection = ({ onOpenModal }: PasswordChangeSectionProps) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Change Password
          </h3>
          <p className="text-sm text-gray-600">Update your account password</p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="px-4 py-2 bg-linear-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium rounded-xl transition-all duration-200"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeSection;
