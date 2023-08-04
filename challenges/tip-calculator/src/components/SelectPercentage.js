const percentages = [
  {
    text: 'Dissatisfied (0%)',
    value: 0,
  },
  {
    text: 'It was okay (10%)',
    value: 10,
  },
  {
    text: 'It was good (15%)',
    value: 15,
  },
  {
    text: 'Absolutely amazing! (20%)',
    value: 20,
  },
];

export default function SelectPercentage({
  percentage,
  onHandlePercentage,
  children,
}) {
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(event) => onHandlePercentage(+event.target.value)}
      >
        {percentages.map((percentage, index) => (
          <option value={percentage.value} key={index}>
            {percentage.text}
          </option>
        ))}
      </select>
    </div>
  );
}
