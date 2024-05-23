import { Button, Input} from "@mantine/core";
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
  let { conversation, updateActiveConver } = useContext(
    ConversationContext
  ) as activeConversatonType;
  let { user } = useContext(AppContext) as UserContextType;

  return (
    <div className="bottom-0 left-0 right-0 p-2 sticky">
      <Input
        placeholder="message"
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        w={"80%"}
      />
      <Button
        onClick={() =>
          handleSubmit({message, user, conversation, updateActiveConver})
        }
      >
        Send
      </Button>
    </div>
  );
};

interface IProps {
  message: string;
  user: IUser;
  conversation: ConversationProps | null;
  updateActiveConver: (c: ConversationProps) => void;
}



const handleSubmit = ({message, user, conversation, updateActiveConver}: IProps) => {
  if (message != "") {
    let new_message: Message = {
      sender_id: {
        id: {
          id: `${user.email}`,
        },
      },
      msg: message,
      id: {
        id: {
          id: `${Math.random()}`,
        },
      },
    };
    conversation?.messages.push(new_message);
    if (conversation) {
      updateActiveConver(conversation);
      alert("Sent");
      console.log(conversation);
    }
  }
};
export default MessageBox;
