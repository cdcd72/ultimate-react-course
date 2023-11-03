export interface IBooking {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  observations: string;
  cabins: { name: string };
  guests: { fullName: string; email: string };
  createdAt: Date;
}
