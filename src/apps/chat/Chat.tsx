
import { useEffect, useState } from 'react'
import ChatBox from './ChatBox/ChatBox'
import Navigation from './Navigation/Navigation'
import chats, { ConversationProps } from '../../data/data'


function Chat() {
  const [conversations, setConversation] = useState<ConversationProps[]>([])
  const [activeChat, setActiveChat] = useState("main")
  const [active, setActive] = useState<ConversationProps>(conversations[0])
  useEffect(() => {
    setConversation(chats)
    setActive(chats[0])
  }, [])
  
  return (
    <div className='bg-slate-300 sm:w-10/12  min-h-full  sm:flex '>
      <Navigation conversations = { conversations } set_active = {setActive} active_id={active?.id} activeChat = {activeChat} setActiveChat={setActiveChat}/>
      <ChatBox conversation = {active} activeChat={activeChat}/>
    </div>
  )
}

export default Chat