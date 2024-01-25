import './App.css';
import CartWidget from './components/CartWidget';
import NavBar from './components/NavBar';

function App() {
  return (
    <NavBar>
      <CartWidget />
    </NavBar>
  );
}

export default App;
