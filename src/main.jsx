import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ItemListContainer } from './components/Items/ItemListContainer';

const router = createBrowserRouter([
  {
    path: '/instalasol-e-commerce',
    element: <App />,
    errorElement: <h1>Oops!</h1>,
    children: [
      {
        path: ':categoryId?',
        element: <ItemListContainer />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/instalasol-e-commerce" />,
  },
  {
    path: '/instalasol-e',
    element: <h1>Oops</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
