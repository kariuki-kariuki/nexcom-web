import Message from "../components/Message";
import { UserProps } from "../../../@types/chat";
import { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";
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
  const { user } = useContext(AppContext) as UserContextType;
  let sender: UserProps | null = null;
  if (activeConversation && activeConversation?.user_1?.email == user.email) {
    sender = activeConversation?.user_2;
  } else if (activeConversation) {
    sender = activeConversation?.user_1;
  }
  return (
    <div className={`w-full relative h-full`}>
      <Bar/>
      {messages}
      <MessageBox />
    </div>
  );
}

export default ChatBox;
