import { ConversationProps } from "../../../data/data";
import MiniProfile from "../components/MiniProfile";

interface Props {
  conversation: ConversationProps
  set_active: (arg: ConversationProps) => void;
  active_id: string
}
const ContactCard = ({ conversation, set_active, active_id }: Props) => {
  const active: boolean = active_id == conversation.id
  console.log(active)
  return (
    <div className={`max-w-full p-5 ${ active ? "bg-blue-300":"bg-white" } border-b-2 border-gray-300 text-sm  min-h-32`}
      onClick={() => set_active(conversation)}
    >
      <div className="flex justify-between">
        <MiniProfile image={conversation.sender.avatar} name={conversation.sender.first_name} height="h-5"/>
        <p className="text-slate-500">4h ago</p>
      </div>
      <div className="font-serif py-5">
        <p>{conversation.sender.status}</p>
      </div>
    </div>
  );
};

export default ContactCard;
