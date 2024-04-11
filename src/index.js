import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from "./routes/Root";
import InfoPage from './routes/InfoPage';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/info/:id",
    element: <InfoPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
