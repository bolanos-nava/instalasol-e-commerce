import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Progress } from 'reactstrap';

import { fetchMock } from '../../../utils/utils';
import { useChangeStateObject } from '../../../hooks';
import { BootstrapProgress } from '../../styled-components';

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
  const [category, setCategory] = useState(null);

  const [isFetching, , changeFetchingStates] = useChangeStateObject(
    new FetchingStates(),
    { Klass: FetchingStates },
  );

  useEffect(() => {
    const onRejected = (response) => {
      setErrors(response);
    };

    if (params.categoryCode) {
      const onCategoriesFulfilled = (response) => {
        setCategory(response.find((category) => category.code === params.categoryCode));
        setCategoryId(
          response.find((category) => category.code === params.categoryCode).id,
        );
        changeFetchingStates({ categories: false });
      };

      fetchMock(`${process.env.BASE_URL}/mockData/categories.json`).then(
        onCategoriesFulfilled,
        (response) => {
          onRejected(response);
          changeFetchingStates({ categories: false });
        },
      );
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

    fetchMock(`${process.env.BASE_URL}/mockData/products.json`).then(
      onProductsFulfilled,
      (response) => {
        onRejected(response);
        changeFetchingStates({ products: false });
      },
    );
  }, []);

  useEffect(() => {
    const onRejected = (response) => {
      setErrors(response);
    };
  }, [category]);

  return (
    <>
      {isFetching.categories || isFetching.products ? <BootstrapProgress /> : null}

      {errors.length ? (
        <Alert color="warning">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err.message}</li>
            ))}
          </ul>
        </Alert>
      ) : null}

      {isFetching.categories || isFetching.products || errors.length ? null : (
        <h2>Catálogo de {!categoryId ? 'productos' : 'productos'}</h2>
      )}
    </>
  );
}
