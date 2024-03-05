import lscache from 'lscache';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

function useCartContext() {
  const [cart, setCart] = useState(() => lscache.get('cart') || {});

  function deleteFromCart(cartItem) {
    setCart((_prevCart) => {
      const prevCart = { ..._prevCart };
      delete prevCart[cartItem.id];
      return prevCart;
    });
  }

  useEffect(() => {
    lscache.set('cart', cart);
  }, [cart]);

  return {
    cart,
    setCart,
    deleteFromCart,
  };
}

export function CartContextProvider({ val, children }) {
  const value = { ...useCartContext(), ...val };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
