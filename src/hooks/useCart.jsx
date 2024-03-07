import { useContext, useEffect } from 'react';
import { useCounter } from './useCounter';
import { CartContext } from '../contexts/CartContext';

export function useCart(itemId, stock) {
  const { cart, setCart, deleteFromCart } = useContext(CartContext);
  const quantityInCart = cart[itemId] ?? 0;
  const counter = useCounter(stock, { start: quantityInCart });

  useEffect(() => {
    if (!counter.count) deleteFromCart(itemId);
  }, [counter.count]);

  function changeQuantity(addendum) {
    setCart((prevCart) => {
      const currentQuantity = prevCart[itemId];
      return {
        ...prevCart,
        [itemId]: currentQuantity + addendum,
      };
    });
  }
  function increment() {
    counter.increment();
    changeQuantity(+1);
  }
  function decrement() {
    counter.decrement();
    changeQuantity(-1);
  }

  return {
    ...counter,
    increment,
    decrement,
  };
}
