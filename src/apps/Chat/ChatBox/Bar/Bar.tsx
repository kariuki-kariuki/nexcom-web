import Miscelenious from '../../components/Miscelenious';
import { IconArrowBadgeLeftFilled } from '@tabler/icons-react';
import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { CloseProps } from '../ChatArea/ChatArea';
import classes from './Bar.module.css';
import { useContext } from 'react';
import {
  activeConversatonType,
  ConversationContext,
} from '../../../../context/activeConversation';
import Dashboard from '../../../Dashboard/Dashboard';
import { useDisclosure } from '@mantine/hooks';

// Top Bar on the Chatbox Area
const Bar = ({ closes }: CloseProps) => {
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Group
        p={{ base: 'sm', sm: 'lg' }}
        h={{ base: 'fit-content', md: '80' }}
        justify="space-between"
        align="center"
        className={classes.bar}
      >
        <Group bg={'none'}>
          <Paper variant="outline" hiddenFrom="sm" bd={'none'}>
            <IconArrowBadgeLeftFilled
              size={40}
              onClick={() => {
                closes();
                setActiveConversation(null);
              }}
              color="teal"
            />
          </Paper>
          {activeConversation?.users ? (
            <Group onClick={open}>
              <Avatar src={activeConversation?.users[0].photo} />
              <Stack gap={0}>
                <Text>{activeConversation?.users[0].firstName}</Text>
                <Text fz={'xs'} c={'dimmed'}>
                  {activeConversation.users[0].status}
                </Text>
              </Stack>
            </Group>
          ) : (
            <Group>
              <Avatar src={activeConversation?.users[0].photo} />
              <div className="px-5">
                <Text>{activeConversation?.users[0].firstName}</Text>
                <p className="hidden lg:block md:text-sm">"Hello World"</p>
              </div>
            </Group>
          )}
        </Group>
        <Paper visibleFrom="sm" bg={'none'}>
          <Miscelenious />
        </Paper>
      </Group>
      {activeConversation ? (
        <Dashboard
          opened={opened}
          close={close}
          actUser={activeConversation?.users[0]}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Bar;
