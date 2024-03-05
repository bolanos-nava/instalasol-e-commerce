import { BasicButton } from '../styled-components/BasicButton';

export function AddToCart({ className, cartItem, addToCart, disabled }) {
  return (
    <BasicButton
      className={className}
      disabled={disabled}
      onClick={() => addToCart(cartItem)}
    >
      Añadir al carrito
    </BasicButton>
  );
}
