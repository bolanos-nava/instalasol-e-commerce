import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorHandler } from '../../Errors';
import { BootstrapProgress } from '../../styled-components';
import { ItemDetail } from '../ItemDetail';
import { fetchDocument } from '../../../utils/utils';

export function ItemDetailContainer() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  function onFetchFulfilled(response) {
    setProduct({ id: response.id, ...response.data() });
  }
  function onFetchRejected(response) {
    setErrors(response);
  }

  useEffect(() => {
    fetchDocument('products', productId, 'Producto no encontrado')
      .then(onFetchFulfilled, onFetchRejected)
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
