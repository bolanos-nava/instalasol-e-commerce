import { Navigate } from 'react-router-dom';
import { ItemDetail, ItemListContainer } from './components/Items';
import { MainLayout } from './components/Layouts';

const routes = [
  {
    path: '/instalasol-e-commerce',
    element: <MainLayout />,
    children: [
      {
        path: ':categoryId?',
        element: <ItemListContainer />,
      },
      {
        path: ':categoryId/:productId',
        element: <ItemDetail />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/instalasol-e-commerce" />,
  },
];

export default routes;
