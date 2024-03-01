import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../NavBar';
import { FetchContextProvider } from '../../../contexts/FetchContext';

export function MainLayout({ ErrorBoundary }) {
  return (
    <FetchContextProvider>
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
    </FetchContextProvider>
  );
}

MainLayout.propTypes = {
  ErrorBoundary: PropTypes.elementType,
};

MainLayout.defaultProps = {
  ErrorBoundary: null,
};
