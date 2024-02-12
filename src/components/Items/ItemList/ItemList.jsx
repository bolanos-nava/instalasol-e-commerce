import { ItemCard } from '../ItemCard';

export function ItemList({ items }) {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      `}
    >
      {items.map((item, idx) => (
        <ItemCard key={idx} item={item} />
      ))}
    </div>
  );
}
