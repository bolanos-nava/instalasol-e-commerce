import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../contexts/CartContext';
import { CircularContainer } from '../styled-components';

export function CartWidget() {
  const { itemCount } = useContext(CartContext);
  return (
    <CircularContainer
      as={Link}
      to="/cart"
      css={`
        --diameter: 3rem;
        background-color: #13a7e2;
        position: relative;
      `}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      {itemCount ? (
        <CircularContainer
          css={`
            --diameter: 1.5rem;
            background-color: #cc0808;
            color: #fff;
            position: absolute;
            padding: 2px;
            top: 0;
            right: -0.1rem;
          `}
        >
          {itemCount}
        </CircularContainer>
      ) : null}
    </CircularContainer>
  );
}
