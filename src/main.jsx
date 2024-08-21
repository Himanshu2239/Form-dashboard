import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Remove the space after "react-router-dom"
import Layout from "./Layout.jsx";

import PipeForm from "./Components/Pipes/PipeForm/PipeForm.jsx";
import Form from "./Form/Form.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Form />,
      },
      {
        path: "/pipes",
        element: <PipeForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
