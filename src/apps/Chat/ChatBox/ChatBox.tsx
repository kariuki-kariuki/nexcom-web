import Message from "../components/Message";
import { useContext } from "react";
import MessageBox from "../components/MessageBox";
import {
  ConversationContext,
  activeConversatonType,
} from "../../../context/activeConversation";
import Bar from "./Bar";

function ChatBox() {
  const { activeConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  const messages = activeConversation?.messages?.map((message) => (
    <Message message={message} key={message?.msg} />
  ));
 
  return (
    <div className={`w-full relative h-full`}>
      <Bar/>
      {messages}
      <MessageBox />
    </div>
  );
}

export default ChatBox;
