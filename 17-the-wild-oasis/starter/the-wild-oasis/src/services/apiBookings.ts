import { IBooking } from '../models/IBooking';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

export interface IBookingFilter {
  field: string;
  value: string;
  method: string;
}

export interface IBookingSortBy {
  field: string;
  direction: string;
}

export async function getBookings({
  filters,
  sortBy,
}: {
  filters: IBookingFilter[];
  sortBy: IBookingSortBy;
}): Promise<IBooking[]> {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(full_name, email)');

  if (filters?.length > 0) {
    filters.forEach((filter) => {
      query = query[filter.method](filter.field, filter.value);
    });
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded!');
  }

  return data.map((item) => {
    return {
      id: item.id,
      status: item.status,
      startDate: item.start_date,
      endDate: item.end_date,
      numNights: item.num_nights,
      numGuests: item.num_guests,
      hasBreakfast: item.has_breakfast,
      isPaid: item.is_paid,
      cabinPrice: item.cabin_price,
      extrasPrice: item.extras_price,
      totalPrice: item.total_price,
      observations: item.observations,
      cabins: { name: item.cabins.name },
      guests: { fullName: item.guests.full_name, email: item.guests.email },
      createdAt: new Date(item.created_at),
    };
  });
}

export async function getBooking(id: number): Promise<IBooking> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return {
    id: data.id,
    status: data.status,
    startDate: data.start_date,
    endDate: data.end_date,
    numNights: data.num_nights,
    numGuests: data.num_guests,
    hasBreakfast: data.has_breakfast,
    isPaid: data.is_paid,
    cabinPrice: data.cabin_price,
    extrasPrice: data.extras_price,
    totalPrice: data.total_price,
    observations: data.observations,
    cabins: { name: data.cabins.name },
    guests: { fullName: data.guests.full_name, email: data.guests.email },
    createdAt: new Date(data.created_at),
  };
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
