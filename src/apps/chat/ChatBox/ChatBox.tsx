import { ConversationProps } from "../../../data/data";
import Bar from "./Bar";
import Message from "../components/Message";

interface Props {
  conversation: ConversationProps;
  activeChat: string
}

function ChatBox({ conversation, activeChat }: Props) {
  const active_chat = activeChat == "main";
  const messages = conversation?.messages.map((message) => <Message message ={ message} key={message.id}/>)
  return (
    <div className={`w-full ${ active_chat ? "hidden": "block" } md:w-4/5 bg-slate-900 overflow-y-auto relative`}>
      <Bar
        name={conversation?.sender.first_name}
        image={conversation?.sender.avatar}
        status={conversation?.sender.status}
      />
      {messages}
    </div>
  );
}

export default ChatBox;
