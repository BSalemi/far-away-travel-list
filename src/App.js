import { useState } from "react";
import Form from "./Form.js";
import Logo from "./Logo.js";
import PackingList from "./PackingList.js";

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
