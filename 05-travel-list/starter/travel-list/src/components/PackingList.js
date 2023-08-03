import { useState } from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onToggleItem,
  onRemoveItem,
  onClearItems,
}) {
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
