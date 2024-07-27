import classes from './style.module.css';
import { Message, UserProps } from '../../../@types/chat';
import { Card } from '@mantine/core';

interface Props {
  message: Message;
  sender: UserProps | null;
}

// Sent and received message card
const MessageCard = ({ message, sender }: Props) => {
  const status = message.sender_id === sender?.id;

  console.log(`${message.sender_id}, status:${status}, ${sender?.id}`);
  console.log('Sender Id', sender?.id);
  return (
    <div
      className={`${status ? classes.float_right : classes.float_left} w-10/12 sm:w-2/3 my-1 px-3`}
    >
      <Card bg={status ? 'blue' : 'grey.9'}>
        <p className="font-serif">{message?.message}</p>
      </Card>
      <div className="px-5 float-right">
        <p className="text-sm text-slate-300">"2hrs ago"</p>
      </div>
    </div>
  );
};

export default MessageCard;
