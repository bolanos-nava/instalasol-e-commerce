import { ItemCount } from '../ItemCount';
import { useCounter } from '../../../hooks';
import { AddToCart } from '../../Buttons';

export function ItemDetail({ item }) {
  const counter = useCounter(item.stock);
  return (
    <div
      className="shadow-default"
      css={`
        display: flex;
        gap: 10px;
        border-radius: 5px;
        padding: 10px;
        width: 100%;
      `}
    >
      <img
        css={`
          max-width: 200px;
        `}
        src={item.image}
        alt={item.description}
      />
      <div
        css={`
          display: flex;
          flex-direction: column;
          gap: 3px;
        `}
      >
        <h3
          css={`
            white-space: nowrap;
          `}
        >
          {`${item.brand_name} ${item.name}`}
        </h3>
        <p>${item.price.toFixed(2)}</p>
        <p>{item.description}</p>
        <p>Stock disponible: {item.stock}</p>
        <ItemCount counter={counter} />
        <AddToCart
          css={`
            max-width: 25rem;
          `}
        />
      </div>
    </div>
  );
}
