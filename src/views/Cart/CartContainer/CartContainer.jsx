import { useContext, useEffect, useState } from 'react';
import { documentId, where } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { fetchCollection } from '../../../utils/utils';
import { CartContext } from '../../../contexts/CartContext';
import { ErrorHandler } from '../../../components/Errors';
import { BootstrapProgress } from '../../../components/styled-components';
import { ItemList } from '../../ItemList/ItemList';
import { CartItemCard } from '../../../components/CartItemCard';

export function CartContainer() {
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const [errors, setErrors] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  function onFetchRejected(response) {
    setErrors(response);
  }
  function onFetchFulfilled(response) {
    setCartItems(
      response.docs.map((docu) => ({
        id: docu.id,
        quantity: cart[docu.id],
        ...docu.data(),
      })),
    );
  }

  useEffect(() => {
    const cartItemIds = Object.keys(cart);
    if (cartItemIds.length) {
      fetchCollection('products', {
        filters: [where(documentId(), 'in', Object.keys(cart))],
      })
        .then(onFetchFulfilled, onFetchRejected)
        .finally(() => setIsFetching(false));
    }
  }, [location]);

  useEffect(() => {
    const cartItemIds = Object.keys(cart);
    if (!cartItemIds.length) {
      setIsFetching(false);
      setErrors([{ message: 'El carrito está vacío', status: 500 }]);
    }
  }, [location, cart]);

  return (
    <>
      <h2>Carrito de compras</h2>

      {isFetching ? <BootstrapProgress /> : <ErrorHandler errors={errors} />}

      {isFetching || errors.length ? null : (
        <ItemList items={cartItems} Children={CartItemCard} />
      )}
    </>
  );
}
