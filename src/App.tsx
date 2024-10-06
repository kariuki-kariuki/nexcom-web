import { useContext } from 'react';
import './App.css';
import { AppContext } from './context/appContext';
import { UserContextType } from './@types/app';
import { useFetch } from './hooks/useFetchHooks.tsx';
import { GlobalUser } from './@types/chat';
import MyRoutes from './routes/Routes.tsx';

function App() {
  const { user, updateUser } = useContext(AppContext) as UserContextType;
  const { response, isLoading } = useFetch<GlobalUser>(`auth/me`);

  if (!isLoading) updateUser(response);

  return <MyRoutes user={user} />;
}

export default App;
