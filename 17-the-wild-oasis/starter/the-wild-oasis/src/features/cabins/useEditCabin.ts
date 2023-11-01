import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';
import { ICreateEditCabin } from '../../models/ICreateEditCabin';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: ICreateEditCabin; id?: number }) =>
      createEditCabin(cabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
