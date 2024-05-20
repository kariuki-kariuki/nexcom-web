import { useEffect, useState } from "react";
import ChatBox from "./ChatBox/ChatBox";
import Navigation from "./Navigation/Navigation";
// import chats, { ConversationProps } from "../../data/data";
import { ConversationProps } from "../../@types/chat";
import HeroPage from "../Shop/Products/HeroPage";
import { Container, Text } from "@mantine/core";

function Chat() {
  const token = localStorage.getItem("token");
  const [conversations, setConversation] = useState<ConversationProps[]>([]);
  const [activeChat, setActiveChat] = useState("main");
  const [active, setActive] = useState<ConversationProps>(conversations[0]);

  const [convos, setConvo] = useState<ConversationProps[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/conversation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: any) => {
      if (res.ok) {
        res.json().then((res: ConversationProps[]) => {
          console.log(res);
          setConversation(res);
          setActive(res[0]);
          // debugger
        });
      }
    });
  }, []);
  useEffect(() => {}, []);

  return (
    <div className="sm:w-full  min-h-full  sm:flex ">
      <Navigation
        conversations={conversations}
        set_active={setActive}
        active_id={active?.id.id.id}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />
      <ChatBox conversation={active} activeChat={activeChat} />
      <div className="w-1/2 h-full overflow-y-auto">
        <Container>
          <Text className="text-center">{active.user_1.name}'s  Shop</Text>
        </Container>
        <HeroPage root={StyleClass.root} />
      </div>
    </div>
  );
}
const StyleClass = {
  root: "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2"
}
export default Chat;
