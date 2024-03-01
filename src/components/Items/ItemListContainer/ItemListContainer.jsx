import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { BootstrapProgress } from '../../styled-components';
import { fetchCollection, fetchMock } from '../../../utils/utils';
import { ItemList } from '../ItemList';
import { ErrorHandler } from '../../Errors';
import { where } from 'firebase/firestore';

export function ItemListContainer() {
  const { categoryCode } = useParams();
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function onFetchFulfilled(responses) {
    const currentCategory = responses[0].find(
      (category) => category.code === categoryCode,
    );
    if (currentCategory) {
      setCategorySelected(currentCategory ?? {});
      setFilteredProducts(
        responses[1].filter(
          (product) => product.product_category_id === currentCategory.id,
        ),
      );
    } else {
      setErrors([{ message: 'Categoría no encontrada', status: 404 }]);
    }
  }
  function onFetchRejected(response) {
    setErrors(response);
  }

  function onProductsFulfilled(response) {
    const products = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFilteredProducts(products);
  }

  useEffect(() => {
    const getProducts = () =>
      fetchMock(`${process.env.BASE_URL}/mockData/products.json`);
    const getCategories = () =>
      fetchMock(`${process.env.BASE_URL}/mockData/categories.json`);

    const categoryFilters = categoryCode
      ? [where('code', '==', categoryCode)]
      : [];
    const fetchProducts = () =>
      fetchCollection('products', {
        errorMessage: 'Productos no encontrados para esta categoría',
        filters: categoryFilters,
      });

    // if (categoryCode) {
    //   // const promises = [getCategories(), getProducts()];
    //   // Promise.all(promises)
    //   //   .then(onFetchFulfilled, onFetchRejected)
    //   //   .finally(() => {
    //   //     setIsLoading(false);
    //   //   });
    // } else {
    //   fetchProducts()
    //     .then(onProductsFulfilled, onFetchRejected)
    //     .finally(() => setIsLoading(false));
    // }

    fetchCollection('products', {
      errorMessage: 'Productos no encontrados para esta categoría',
      filters: categoryFilters,
    })
      .then(onProductsFulfilled, onFetchRejected)
      .finally(() => setIsLoading(false));
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
