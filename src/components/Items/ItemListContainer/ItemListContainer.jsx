import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { BootstrapProgress } from '../../styled-components';
import { fetchMock } from '../../../utils/utils';
import { ItemList } from '../ItemList';
import { ErrorHandler } from '../../Errors';

export function ItemListContainer() {
  const { categoryCode } = useParams();
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function onProductsFulfilled(response) {
    setFilteredProducts(response);
  }
  function onFetchFulfilled(responses) {
    const currentCategory = responses[0].find(
      (category) => category.code === categoryCode,
    );
    setCategorySelected(currentCategory);
    setFilteredProducts(
      responses[1].filter(
        (product) => product.product_category_id === currentCategory.id,
      ),
    );
  }
  function onFetchRejected(response) {
    setErrors(response);
  }

  useEffect(() => {
    const getProducts = () =>
      fetchMock(`${process.env.BASE_URL}/mockData/products.json`);
    const getCategories = () =>
      fetchMock(`${process.env.BASE_URL}/mockData/categories.json`);

    if (categoryCode) {
      const promises = [getCategories(), getProducts()];
      Promise.all(promises)
        .then(onFetchFulfilled, onFetchRejected)
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getProducts()
        .then(onProductsFulfilled, onFetchRejected)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [categoryCode, location]);

  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  return (
    <>
      {isLoading ? <BootstrapProgress /> : null}

      <ErrorHandler errors={errors} />

      {isLoading || errors.length ? null : (
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
