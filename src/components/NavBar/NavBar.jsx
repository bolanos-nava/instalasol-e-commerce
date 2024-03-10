import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
import { CartWidget } from '../CartWidget';

export function NavBar() {
  const [isOpenNavBar, setIsOpenNavBar] = useState(false);

  const toggleNavbar = () => setIsOpenNavBar((state) => !state);

  const links = [
    {
      text: 'Módulos fotovoltaicos',
      path: '/category/solar_modules',
    },
    {
      text: 'Inversores solares',
      path: '/category/solar_inverters',
    },
    {
      text: 'Cables y conectores',
      path: '/category/cables_connectors',
    },
  ];

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

      <NavbarToggler className="bg-slate-200" onClick={toggleNavbar} />

      <Collapse isOpen={isOpenNavBar} navbar>
        <Nav className="me-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="text-white" nav caret>
              Categorías
            </DropdownToggle>
            <DropdownMenu>
              {links.map(({ text, path }) => (
                <NavLink to={path}>
                  {({ isActive }) => (
                    <DropdownItem className={isActive ? 'bg-bg-darker-7' : ''}>
                      {text}
                    </DropdownItem>
                  )}
                </NavLink>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>

      <CartWidget />
    </Navbar>
  );
}
