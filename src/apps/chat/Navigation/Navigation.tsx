import ContactCard from "./ContactCard";
import { ConversationProps } from "../../../data/data";

interface Props{
  conversations: ConversationProps[],
  set_active: (arg: ConversationProps) => void,
  active_id: string
}
const Navigation = ({conversations, set_active, active_id}: Props ) => {
  const conversation = conversations?.map((convo: ConversationProps) => (
    <ContactCard
      conversation= {convo}
      key={convo.id}
      set_active={set_active}
      active_id = {active_id}
    />
  ));

  return (
    <div className="w-3/5 hidden bg-slate-900 h-full overflow-y-scroll sm:block">
      <header className="font-mono p-5 min-h-24">
        <p className="text-white">Chats</p>
      </header>
      {/* <hr /> */}
      <div className="chats">{conversation}</div>
    </div>
  );
};

export default Navigation;
