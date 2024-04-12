import './App.css'
import Chat from './chat/Chat'
import Navbar from './compoonents/Navbar/Navbar'

function App() {
  
  return (
     <div className='min-h-full main flex flex-row'>
      <Navbar />
      <Chat />
     </div>
  )
}

export default App
