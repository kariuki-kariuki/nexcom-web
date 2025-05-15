import Miscelenious from '../../components/Miscelenious/Miscelenious';
import { IconArrowBadgeLeftFilled } from '@tabler/icons-react';
import { Avatar, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import classes from './Bar.module.css';
import { useEffect, useState } from 'react';
import Dashboard from '../Profile/ProfileDashboard';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ConversationProps } from '@/lib/@types/app';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useRouter } from 'next/navigation';
import { useSocketContext } from '@/lib/hooks/useSocket';
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
  const [onlineStatus, setOnlineStatus] = useState('offline')
  const user = activeConversation?.users[0];
  const [opened, { toggle }] = useDisclosure(false);
  const { newConversation } = useGlobalStore((state) => state);
  const router = useRouter();
  const socket = useSocketContext();
  console.log("Render")
  useEffect(() => {
    socket.emit('online-status', { userId: user?.id }, (res: { status: string }) => {
      setOnlineStatus(res.status);
    })
  }, [])

  useEffect(() => {
    socket.on("online-status", (res: {userId: string, status: string}) => {
      if(res.userId === user?.id){
        setOnlineStatus(res.status);
      }
    })

    return() => {
      socket.off('online-status')
    }
  }, [socket, user, onlineStatus])
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
              open={toggle}
              status={user.status}
              name={user.fullName}
              avatar={user?.avatar?.signedUrl}
              onlineStatus={onlineStatus}
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
          toggle={toggle}
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
  onlineStatus?: string;
}

function Details({
  open,
  avatar,
  status = 'Start A new Chat',
  name,
  onlineStatus
}: IDetails) {

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Group onClick={open} wrap='nowrap'>
      <Avatar src={avatar} size={mobile ? 'md' : "lg"} name={name} />
      <Stack gap={0} >
        <Text fz={mobile ? 'xs' : 'am'}>{name}</Text>
        <Text fz={'xs'} c={onlineStatus === "online" ? "green" : "dimmed"} flex={1} lineClamp={1} w={{ base: '100%', sm: '80%' }}>
          {onlineStatus}
        </Text>
      </Stack>
    </Group>
  );
}

export default Bar;
