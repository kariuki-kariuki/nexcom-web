import { MessageProps } from "../../../data/data";
import "./style.css"
interface Props{
  message: MessageProps
}
const MessageCard = ({message}:Props) => {
  const if_sent = "float-right bg-blue-500 w-2/3 m-3 p-5 right";
  const if_received = "float-left bg-slate-300 w-2/3 m-2 p-5 left"
  return (
    <div className={message.state.status === 'sent' ? if_sent : if_received } >
      <p className="font-serif">
        {message?.message}
      </p>
      <p>{message.time}</p>
    </div>
  );
};

export default MessageCard;
