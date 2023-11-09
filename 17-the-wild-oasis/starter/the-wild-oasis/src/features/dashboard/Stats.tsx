import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { IBooking } from '../../models/IBooking';
import { IRecentBooking } from '../../models/IRecentBooking';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings?: IRecentBooking[];
  confirmedStays?: IBooking[];
  numDays?: number;
  cabinCount?: number;
}) {
  // 1. Number of bookings
  const numBookings = bookings?.length || 0;
  // 2. Number of booking total prices
  const sales = bookings?.reduce(
    (acc, curBooking) => acc + curBooking.totalPrice,
    0
  );
  // 3. Number of check in bookings
  const checkins = confirmedStays?.length || 0;
  // 4. confirmed number of nights / (numDays * cabinCount)
  const occupation =
    (confirmedStays?.reduce((acc, curStay) => acc + curStay.numNights, 0) ||
      0) /
    ((numDays || 0) * (cabinCount || 0));

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
