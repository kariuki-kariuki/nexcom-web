import { useContext } from 'react';

import {
  ConversationContext,
  activeConversatonType
} from '@/lib/context/activeConversation';
import { Avatar } from '@mantine/core';
import classes from './MiniProfile.module.css';
export interface MiniProfileProps {
  image: string;
  name: string;
  height: string;
  status: string;
}
const MiniProfile = () => {
  const { activeConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;

  const sender = activeConversation?.users[0];
  return (
    <div className="flex justify-between items-center">
      <Avatar
        src={sender?.avatar?.signedUrl}
        // alt={`${sender?.name}'s profile`}
        className={`h-10 w-10 rounded-full`}
      />

      <div className="px-5">
        <p className={classes.text}>{sender?.fullName}</p>
        <p className="text-slate-400 hidden lg:block md:text-sm">
          "Hello World"
        </p>
      </div>
    </div>
  );
};

export default MiniProfile;
