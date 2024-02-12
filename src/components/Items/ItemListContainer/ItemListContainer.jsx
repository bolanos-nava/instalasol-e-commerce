import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Progress } from 'reactstrap';

import { useChangeStateObject } from '../../../hooks';
import { BootstrapProgress } from '../../styled-components';
import { ItemCard } from '../ItemCard';
import { fetchMock } from '../../../utils/utils';

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
  const [categorySelected, setCategorySelected] = useState({});
  const [categories, setCategories] = useState([]);

  const [isFetching, , changeFetchingStates] = useChangeStateObject(
    new FetchingStates(),
    { Klass: FetchingStates },
  );

  function onProductsRejected(response) {
    setErrors(response);
    changeFetchingStates({ products: false });
  }
  function onProductsFulfilled(response) {
    if (params.categoryCode) {
      setFilteredItems(
        response.filter(
          (product) => product.product_category_id === categorySelected.id,
        ),
      );
    } else {
      setFilteredItems(response);
    }
    changeFetchingStates({ products: false });
  }
  function onCategoriesRejected(response) {
    setErrors(response);
    changeFetchingStates({ categories: false });
  }
  function onCategoriesFulfilled(response) {
    setCategories(response);
    setCategorySelected(
      response.find((category) => category.code === params.categoryCode),
    );
    changeFetchingStates({ categories: false });
  }

  useEffect(() => {
    if (!params.categoryCode) changeFetchingStates({ categories: false });

    if (!params.categoryCode || (params.categoryCode && categories.length)) {
      fetchMock(`${process.env.BASE_URL}/mockData/products.json`).then(
        onProductsFulfilled,
        onProductsRejected,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    if (params.categoryCode) {
      fetchMock(`${process.env.BASE_URL}/mockData/categories.json`).then(
        onCategoriesFulfilled,
        onCategoriesRejected,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.categoryCode]);

  console.log({ categories, filteredItems });

  return (
    <>
      {isFetching.categories || isFetching.products ? (
        <BootstrapProgress />
      ) : null}

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
        <h2>
          {!params.categoryCode ? 'Todos los productos' : categorySelected.name}
        </h2>
      )}

      {filteredItems.length ? (
        <div
          css={`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
          `}
        >
          {filteredItems.map((item, idx) => (
            <ItemCard key={idx} item={item} />
          ))}
        </div>
      ) : null}
    </>
  );
}
