import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorHandler } from '../../Errors';
import { BootstrapProgress } from '../../styled-components';
import { ItemDetail } from '../ItemDetail';
import { fetchMock } from '../../../utils/utils';

export function ItemDetailContainer() {
  let { productId } = useParams();
  productId = Number(productId);
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  function onProductsFulfilled(response) {
    const selectedProduct = response.find((item) => item.id === productId);
    if (!selectedProduct) {
      setErrors([{ message: 'Producto no encontrado', status: 404 }]);
    } else {
      setProduct((prevState) => selectedProduct || prevState);
    }
  }
  function onProductsRejected(response) {
    setErrors(response);
  }

  useEffect(() => {
    fetchMock(`${process.env.BASE_URL}/mockData/products.json`)
      .then(onProductsFulfilled, onProductsRejected)
      .finally(() => setIsFetching(false));
  }, [productId]);

  return (
    <>
      {isFetching ? <BootstrapProgress /> : null}

      <ErrorHandler errors={errors} />

      {isFetching || errors.length ? null : <ItemDetail item={product} />}
    </>
  );
}
