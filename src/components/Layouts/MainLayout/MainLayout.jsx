import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../NavBar';

export function MainLayout({ ErrorBoundary }) {
  return (
    <>
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
    </>
  );
}

MainLayout.propTypes = {
  ErrorBoundary: PropTypes.elementType,
};

MainLayout.defaultProps = {
  ErrorBoundary: null,
};
