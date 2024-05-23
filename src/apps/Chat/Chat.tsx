import { useContext, useEffect, useState } from "react";
import ChatBox from "./ChatBox/ChatBox";
import Navigation from "./Navigation/Navigation";
import { ConversationProps } from "../../@types/chat";
import HeroPage from "../Shop/Products/HeroPage";
import { ScreenContext, screenContextType } from "../../context/screenContext";
import { ConversationContext, activeConversatonType } from "../../context/activeConversation";

function Chat() {
  const token = localStorage.getItem("token");
  const [conversations, setConversation] = useState<ConversationProps[]>([]);
  const {activeScreen } = useContext(ScreenContext) as screenContextType;
  const {conversation} = useContext(ConversationContext) as activeConversatonType;
  useEffect(() => {
    fetch("http://192.168.100.4:8000/conversation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: any) => {
      if (res.ok) {
        res.json().then((res: ConversationProps[]) => {
          setConversation(res);
        });
      }
    });
  }, [setConversation]);
  return (
    <div className={` w-full sm:w-full h-full   min-h-full  sm:flex`}>
      <div className={`${activeScreen == "nav" ? "block" : "hidden"} w-full h-full md:w-2/5 lg:w-3/12  bg-slate-900 overflow-y-scroll sm:border-r-2 border-gray-500 sm:block relative`}>
        <Navigation
          conversations={conversations}
        />
      </div>
      <div
        className={`${
          activeScreen === "chat" ? "block" : "hidden"
        } md:w-3/5 lg:w-2/5  bg-slate-900 overflow-y-auto sm:block relative h-full`}
      >
        <ChatBox  />
      </div>
      <div
        className={`${
          activeScreen == "shop" ? "block w-full" : "hidden"
        } sm:block w-2/5 h-full overflow-y-auto border-l-2  border-gray-500  `}
      >
        <HeroPage
          root={StyleClass.root}
          headerText={`${conversation?.user_1.name}'s Shop`}
        />
      </div>
    </div>
  );
}
const StyleClass = {
  root: "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2",
};
export default Chat;
