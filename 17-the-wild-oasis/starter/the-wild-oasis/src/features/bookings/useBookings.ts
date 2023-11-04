import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import {
  IBookingFilter,
  IBookingSortBy,
  getBookings,
} from '../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('status');
  const filters: IBookingFilter[] =
    !filterValue || filterValue === 'all'
      ? []
      : [{ field: 'status', value: filterValue, method: 'eq' }];

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'start_date-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy: IBookingSortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filters, sortBy],
    queryFn: () => getBookings({ filters, sortBy }),
  });

  return { isLoading, bookings, error };
}
