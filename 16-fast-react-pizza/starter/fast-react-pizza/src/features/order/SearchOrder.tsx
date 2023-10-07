import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!orderId) return;
    navigate(`/order/${orderId}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={orderId}
        onChange={(event) => setOrderId(event.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
