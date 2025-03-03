import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ICreateUpdateCabin } from '../../models/ICreateUpdateCabin';
import { createUpdateCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: ({ cabin }: { cabin: ICreateUpdateCabin }) =>
      createUpdateCabin(cabin),
    onSuccess: () => {
      toast.success('Cabin successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
