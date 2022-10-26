import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import { ErrorPage, NavLink } from './components';
import RotateBox from './components/RotateBox';
import './index.css';
import { GamePage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/unknown',
        element: <RotateBox />,

        errorElement: <ErrorPage />,
      },
      {
        path: '/game',
        element: <GamePage />,

        errorElement: <ErrorPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
