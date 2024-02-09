import React from 'react';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <>
      <h2>HOLA</h2>
      <Outlet />
    </>
  );
}
