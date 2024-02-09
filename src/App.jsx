import './scss/styles.scss';

import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import { MainLayout } from './components/Layouts';
import { ItemDetail, ItemListContainer } from './components/Items';

function ErrorBoundary() {
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);
  return <div>Dang!</div>;
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <MainLayout ErrorBoundary={ErrorBoundary} />,
      children: [
        {
          path: 'category?/:categoryId?',
          element: <ItemListContainer />,
        },
        {
          path: 'item/:productId',
          element: <ItemDetail />,
        },
      ],
    },
  ],
  {
    // defines base path
    basename: '/instalasol-e-commerce',
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
