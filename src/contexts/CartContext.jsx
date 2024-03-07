import lscache from 'lscache';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

function useCartContext() {
  const [cart, setCart] = useState(() => lscache.get('cart') || {});
  const [itemCount, setItemCount] = useState(0);

  function deleteFromCart(itemId) {
    setCart((_prevCart) => {
      const prevCart = { ..._prevCart };
      delete prevCart[itemId];
      return prevCart;
    });
  }

  useEffect(() => {
    lscache.set('cart', cart);
    setItemCount(
      Object.values(cart).reduce(
        (quantity, totalCount) => totalCount + quantity,
        0,
      ),
    );
  }, [cart]);

  return {
    cart,
    setCart,
    itemCount,
    setItemCount,
    deleteFromCart,
  };
}

export function CartContextProvider({ val, children }) {
  const value = { ...useCartContext(), ...val };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
