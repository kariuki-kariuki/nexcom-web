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
    <div className="w-2/5 bg-white h-full overflow-y-scroll">
      <header className="font-mono p-5">
        <p>Chats</p>
      </header>
      <hr />
      <div className="chats">{conversation}</div>
    </div>
  );
};

export default Navigation;
