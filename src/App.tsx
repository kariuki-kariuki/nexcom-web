import { useEffect} from 'react'
import './App.css'
import Chat from './apps/chat/Chat'
import Navbar from './compoonents/Navbar/Navbar'
//  interface userProps {
//   user_name: string
//   user_id: string
//  }
function App() {
  // const [user, setUser] = useState("")
  const token = localStorage.getItem("token")
  useEffect(() => {
    fetch("http://localhost:3000/api/user/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      if(res.ok){
        res.json().then(res => {
          console.log(res)
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
