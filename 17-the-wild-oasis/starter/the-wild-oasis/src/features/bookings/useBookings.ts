import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import {
  IBookingFilter,
  IBookingSortBy,
  getBookings,
} from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
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

  // Pagination
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  // Query
  const {
    isLoading,
    data: { bookings, bookingsCount } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  });

  // Pre-fetching
  const pageCount = Math.ceil((bookingsCount ?? 0) / PAGE_SIZE);

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filters, sortBy, page - 1],
      queryFn: () => getBookings({ filters, sortBy, page: page - 1 }),
    });
  }

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filters, sortBy, page + 1],
      queryFn: () => getBookings({ filters, sortBy, page: page + 1 }),
    });
  }

  return { isLoading, bookings, bookingsCount, error };
}
