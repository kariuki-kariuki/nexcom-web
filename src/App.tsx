import { useContext, useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.tsx';
import { AppContext } from './context/appContext';
import { UserContextType } from './@types/app';
//  interface userProps {
//   user_name: string
//   user_id: string
//  }
function App() {
  const { updateUser } = useContext(AppContext) as UserContextType;

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://192.168.100.16:3000/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          updateUser(res);
          console.log(res);
        });
      }
    });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
