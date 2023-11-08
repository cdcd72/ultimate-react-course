import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingRecentBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingRecentStays,
    stays,
    confirmedStays,
  } = useRecentStays();

  if (isLoadingRecentBookings || isLoadingRecentStays) return <Spinner />;

  console.log('bookings', bookings);
  console.log('stays', stays);
  console.log('confirmedStays', confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
