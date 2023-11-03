import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { IBookingFilter, getBookings } from '../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('status');
  const filters: IBookingFilter[] =
    !filterValue || filterValue === 'all'
      ? []
      : [{ field: 'status', value: filterValue, method: 'eq' }];

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => getBookings({ filters }),
  });

  return { isLoading, bookings, error };
}
