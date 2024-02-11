import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'reactstrap';

import { fetchMock } from '../../../utils/utils';
import { useChangeStateObject } from '../../../hooks';

class FetchingStates {
  categories = true;
  products = true;

  constructor({ categories, products } = {}) {
    this.categories = categories === undefined ? this.categories : categories;
    this.products = products === undefined ? this.products : products;
  }
}

export function ItemListContainer() {
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  // const [isFetching, setIsFetching] = useState(new FetchingStates());

  const [isFetching, setIsFetching, changeFetchingStates] = useChangeStateObject(
    new FetchingStates(),
    { Klass: FetchingStates },
  );

  useEffect(() => {
    const onRejected = (response) => {
      setErrors(response);
    };

    if (params.categoryCode) {
      const onCategoriesFulfilled = (response) => {
        setCategoryId(
          response.find((category) => category.code === params.categoryCode).id,
        );
        changeFetchingStates({ categories: false });
      };

      fetchMock(`${process.env.BASE_URL}/mockData/categories.json`, {
        shouldMockError: true,
      }).then(onCategoriesFulfilled, onRejected);
    } else {
      changeFetchingStates({ categories: false });
    }

    const onProductsFulfilled = (response) => {
      if (categoryId) {
        setFilteredItems(
          response.filter((product) => product.product_category_id === categoryId),
        );
      } else {
        setFilteredItems(response);
      }
      changeFetchingStates({ products: false });
    };

    fetchMock(`${process.env.BASE_URL}/mockData/categories.json`).then(
      onProductsFulfilled,
      onRejected,
    );
  }, []);

  return (
    <div>
      {isFetching.categories || isFetching.products || errors.length ? null : (
        <h2>{categoryId || 'Top ItemListContainer'}</h2>
      )}
      {errors.length ?
        errors.map((err, idx) => (
          <Alert key={idx} color="warning">
            {err.message}
          </Alert>
        ))
      : null}
    </div>
  );
}
