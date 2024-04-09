import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./routes/Home";
import InfoPage from './routes/InfoPage';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
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
