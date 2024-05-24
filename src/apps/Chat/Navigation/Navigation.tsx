import { useContext } from "react";
import { ConversationProps } from "../../../@types/chat";
import Conversation from "./Conversation";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";

interface Props {
  conversations: ConversationProps[];
}

const Navigation = ({ conversations }: Props) => {
  const conversation = conversations?.map((convo: ConversationProps, index) => (
    <Conversation
      conversation={convo}
      key={index}
    />
  ));
  // const token = localStorage.getItem("token")
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <div className={``}>
      <header className="font-mono p-5 sm:min-h-24 fixed top-0 left-0 right-0 sm:relative bg-slate-800 border-b-2 border-gray-700">
        <p>{user.name}</p>
        <p className="text-white" onClick={() => console.log(user?.name)}>Chats</p>
      </header>
      <div className="mt-20 sm:mt-0">{conversation}</div>
    </div>
  );
};

export default Navigation;
