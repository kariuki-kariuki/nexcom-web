import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../apps/Auth/Login";
import Register from "../apps/Auth/Register";
import Admin from "../apps/Admin/Admin";
import Comms from "../apps/Comms/Comms";
import Shop from "../apps/Shop/Shop";
import Index from "../index/Index";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/home",
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
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/comms",
    element: <Comms />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
]);
