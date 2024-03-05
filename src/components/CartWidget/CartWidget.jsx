import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CircularContainer } from '../styled-components';

export function CartWidget({ count = 10 }) {
  return (
    <CircularContainer
      as="button"
      css={`
        --diameter: 3rem;
        background-color: #13a7e2;
        position: relative;
      `}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      {count ? (
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
          {count}
        </CircularContainer>
      ) : null}
    </CircularContainer>
  );
}
