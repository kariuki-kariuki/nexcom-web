import { useContext, useEffect} from 'react'
import './App.css'
import Chat from './apps/Chat/Chat'
import Navbar from './compoonents/Navbar/Navbar'
import { AppContext } from './context/appContext'
import { UserContextType } from './@types/app'
//  interface userProps {
//   user_name: string
//   user_id: string
//  }
function App() {
  const { updateUser} = useContext(AppContext) as UserContextType;
  const token = localStorage.getItem("token")
  console.log(token);
  useEffect(() => {
    fetch("http://192.168.100.4:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      if(res.ok){
        res.json().then(res => {
          console.log(res);
          updateUser(res[0]);
        })
      }
    })
  }, [])
  return (
     <div className='min-h-full main flex flex-row'>
      <Navbar />
      <Chat />
     </div>
  )
}

export default App
