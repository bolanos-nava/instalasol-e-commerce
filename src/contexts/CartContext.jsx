import lscache from 'lscache';
import { createContext, useState } from 'react';

export const CartContext = createContext();

function useCartContext() {
  const [cart, setCart] = useState(() => lscache.get('cart') || []);

  function addToCart(item) {
    lscache.set('cart', [...cart, item]);
    setCart((prevState) => [...prevState, item]);
  }

  return {
    cart,
    setCart,
    addToCart,
  };
}

export function CartContextProvider({ val, children }) {
  const value = { ...useCartContext(), ...val };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
