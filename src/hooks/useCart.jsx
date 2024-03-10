import { useContext } from 'react';
import { useCounter } from './useCounter';
import { CartContext } from '../contexts/CartContext';

export function useCart(itemId, stock) {
  const { cart, changeQuantityOfItem, deleteFromCart } =
    useContext(CartContext);
  const quantityInCart = cart[itemId] ?? 0;
  const counter = useCounter(stock, { start: quantityInCart });

  function increment() {
    counter.increment();
    changeQuantityOfItem(itemId, +1);
  }
  function decrement() {
    const currentCount = counter.decrement();
    changeQuantityOfItem(itemId, -1);
    if (currentCount === 0) deleteFromCart(itemId);
  }

  return {
    ...counter,
    increment,
    decrement,
  };
}
