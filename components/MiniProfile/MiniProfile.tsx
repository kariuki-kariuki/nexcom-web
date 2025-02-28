import { useContext } from 'react';

import { Avatar } from '@mantine/core';
import classes from './MiniProfile.module.css';
import useGlobalStore from '@/lib/store/globalStore';
export interface MiniProfileProps {
  image: string;
  name: string;
  height: string;
  status: string;
}
const MiniProfile = () => {
  const activeConversation = useGlobalStore((state) => state.activeConversation) ;

  const sender = activeConversation?.users[0];
  return (
    <div className="flex justify-between items-center">
      <Avatar
        src={sender?.photo}
        // alt={`${sender?.name}'s profile`}
        className={`h-10 w-10 rounded-full`}
      />

      <div className="px-5">
        <p className={classes.text}>{sender?.firstName}</p>
        <p className="text-slate-400 hidden lg:block md:text-sm">
          "Hello World"
        </p>
      </div>
    </div>
  );
};

export default MiniProfile;
