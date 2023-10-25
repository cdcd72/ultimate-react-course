import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import { useAppDispatch } from '../../hooks/default';

function DeleteItem({ pizzaId }: { pizzaId: number }) {
  const dispatch = useAppDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
