import { ItemQuantitySelector } from '../../../components/Items';
import { AddItemButton } from '../../../components/Buttons';
import { useAddToCart } from '../../../hooks/useAddToCart';

export function ItemDetail({ item }) {
  const cartCounter = useAddToCart(item.id, item.stock);
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
        src={`${process.env.BASE_URL}/images/${item.image}`}
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
        <ItemQuantitySelector counter={cartCounter} />
        <AddItemButton
          css={`
            max-width: 25rem;
          `}
          cartItem={{ id: item.id, quantity: cartCounter.count }}
          addToCart={cartCounter.addToCart}
          disabled={!cartCounter.count || cartCounter.isOutOfStock}
        />
      </div>
    </div>
  );
}
