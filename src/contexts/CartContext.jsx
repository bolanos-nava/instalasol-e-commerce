import lscache from 'lscache';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

function useCartContext() {
  const [cart, setCart] = useState(() => lscache.get('cart') || {});
  const [itemCount, setItemCount] = useState(0);

  function changeQuantityOfItem(itemId, addendum) {
    setCart((prevCart) => {
      const currentQuantity = prevCart[itemId];
      return {
        ...prevCart,
        [itemId]: currentQuantity + addendum,
      };
    });
  }
  function deleteFromCart(itemId) {
    setCart((_prevCart) => {
      const prevCart = { ..._prevCart };
      delete prevCart[itemId];
      return prevCart;
    });
  }
  function emptyCart() {
    setCart([]);
  }

  useEffect(() => {
    lscache.set('cart', cart);
    setItemCount(
      Object.values(cart).reduce(
        (accumulator, currentQuantity) => accumulator + currentQuantity,
        0,
      ),
    );
  }, [cart]);

  return {
    cart,
    setCart,
    itemCount,
    setItemCount,
    changeQuantityOfItem,
    deleteFromCart,
    emptyCart,
  };
}

export function CartContextProvider({ val, children }) {
  const value = { ...useCartContext(), ...val };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
