import { useState } from 'react';

export default function Form({ onAddItem }) {
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
