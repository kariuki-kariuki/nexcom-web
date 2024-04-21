import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../apps/Auth/Login";
import Register from "../apps/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
