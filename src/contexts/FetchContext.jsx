import { createContext, useEffect, useState } from 'react';
import { fetchCollection } from '../utils/utils';

function useFetchContext() {
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);

  function onCategoriesFetchFulfilled(response) {
    const fetchedCategories = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(fetchedCategories);
  }
  function onCategoriesFetchRejected(response) {
    setErrors(response);
  }

  useEffect(() => {
    fetchCollection('categories', 'Ocurrió un error inesperado').then(
      onCategoriesFetchFulfilled,
      onCategoriesFetchRejected,
    );
  }, []);

  return {
    categories,
    errors,
  };
}

export const FetchContext = createContext();

export function FetchContextProvider({ children, value }) {
  const val = { ...useFetchContext(), ...value };
  return <FetchContext.Provider value={val}>{children}</FetchContext.Provider>;
}
