import { Link } from 'react-router-dom';
import { useCart } from '../../hooks';
import { ItemQuantitySelector } from '../Items';

export function CartItemCard({ item }) {
  const cartCounter = useCart(item.id, item.stock);

  const totalPrice = item.price * cartCounter.count;
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
          justify-content: space-between;
        `}
      >
        <div
          css={`
            flex: 0.6;
            display: flex;
            flex-direction: column;
            gap: 5px;
          `}
        >
          <h3
            css={`
              white-space: nowrap;
            `}
          >
            {`${item.brand_name} ${item.name}`}
          </h3>
          <p>Precio unitario: ${item.price.toFixed(2)}</p>
          <ItemQuantitySelector counter={cartCounter} />
        </div>
        <div
          css={`
            flex: 0.4;
            display: flex;
            align-items: flex-end;
          `}
        >
          Subtotal: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  ) : null;
}
