import { useContext } from "react";
import { ConversationProps } from "../../../@types/chat";
import Conversation from "./Conversation";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";

interface Props {
  conversations: ConversationProps[];
  set_active: (arg: ConversationProps) => void;
  active_id: string;
}

const Navigation = ({ conversations, set_active, active_id }: Props) => {
  const conversation = conversations?.map((convo: ConversationProps) => (
    <Conversation
      conversation={convo}
      key={convo.id.id.id}
      set_active={set_active}
      active_id={active_id}
    />
  ));
  // const token = localStorage.getItem("token")
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <div className={``}>
      <header className="font-mono p-5 sm:min-h-24 fixed top-0 left-0 right-0 sm:relative bg-slate-700 mb-1">
        <p>{user.name}</p>
        <p className="text-white">Chats</p>
      </header>
      <div className="mt-20 sm:mt-0">{conversation}</div>
    </div>
  );
};

export default Navigation;
