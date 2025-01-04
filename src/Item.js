export default function Item({ item, onDeleteItem, onPackItem }) {
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
