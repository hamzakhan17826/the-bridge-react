import clsx from 'clsx';
import type { SubmitButtonProps } from '../../types/types';

export default function SubmitButton({ text, className }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={clsx(
        'inline-flex items-center justify-center rounded-md bg-primary text-white py-2 px-3 cursor-pointer',
        className
      )}
    >
      {text}
    </button>
  );
}
