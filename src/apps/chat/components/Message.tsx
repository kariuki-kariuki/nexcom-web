import { MessageProps } from "../../../data/data";
import "./style.css";
interface Props {
  message: MessageProps;
}

// Sent and received message card
const MessageCard = ({ message }: Props) => {
  const status = message.state.status === 'sent';
  return (
    <div className={`${status ? "float-right " : "float-left "} w-10/12 sm:w-2/3 my-5 px-3`}>
      <div className={`${status ?  'bg-blue-500 text-white': 'bg-slate-800 text-white'} p-5 rounded-xl`} >
        <p className="font-serif">{message?.message}</p>
      </div>
      <div className="px-5 float-right">
        <p className="text-sm text-slate-300">{message.time}</p>
      </div>
    </div>
  );
};

export default MessageCard;
