import { Button, Input } from "@mantine/core";
import { useContext, useState } from "react";
import {
  ConversationContext,
  activeConversatonType,
} from "../../../context/activeConversation";
import { ConversationProps, Message } from "../../../@types/chat";
import { AppContext } from "../../../context/appContext";
import { IUser, UserContextType } from "../../../@types/app";

const MessageBox = () => {
  const [message, setMessage] = useState("");
  let { activeConversation, setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  let { user } = useContext(AppContext) as UserContextType;

  return (
    <div className="bottom-0 left-0 right-0 p-2 sticky bg-blue-200 ">
      <Input
        placeholder="message"
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        w={"80%"}
      />
      <Button
        onClick={() => {
          const convo: ConversationProps | null = handleSubmit({ message, user, activeConversation });
          if(convo) {
            setActiveConversation(convo);

          }
        }}
      >
        Send
      </Button>
    </div>
  );
};

interface IProps {
  message: string;
  user: IUser;
  activeConversation: ConversationProps | null;
  //   setActiveConversation: (c: ConversationProps) => void;
}

const handleSubmit = ({ message, user, activeConversation }: IProps) => {
  if (message != "") {
    let new_message: Message = {
      sender_id: {
        id: {
          String: `${user.email}`,
        },
      },
      msg: message,
      id: {
        id: {
          String: `${Math.random()}`,
        },
      },
    };
    activeConversation?.messages?.push(new_message);
    if (activeConversation) {
      return activeConversation;
    }
  }
  return activeConversation;
};
export default MessageBox;
