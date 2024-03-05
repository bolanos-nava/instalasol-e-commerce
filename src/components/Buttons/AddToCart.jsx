import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { BasicButton } from '../styled-components/BasicButton';

export function AddToCart({ className }) {
  const { addToCart } = useContext(CartContext);
  const onClick = () => {
    console.log('Shit');
  };
  return (
    <BasicButton className={className} onClick={onClick}>
      Añadir al carrito
    </BasicButton>
  );
}
