import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../../pages/Login";
import { RouterProvider } from "react-router-dom";
import { Home } from "../../pages/Home";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Detail } from "../../pages/Detail";
import { Register } from "../../pages/Register";

// Definição das rotas
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <DefaultLayout children={<Register />} />,
  },
  {
    path: "/home",
    element: <DefaultLayout children={<Home />} />,
  },
  {
    path: "/detail",
    element: <DefaultLayout children={<Detail />} />,
  },
  
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
]);

// Prover essa rotas
export function AppRoutes() {
  return <RouterProvider router={router} />;
}
