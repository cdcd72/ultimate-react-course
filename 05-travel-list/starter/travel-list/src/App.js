import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleRemoveItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const handleClearItems = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    );
    if (confirmed) setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onRemoveItem={handleRemoveItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const handleSubmit = (event) => {
    // Prevent page reload...
    event.preventDefault();

    if (!description) return;

    onAddItem({
      id: Date.now(),
      description,
      quantity,
      packed: false,
    });

    // Reset form data...
    setQuantity(1);
    setDescription('');
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onToggleItem, onRemoveItem, onClearItems }) {
  const [sortBy, setSortBy] = useState('input');
  const sortItems = (items, sortBy) => {
    switch (sortBy) {
      case 'input':
        return items;
      case 'description':
        return items
          .slice()
          .sort((a, b) => a.description.localeCompare(b.description));
      case 'packed':
        return items
          .slice()
          .sort((a, b) => Number(a.packed) - Number(b.packed));
      default:
        return items;
    }
  };
  return (
    <div className="list">
      <ul>
        {sortItems(items, sortBy).map((item) => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            onRemoveItem={onRemoveItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onToggleItem, onRemoveItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
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
