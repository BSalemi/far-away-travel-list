export default function Stats({ items }) {
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
