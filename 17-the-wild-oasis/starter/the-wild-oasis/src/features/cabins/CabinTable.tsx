import { useSearchParams } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { ICabin } from '../../models/ICabin';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  // 1. Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins?.filter((cabin) => !cabin.discount);
  if (filterValue === 'with-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount);

  // 2. Sort
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortByField: keyof ICabin = field as keyof ICabin;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (Number(a[sortByField]) - Number(b[sortByField])) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin as ICabin} key={(cabin as ICabin).id} />
          )}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
