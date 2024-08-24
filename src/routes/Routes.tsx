import { createBrowserRouter } from 'react-router-dom';
// import App from "../App";
import Login from '../apps/Auth/Login';
import Register from '../apps/Auth/Register';
import Admin from '../apps/Admin/Admin';
import Shop from '../apps/Shop/Shop';
import Index from '../Index/Index';
import Chat from '../apps/Chat/Chat';
import Callback from '../apps/Auth/Callback';
import Cart from '../apps/Shop/Cart/Cart';
// import { useContext } from "react";
// import { AppContext } from "../context/appContext";
// import { UserContextType } from "../@types/app";

// export const  {user} = useContext(AppContext) as UserContextType
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/home',
    element: <Index />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/callback/:token',
    element: <Callback />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
]);
