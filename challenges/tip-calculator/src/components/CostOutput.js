export default function CostOutput({ bill, tip }) {
  return <h2>{`You pay $${bill + tip} ($${bill} + $${tip} tip)`}</h2>;
}
