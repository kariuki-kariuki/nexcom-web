import Bar from "./Bar";
import Message from "../components/Message";
import { ConversationProps, UserProps } from "../../../@types/chat";
import { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";

interface Props {
  conversation: ConversationProps;
}

function ChatBox({ conversation}: Props) {
  const messages = conversation?.messages.map((message) => <Message message ={ message} key={message?.msg}/>)
  const {user} = useContext(AppContext) as UserContextType;
  let sender: UserProps;
  if (conversation?.user_1.email == user.email){
    sender = conversation?.user_2;
  } else {
    sender = conversation?.user_1;
  }
  console.log("Loged in user is: ", user)
  return (
    <div className={`w-full`}>
      <Bar
        name={sender?.name}
        image={sender?.avatar}
        status={"Hello World"}
      />
      {messages}
    </div>
  );
}

export default ChatBox;
