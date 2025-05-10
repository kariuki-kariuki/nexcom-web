import Miscelenious from '../../components/Miscelenious/Miscelenious';
import { IconArrowBadgeLeftFilled } from '@tabler/icons-react';
import { Avatar, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import classes from './Bar.module.css';
import { useContext } from 'react';
import Dashboard from '../Profile/ProfileDashboard';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  useNewConverSationContext
} from '@/lib/context/newConversation';
import { ConversationProps } from '@/lib/@types/app';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useRouter } from 'next/navigation';
interface CloseProps {
  activeConvo?: ConversationProps | null;
}
// Top Bar on the Chatbox Area
interface BarProps {
  activeConvoId?: string
}
const Bar = ({ activeConvoId }: BarProps) => {
  const conversations = useGlobalStore(state => state.conversations);
  const activeConversation = conversations.find((conv) => conv.id === activeConvoId)
  const setActiveConversation = useGlobalStore(state => state.setActiveConversation)
  const user = activeConversation?.users[0];
  const [opened, { open, close }] = useDisclosure(false);
  const { newConversation } = useGlobalStore((state) => state);
  const router = useRouter();
  return (
    <>
      <Group
        px={'lg'}
        h={'100'}
        justify="space-between"
        align="center"
        className={classes.bar}
        wrap='nowrap'
      >
        <Group bg={'none'} wrap='nowrap'>
          <Paper variant="outline" hiddenFrom="sm" bd={'none'}>
            <IconArrowBadgeLeftFilled
              size={40}
              onClick={() => {
                router.push('/chat');
                setActiveConversation(null);
              }}
              color="teal"
            />
          </Paper>
          {user ? (
            <Details
              open={open}
              status={user.status}
              name={user.fullName}
              avatar={user?.avatar?.signedUrl}
            />
          ) : (
            <>
              {newConversation ? (
                <Details
                  name={newConversation?.fullName}
                  status={`Start chatting with ${newConversation.fullName}`}
                  avatar={newConversation?.avatar?.signedUrl}
                />
              ) : (
                <Details />
              )}
            </>
          )}
        </Group>
        <Paper visibleFrom="sm" bg={'none'}>
          <Miscelenious convoId={activeConvoId} />
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

interface IDetails {
  open?: () => void;
  avatar?: string;
  status?: string;
  name?: string;
}

function Details({
  open,
  avatar,
  status = 'Start A new Chat',
  name
}: IDetails) {

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Group onClick={open} wrap='nowrap'>
      <Avatar src={avatar} size={mobile ? 'md' : "lg"} name={name} />
      <Stack gap={0} >
        <Text fz={mobile ? 'xs' : 'am'}>{name}</Text>
        <Text fz={'xs'} c={'dimmed'} flex={1} lineClamp={1} w={{ base: '100%', sm: '80%' }}>
          {status}
        </Text>
      </Stack>
    </Group>
  );
}

export default Bar;
