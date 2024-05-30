import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../apps/Auth/Login";
import Register from "../apps/Auth/Register";
import Admin from "../apps/Admin/Admin";
import Comms from "../apps/Comms/Comms";
import Shop from "../apps/Shop/Shop";
import Index from "../index/Index";
// import { useContext } from "react";
// import { AppContext } from "../context/appContext";
// import { UserContextType } from "../@types/app";

// export const  {user} = useContext(AppContext) as UserContextType
export const router = createBrowserRouter([
  {
    path: "/",
    element:  <Index />,
  },
  {
    path: "/home",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <App />
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
