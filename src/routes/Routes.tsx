import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from "../App";
import Login from '../apps/Auth/Login';
import Admin from '../apps/Admin/Admin';
import Shop from '../apps/Shop/Shop';
import Index from '../Index/Index';
import Chat from '../apps/Chat/Chat';
import Callback from '../apps/Auth/Callback';
import Cart from '../apps/Shop/Cart/Cart';
import { GlobalUser } from '../@types/chat';
const MyRoutes = ({ user }: { user: GlobalUser | null }) => {
  const router = createBrowserRouter([
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
      element: user ? <Index /> : <Login />,
    },
    {
      path: '/callback/:token',
      element: <Callback />,
    },
    {
      path: '/admin',
      element: user?.shop ? <Admin /> : <Login />,
    },
    {
      path: '/chat',
      element: user ? <Chat /> : <Login />,
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
  return <RouterProvider router={router} />;
};

export default MyRoutes;
