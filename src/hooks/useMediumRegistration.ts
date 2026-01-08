import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { registerMedium } from '../services/medium-registration';

// Hook for medium registration
export const useRegisterMedium = () => {
  return useMutation({
    mutationFn: registerMedium,
    onSuccess: (data) => {
      toast.success(data.message);
      // Optionally invalidate related queries if needed
      // For example, if registration affects user profile or membership status
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Medium registration failed.';
      const errors = error?.response?.data?.errors;
      if (errors) {
        toast.error(Object.values(errors).flat().join(', '));
      } else {
        toast.error(message);
      }
    },
  });
};
