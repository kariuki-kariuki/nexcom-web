import Message from "../components/Message";
import { useContext } from "react";
// import MessageBox from "../components/MessageBox";
import {
  ConversationContext,
  activeConversatonType,
} from "../../../context/activeConversation";
import Bar from "./Bar";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";
import { UserProps } from "../../../@types/chat";

function ChatBox() {
  const { activeConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  const { user } = useContext(AppContext) as UserContextType;
  let sender: UserProps | null;
  if (activeConversation?.user_1?.email === user.email) {
    sender = activeConversation?.user_2;
  } else if (activeConversation){
    sender = activeConversation?.user_1;
  } else {
    sender = null;
  }
  const messages = activeConversation?.messages?.map((message) => (
    <Message message={message} key={message?.msg} sender = {sender}/>
  ));

  return (
    <div className={`w-full h-full`}>
      <Bar />
      <div>
        {messages}
        {/* <MessageBox /> */}
      </div>
    </div>
  );
}

export default ChatBox;
