import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('User successfully updated!');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
