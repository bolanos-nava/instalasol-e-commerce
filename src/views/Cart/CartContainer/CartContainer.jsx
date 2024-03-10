import { useContext, useEffect, useMemo, useState } from 'react';
import { documentId, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { fetchCollection } from '../../../utils/utils';
import { CartContext } from '../../../contexts/CartContext';
import { ErrorHandler } from '../../../components/Errors';
import { BootstrapProgress } from '../../../components/styled-components';
import { ItemList } from '../../ItemList/ItemList';
import { CartItemCard } from '../../../components/CartItemCard';
import { BasicButton } from '../../../components/styled-components/BasicButton';

export function CartContainer() {
  const { cart, clearCart } = useContext(CartContext);
  const [errors, setErrors] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  function onFetchFulfilled(response) {
    setCartItems(
      response.docs.map((docu) => ({
        id: docu.id,
        quantity: cart[docu.id],
        ...docu.data(),
      })),
    );
  }
  function onFetchRejected(response) {
    setErrors(response);
  }

  useEffect(() => {
    const cartItemIds = Object.keys(cart);
    if (cartItemIds.length) {
      fetchCollection('products', {
        filters: [where(documentId(), 'in', cartItemIds)],
      })
        .then(onFetchFulfilled, onFetchRejected)
        .finally(() => setIsFetching(false));
    }
  }, []);

  useEffect(() => {
    const cartItemIds = Object.keys(cart);
    // setCartItems((prevState) => {
    //   const val = prevState.filter(({ id: itemId }) =>
    //     Object.keys(cart).includes(itemId),
    //   );
    //   console.log({ val });
    //   return val;
    // });
    if (!cartItemIds.length) {
      setIsFetching(false);
      setCartItems([]);
      setErrors([{ message: 'El carrito está vacío', status: 500 }]);
    }
  }, [cart]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((accumulator, { id: itemId, price }) => {
        const subtotal = cart[itemId] ? cart[itemId] * price : 0;
        return accumulator + subtotal;
      }, 0),
    [cartItems, cart],
  );

  return (
    <>
      <h1 className="mb-3">Carrito de compras</h1>

      {isFetching ? <BootstrapProgress /> : <ErrorHandler errors={errors} />}

      {isFetching || errors.length ? null : (
        <ItemList items={cartItems} Children={CartItemCard} />
      )}

      <div className="d-flex flex-column align-items-end gap-1 mt-5">
        <p>Total: ${totalPrice}</p>
        <div className="d-flex justify-end flex-wrap gap-2">
          <BasicButton disabled={!Object.keys(cart).length} onClick={clearCart}>
            Vaciar carrito
          </BasicButton>
          <BasicButton disabled={!Object.keys(cart).length}>
            <Link to="/checkout">Finalizar compra</Link>
          </BasicButton>
        </div>
      </div>
    </>
  );
}
