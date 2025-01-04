import { useState } from "react";
import Form from "./Form.js";
import Logo from "./Logo.js";

export default function App() {
  const [items, setItems] = useState([]);

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        onPackItem={handlePackItem}
        onDeleteItem={handleDeleteItem}
        items={items}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function PackingList({ items, onDeleteItem, onPackItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, key) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onPackItem={onPackItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onPackItem }) {
  function capitalizeItem(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <li key={item.id}>
      <input
        type="checkbox"
        onChange={() => onPackItem(item.id)}
        value={item.packed}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {capitalizeItem(item.description)}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌&times;</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list! 🚀</em>
      </p>
    );
  }
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed);
  const percentagePacked = (packedItems.length / totalItems) * 100;

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "💼 You're all packed and ready to go! ✈️"
          : `💼 You have ${totalItems} item(s) on your list, and you've packed
          ${percentagePacked}% so far.`}
      </em>
    </footer>
  );
}
