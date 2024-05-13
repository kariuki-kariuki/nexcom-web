import { ConversationProps } from "../../../data/data";

interface Props {
  conversation: ConversationProps;
  set_active: (arg: ConversationProps) => void;
  active_id: string;
}
/// Information on card for conversation 
const Conversation = ({ conversation, set_active, active_id }: Props) => {
  const active: boolean = active_id == conversation.id;
  return (
    <div
      className={`max-w-full p-5 mb-2 ${
        active ? "bg-slate-800 border-b-2 shadow-md rounded-md" : "bg-slate-700"
      }  border-gray-300 text-sm  `}
      onClick={() => set_active(conversation)}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 lg:h-20 lg:w-20 rounded-full bg-black">
          <img
            src={conversation?.sender.avatar}
            alt={`${conversation.sender.last_name} profile`}
            className={`h-10 min-w-10 lg:h-20 lg:min-w-20 bg-black rounded-full`}
          />
        </div>

        <div className="font-serif text-2l px-5 w-full">
          <div className="font-mono">
            <p className="float-left text-slate-200">{conversation.sender.first_name}</p>
            <p className="text-slate-400 float-right">4h ago</p>
          </div>

          <br />
          <p className="text-slate-400">{conversation.sender.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
