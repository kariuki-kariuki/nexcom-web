import "./style.css";
import { Message, UserProps } from "../../../@types/chat";

interface Props {
  message: Message;
  sender: UserProps | null;
}

// Sent and received message card
const MessageCard = ({ message, sender }: Props) => {
  const status = message.sender_id.id.String === sender?.id.id.String;
  
  console.log(`${message.sender_id.id.String}, status:${status}, ${sender?.id.id.String}`);
  console.log("Sender Id", sender?.id)
  return (
    <div className={`${status ? "float-right " : "float-left "} w-10/12 sm:w-2/3 my-5 px-3`} >
      <div className={`${status ?  'bg-blue-500 text-white': 'bg-slate-800 text-white'} p-5 rounded-xl`} >
        <p className="font-serif">{message?.msg}</p>
      </div>
      <div className="px-5 float-right">
        <p className="text-sm text-slate-300">"2hrs ago"</p>
      </div>
    </div>
  );
};

export default MessageCard;
