import "./style.css";
import { Message } from "../../../@types/chat";
import { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";

interface Props {
  message: Message;
}

// Sent and received message card
const MessageCard = ({ message }: Props) => {
  const {user} = useContext(AppContext) as UserContextType;
  const status = message.msg === user?.email;
  return (
    <div className={`${status ? "float-right " : "float-left "} w-10/12 sm:w-2/3 my-5 px-3`}>
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
