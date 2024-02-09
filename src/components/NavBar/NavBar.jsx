import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import { CartWidget } from '../CartWidget';

export function NavBar({ children }) {
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
            <DropdownToggle nav caret>
              Paquetes
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Paquetes de módulos fotovoltaicos</DropdownItem>
              <DropdownItem>Sistemas aislados</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Productos
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Paneles solares</DropdownItem>
              <DropdownItem>Baterías</DropdownItem>
              <DropdownItem>Protecciones</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>

      <CartWidget />
    </Navbar>
  );
}
