import './App.css';

import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { CartWidget } from './components/CartWidget';

function App() {
  return (
    <>
      <NavBar>
        <CartWidget />
      </NavBar>
      <Outlet />
    </>
  );
}

export default App;
