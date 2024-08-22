import Miscelenious from '../../components/Miscelenious';
import { IconArrowLeftCircle } from '@tabler/icons-react';

import { Avatar, Button, Group, Paper, Text } from '@mantine/core';
import { CloseProps } from '../ChatArea/ChatArea';
import classes from './Bar.module.css';
import { useContext } from 'react';
import {
  activeConversatonType,
  ConversationContext,
} from '../../../../context/activeConversation';

// Top Bar on the Chatbox Area
const Bar = ({ close }: CloseProps) => {
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  return (
    // <div className="bg-slate-800 z-10 sm:min-h-15 text-white flex justify-between  items-center p-3 sm:p-5 fixed top-0 right-0 left-0 md:sticky  md:top-0 border-b-2 border-gray-700">
    <Group
      p={'lg'}
      h={'80'}
      justify="space-between"
      align="center"
      className={classes.bar}
    >
      <Group bg={'none'}>
        <Button variant="outline" hiddenFrom="sm" bd={'none'}>
          <IconArrowLeftCircle
            size={20}
            onClick={() => {
              close();
              setActiveConversation(null);
            }}
          />
        </Button>
        <Group>
          <Avatar src={activeConversation?.users[0].photo} />
          <div className="px-5">
            <Text>{activeConversation?.users[0].firstName}</Text>
            <p className="hidden lg:block md:text-sm">"Hello World"</p>
          </div>
        </Group>
      </Group>
      <Paper visibleFrom="sm" bg={'none'}>
        <Miscelenious />
      </Paper>
    </Group>
  );
};

export default Bar;
