import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Homepage from "./pages/homepage/homepage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import PageFlip from "./pages/pageFlip/pageFlip.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "all-comics",
    element: <PageFlip />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
