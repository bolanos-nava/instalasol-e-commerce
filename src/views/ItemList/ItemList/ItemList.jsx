export function ItemList({ items, Children }) {
  return items.length ? (
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
        <Children key={idx} item={item} />
      ))}
    </div>
  ) : null;
}
