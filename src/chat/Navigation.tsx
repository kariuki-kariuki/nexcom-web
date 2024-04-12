import  { useEffect, useState } from 'react'
import chats, { Conversation } from '../data/data'
import ContactCard from './ContactCard'
const Navigation = () => {
  const [chatss, setChats] = useState<Conversation[]>([])
  useEffect(() => {
    setChats(chats)
  }, [])
  console.log(chatss)
  const conversations = chatss?.map((convo: Conversation) => 
    <ContactCard  image={convo.sender.avatar} name={convo.sender.first_name} status={convo.sender.status} key={convo.id}/>
  )

  
  return (
    <div className='w-1/5 bg-white vh-100 '>
        <header className='font-mono p-5'>
          <p>Chats</p>
        </header>
        <hr />
        <div className="chats h-full overflow-hidden">
          {conversations}
        </div>
    </div>
  )
}

export default Navigation