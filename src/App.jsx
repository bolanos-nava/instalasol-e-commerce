import './App.css';
import CartWidget from './components/CartWidget';
import NavBar from './components/NavBar';
import { ItemListContainer } from './components/Items/ItemListContainer/ItemListContainer';

function App() {
  return (
    <>
      <NavBar>
        <CartWidget />
      </NavBar>
      <ItemListContainer greeting="Bienvenido a tu tienda en línea - consigue todo para tu proyecto de instalación de paneles solares aquí" />
    </>
  );
}

export default App;
