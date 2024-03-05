import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../NavBar';
import { FetchContextProvider } from '../../../contexts/FetchContext';
import { CartContextProvider } from '../../../contexts/CartContext';

export function MainLayout({ ErrorBoundary }) {
  return (
    <FetchContextProvider>
      <CartContextProvider>
        <NavBar />
        {ErrorBoundary ? (
          <ErrorBoundary />
        ) : (
          <div
            css={`
              margin: 20px;
            `}
          >
            <Outlet />
          </div>
        )}
      </CartContextProvider>
    </FetchContextProvider>
  );
}

MainLayout.propTypes = {
  ErrorBoundary: PropTypes.elementType,
};

MainLayout.defaultProps = {
  ErrorBoundary: null,
};
