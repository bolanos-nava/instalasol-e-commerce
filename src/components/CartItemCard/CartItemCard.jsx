import { Link } from 'react-router-dom';
import { useCart } from '../../hooks';
import { ItemCount } from '../Items';

export function CartItemCard({ item }) {
  const cartCounter = useCart(item.id, item.quantity);

  return cartCounter.count ? (
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
      <Link to={`/item/${item.id}`}>
        <img
          css={`
            max-width: 200px;
          `}
          src={item.image}
          alt={item.description}
        />
      </Link>
      <div
        css={`
          display: flex;
          flex-direction: column;
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
        <ItemCount counter={cartCounter} />
      </div>
    </div>
  ) : null;
}
