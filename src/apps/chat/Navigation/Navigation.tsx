import Conversation from "./Conversation";
import { ConversationProps } from "../../../data/data";

interface Props{
  conversations: ConversationProps[],
  set_active: (arg: ConversationProps) => void,
  active_id: string,
  activeChat: string,
  setActiveChat: (arg: string) => void,
}
const Navigation = ({conversations, set_active, active_id, activeChat}: Props ) => {
  const conversation = conversations?.map((convo: ConversationProps) => (
    <Conversation
      conversation= {convo}
      key={convo.id}
      set_active={set_active}
      active_id = {active_id}

    />
  ));
    const active = activeChat == "main";
  return (
    <div className={`sm:w-3/5 ${active ? "block ": "hidden" } bg-slate-900 h-full overflow-y-scroll sm:block relative`}>
      <header className="font-mono p-5 sm:min-h-24 fixed top-0 left-0 right-0 sm:relative bg-slate-900">
        <p className="text-white">Chats</p>
      </header>
      {/* <hr /> */}
      <div className="mt-20 sm:mt-0">{conversation}</div>
    </div>
  );
};

export default Navigation;
