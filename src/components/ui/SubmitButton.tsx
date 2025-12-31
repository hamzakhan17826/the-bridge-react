import clsx from 'clsx';
import type { SubmitButtonProps } from '../../types/types';

export default function SubmitButton({
  text,
  className,
  disabled,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        'w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-poppins font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        className
      )}
    >
      {text}
    </button>
  );
}
