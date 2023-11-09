import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { IBooking } from '../../models/IBooking';

function BookingTable() {
  const { isLoading, bookings, bookingsCount } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow
              booking={booking as IBooking}
              key={(booking as IBooking).id}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={bookingsCount ?? 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
