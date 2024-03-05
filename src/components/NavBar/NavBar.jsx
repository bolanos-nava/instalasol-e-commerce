import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import { CartContext } from '../../contexts/CartContext';
import { CartWidget } from '../CartWidget';

export function NavBar() {
  const { cart } = useContext(CartContext);
  const [isOpenNavBar, setIsOpenNavBar] = useState(false);

  const toggleNavbar = () => setIsOpenNavBar((state) => !state);
  return (
    <Navbar className="bg-tw-primary" expand="md">
      <Link
        css={`
          height: 5rem;
        `}
        to="/"
      >
        <img
          css={`
            object-fit: contain;
            height: 100%;
          `}
          src={`${process.env.BASE_URL}/images/instalasol-logo.png`}
          alt="InstalaSol logo"
        />
      </Link>

      <NavbarToggler onClick={toggleNavbar} />

      <Collapse isOpen={isOpenNavBar} navbar>
        <Nav className="me-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="text-white" nav caret>
              Categorías
            </DropdownToggle>
            <DropdownMenu>
              <Link to="/category/solar_modules">
                <DropdownItem>Módulos fotovoltaicos</DropdownItem>
              </Link>
              <Link to="/category/solar_inverters">
                <DropdownItem>Inversores solares</DropdownItem>
              </Link>
              <Link to="/category/cables_connectors">
                <DropdownItem>Cables y conectores</DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>

      <CartWidget count={Object.keys(cart).length} />
    </Navbar>
  );
}
