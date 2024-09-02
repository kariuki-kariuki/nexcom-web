import { useContext, useEffect } from 'react';
import './App.css';
import { AppContext } from './context/appContext';
import { UserContextType } from './@types/app';
import { useFetch } from './hooks/useFetchHooks.tsx';
import { GlobalUser } from './@types/chat';
import MyRoutes from './routes/Routes.tsx';

function App() {
  const { user, updateUser } = useContext(AppContext) as UserContextType;
  const { result } = useFetch<GlobalUser>(`auth/me`);
  updateUser(result);
  useEffect(() => {
    updateUser(result);
  }, []);

  return <MyRoutes user={user} />;
}

export default App;
