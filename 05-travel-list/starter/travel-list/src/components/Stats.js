export default function Stats({ items }) {
  const numItems = items.length;

  if (!numItems)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🏎️</em>
      </footer>
    );

  const numPackedItems = items.filter((item) => item.packed).length;
  const achievementPercentage = Math.round(
    (numPackedItems / numItems || 0) * 100
  );

  return (
    <footer className="stats">
      <em>
        {achievementPercentage === 100
          ? 'You got everything! Ready to go ✈️'
          : `👜 You have ${numItems} items on you list, and you ready packed ${numPackedItems} (${achievementPercentage}%)`}
      </em>
    </footer>
  );
}
