import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { MainLayout } from './components/layouts';
import { ItemListContainer } from './views/ItemList';
import { ItemDetailContainer } from './views/ItemDetail';

function ErrorBoundary() {
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);
  return <div className="text-3xl text-cyan-700">Dang!</div>;
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <MainLayout ErrorBoundary={ErrorBoundary} />,
      children: [
        {
          path: 'category?/:categoryCode?',
          element: <ItemListContainer />,
        },
        {
          path: 'item/:productId',
          element: <ItemDetailContainer />,
        },
      ],
    },
  ],
  {
    // defines base path. Every other path will be child of this one
    basename: '/instalasol-e-commerce',
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
