import { ConversationProps } from "../../../data/data";
import Bar from "./Bar";
import Message from "../components/Message";

interface Props {
  conversation: ConversationProps;
}

function ChatBox({ conversation }: Props) {
  const messages = conversation?.messages.map((message) => <Message message ={ message} key={message.id}/>)
  return (
    <div className="w-4/5 bg-slate-100 overflow-y-auto relative">
      <Bar
        name={conversation?.sender.first_name}
        image={conversation?.sender.avatar}
      />
      {messages}
    </div>
  );
}

export default ChatBox;
