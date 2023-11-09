import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { register as registerApi } from '../../services/apiAuth';

export function useRegister() {
  const { isLoading, mutate: register } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Register failed');
    },
  });
  return { isLoading, register };
}
