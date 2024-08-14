import classes from './style.module.css';
import { Message } from '../../../@types/chat';
import { Card } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';

interface Props {
  message: Message;
}

// Sent and received message card
const MessageCard = ({ message }: Props) => {
  const { user } = useContext(AppContext) as UserContextType;
  const status = message.user.id === user.id;
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
