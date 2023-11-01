import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createUpdateCabin } from '../../services/apiCabins';
import { ICreateUpdateCabin } from '../../models/ICreateUpdateCabin';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: ICreateUpdateCabin; id?: number }) =>
      createUpdateCabin(cabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateCabin };
}
