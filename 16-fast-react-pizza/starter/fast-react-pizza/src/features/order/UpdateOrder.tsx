import { Params, useFetcher } from 'react-router-dom';
import { IOrder } from '../../models/order';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }: { order: IOrder }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export const action = async ({ params }: { params: Params }) => {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
};
