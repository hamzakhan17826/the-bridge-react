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
        'inline-flex items-center justify-center rounded-md bg-primary text-white py-2 px-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {text}
    </button>
  );
}
