import { useContext } from "react";

import { AppContext } from "../../../context/appContext";
import { UserContextType } from "../../../@types/app";
import {
  ConversationContext,
  activeConversatonType,
} from "../../../context/activeConversation";
import { UserProps } from "../../../@types/chat";

export interface MiniProfileProps {
  image: string;
  name: string;
  height: string;
  status: string;
}
const MiniProfile = () => {
  const { user } = useContext(AppContext) as UserContextType;
  const { activeConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;

  let sender: UserProps | null;
  if (activeConversation?.user_1?.email === user.email) {
    sender = activeConversation?.user_2;
  } else if (activeConversation) {
    sender = activeConversation?.user_1;
  } else {
    sender = null;
  }
  return (
    <div className="flex justify-between items-center">
      <img
        src={sender?.avatar}
        // alt={`${sender?.name}'s profile`}
        className={`h-10 w-10 rounded-full`}
      />

      <div className="px-5">
        <p className="  text-white">{sender?.name}</p>
        <p className="text-slate-400 hidden lg:block md:text-sm">
          "Hello World"
        </p>
      </div>
    </div>
  );
};

export default MiniProfile;
