import { useState } from 'react';
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

export function NavBar({ children }) {
  const [isOpenNavBar, setIsOpenNavBar] = useState(false);

  const toggleNavbar = () => setIsOpenNavBar((state) => !state);
  return (
    <Navbar
      css={`
        background-color: #9ca5b4;
      `}
      expand="md"
    >
      <NavbarBrand
        css={`
          height: 5rem;
        `}
        href="/"
      >
        <img
          css={`
            object-fit: contain;
            height: 100%;
          `}
          src={`${import.meta.env.BASE_URL}/images/instalasol-logo.png`}
          alt="InstalaSol logo"
        />
      </NavbarBrand>

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
          <UncontrolledDropdown>
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

      <NavbarText>{children}</NavbarText>
    </Navbar>
  );
}
