import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { doc, getFirestore, where } from 'firebase/firestore';

import { BootstrapProgress } from '../../styled-components';
import { fetchCollection } from '../../../utils/utils';
import { ItemList } from '../ItemList';
import { ErrorHandler } from '../../Errors';
import { FetchContext } from '../../../contexts/FetchContext';

export function ItemListContainer() {
  const { categoryCode } = useParams();
  const location = useLocation();
  const { categories, isFetching: areCategoriesFetching } =
    useContext(FetchContext);
  const [errors, setErrors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function onFetchRejected(response) {
    setErrors(response);
  }

  function onProductsFulfilled(response) {
    const products = response.docs.map((docu) => ({
      id: docu.id,
      ...docu.data(),
    }));
    setFilteredProducts(products);
  }

  useEffect(() => {
    const db = getFirestore();
    if (!areCategoriesFetching) {
      let categoryFilters = [];
      if (categoryCode) {
        const currentCategory = categories.find(
          (category) => category.code === categoryCode,
        );
        // this operator will leave the categorySelected as an empty object in case the category
        // param doesn't actually exist
        setCategorySelected(currentCategory ?? {});
        categoryFilters = [
          where(
            'product_category_id',
            '==',
            doc(
              db,
              'categories',
              currentCategory ? currentCategory.id : 'invalid_category',
            ),
          ),
        ];
      }

      fetchCollection('products', {
        errorMessage: 'Productos no encontrados para esta categoría',
        filters: categoryFilters,
      })
        .then(onProductsFulfilled, onFetchRejected)
        .finally(() => setIsLoading(false));
    }
  }, [categoryCode, location, areCategoriesFetching, categories]);

  useEffect(() => {
    setErrors([]);
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
