import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useChangeStateObject } from '../../../hooks';
import { BootstrapProgress } from '../../styled-components';
import { fetchMock } from '../../../utils/utils';
import { ItemList } from '../ItemList';
import { ErrorHandler } from '../../Errors';

class FetchingStates {
  categories = true;
  products = true;

  constructor({ categories, products } = {}) {
    this.categories = categories === undefined ? this.categories : categories;
    this.products = products === undefined ? this.products : products;
  }
}

export function ItemListContainer() {
  const { categoryCode } = useParams();
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [categories, setCategories] = useState([]);

  console.log(location);

  const [isFetching, , changeFetchingStates, resetFetchingStates] =
    useChangeStateObject(new FetchingStates(), { Klass: FetchingStates });

  function onProductsFulfilled(response) {
    if (categoryCode) {
      setFilteredProducts(
        response.filter(
          (product) => product.product_category_id === categorySelected.id,
        ),
      );
    } else {
      setFilteredProducts(response);
    }
  }
  function onCategoriesFulfilled(response) {
    setCategories(response);
    setCategorySelected(
      response.find((category) => category.code === categoryCode),
    );
  }
  function onFetchRejected(response) {
    setErrors(response);
  }

  useEffect(() => {
    if (!categoryCode || (categoryCode && categories.length)) {
      fetchMock(`${process.env.BASE_URL}/mockData/products.json`)
        .then(onProductsFulfilled, onFetchRejected)
        .finally(() => {
          changeFetchingStates({ products: false });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    if (categoryCode) {
      fetchMock(`${process.env.BASE_URL}/mockData/categories.json`)
        .then(onCategoriesFulfilled, onFetchRejected)
        .finally(() => {
          changeFetchingStates({ categories: false });
        });
    } else {
      changeFetchingStates({ categories: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryCode]);

  return (
    <>
      {isFetching.categories || isFetching.products ? (
        <BootstrapProgress />
      ) : null}

      <ErrorHandler errors={errors} />

      {isFetching.categories || isFetching.products || errors.length ? null : (
        <>
          <h2>
            {!categoryCode ? 'Todos los productos' : categorySelected.name}
          </h2>
          <ItemList items={filteredProducts} />
        </>
      )}
    </>
  );
}
