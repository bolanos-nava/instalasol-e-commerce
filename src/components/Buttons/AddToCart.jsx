import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { BasicButton } from '../styled-components/BasicButton';

export function AddToCart({ className, cartItem }) {
  const { addToCart } = useContext(CartContext);
  return (
    <BasicButton className={className} onClick={() => addToCart(cartItem)}>
      Añadir al carrito
    </BasicButton>
  );
}
