import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { CartWidget } from './components/CartWidget';
import routes from './routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <NavBar>
        <CartWidget />
      </NavBar>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
