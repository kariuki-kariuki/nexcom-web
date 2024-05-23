import { useContext } from "react";
import { ConversationProps, UserProps } from "../../../@types/chat";
import girl1 from "../../../assets/agirl1.jpg";
// import girl2 from "../../../assets/agirl2.jpg";
import {
  ScreenContext,
  screenContextType,
} from "../../../context/screenContext";
import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";
import {
  ConversationContext,
  activeConversatonType,
} from "../../../context/activeConversation";
interface Props {
  conversation: ConversationProps;
}
// Information on card for conversation
const Conversation = ({ conversation }: Props) => {
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  const active: boolean = false;
  const { user } = useContext(AppContext) as UserContextType;
  const { updateActiveConver } = useContext(
    ConversationContext
  ) as activeConversatonType;
  let sender: UserProps;
  if (conversation.user_1.email === user.email) {
    sender = conversation.user_2;
  } else {
    sender = conversation.user_1;
  }
  return (
    <div
      className={`max-w-full p-5 mb-2 ${
        active ? "bg-slate-800 border-b-2 shadow-md rounded-md" : "bg-slate-700"
      }  border-gray-300 text-sm  `}
      onClick={() => {
        updateActiveScreen("chat");
        updateActiveConver(conversation);
      }}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 lg:h-10 lg:w-10 rounded-full bg-black">
          <img
            src={girl1}
            alt={`${sender.name} profile`}
            className={`h-10 min-w-10 lg:h-10 lg:min-w-10 bg-black rounded-full`}
          />
        </div>

        <div className="font-serif text-2l px-5 w-full">
          <div className="font-mono">
            <p className="float-left text-slate-200">{sender.name}</p>
            <p className="text-slate-400 float-right">4h ago</p>
          </div>

          <p className="text-slate-400">{sender?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
