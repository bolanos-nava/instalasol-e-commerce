import { useContext } from 'react';
import { useCounter } from './useCounter';
import { CartContext } from '../contexts/CartContext';

export function useAddToCart(itemId, stock) {
  const { cart, setCart } = useContext(CartContext);
  const quantityInCart = cart[itemId] ?? 0;

  const currentStock = stock - quantityInCart;
  const counter = useCounter(currentStock);
  const isOutOfStock = quantityInCart + counter.count > stock;

  function addToCart(cartItem) {
    if (cartItem.quantity > 0 && !isOutOfStock) {
      setCart((prevCart) => {
        const currentQuantity = prevCart[cartItem.id] ?? 0;
        return {
          ...prevCart,
          [cartItem.id]: currentQuantity + cartItem.quantity,
        };
      });
      counter.setMax((prevMax) => prevMax - cartItem.quantity);
    }
  }

  return {
    ...counter,
    addToCart,
    isOutOfStock,
  };
}
