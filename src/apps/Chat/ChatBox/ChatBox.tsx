import Bar from "./Bar";
import Message from "../components/Message";
import { ConversationProps } from "../../../@types/chat";

interface Props {
  conversation: ConversationProps;
  activeChat: string
}

function ChatBox({ conversation, activeChat }: Props) {
  const active_chat = activeChat == "main";
  const messages = conversation?.messages.map((message) => <Message message ={ message} key={message?.msg}/>)
  return (
    <div className={`w-full ${ active_chat ? "hidden": "block" } md:w-3/5 lg:w-2/5  bg-slate-900 overflow-y-auto sm:block relative`}>
      <Bar
        name={conversation?.user_1.name}
        image={conversation?.user_1.avatar}
        status={"Hello World"}
      />
      {messages}
    </div>
  );
}

export default ChatBox;
