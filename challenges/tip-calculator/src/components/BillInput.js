export default function BillInput({ bill, onHandleBill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="number"
        min={0}
        value={bill}
        onChange={(event) => onHandleBill(+event.target.value)}
      />
    </div>
  );
}
