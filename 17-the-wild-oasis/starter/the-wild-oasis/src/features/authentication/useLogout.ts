import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Log out failed');
    },
  });
  return { isLoading, logout };
}
