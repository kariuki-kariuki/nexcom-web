import Bar from "./Bar";
import Message from "../components/Message";
import { UserProps } from "../../../@types/chat";
import { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";
import MessageBox from "../components/MessageBox";
import { ConversationContext, activeConversatonType } from "../../../context/activeConversation";

// interface Props {
//   conversation: ConversationProps;
// }

function ChatBox() {
   const {conversation} = useContext(ConversationContext) as activeConversatonType;
  const messages = conversation?.messages.map((message) => <Message message ={ message} key={message?.msg}/>)
  const {user} = useContext(AppContext) as UserContextType;
  let sender: UserProps | null = null;
  if (conversation && conversation?.user_1.email == user.email){
    sender = conversation?.user_2;
  } else if( conversation ){
    sender = conversation?.user_1;
  } 
  console.log("Loged in user is: ", user)
  return (
    <div className={`w-full relative h-full`}>
      <Bar
        name={sender ? sender.name : ""}
        image={sender ? sender.avatar: ""}
        status={"Hello World"}
      />
      {messages}
      <MessageBox/>
    </div>
  );
}

export default ChatBox;
