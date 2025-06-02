import { IconArrowBadgeLeftFilled, IconX } from '@tabler/icons-react';
import { ActionIcon, Avatar, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import classes from './Bar.module.css';
import { useEffect, useState } from 'react';
import Dashboard from '../Profile/ProfileDashboard';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { GlobalUser } from '@/lib/@types/app';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useRouter } from 'next/navigation';
import { useSocketContext } from '@/lib/hooks/useSocket';
// Top Bar on the Chatbox Area
interface BarProps {
  user: GlobalUser
}
const Bar = ({ user }: BarProps) => {
  const setActiveConversation = useGlobalStore(state => state.setActiveConversation)
  const [onlineStatus, setOnlineStatus] = useState('offline')
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const socket = useSocketContext();

  useEffect(() => {
    socket.emit("online-status", { userId: user.id }, (res: { userId: string, status: string }) => {
      setOnlineStatus(res.status);
    })

    socket.on("online-status", (res: { userId: string, status: string }) => {
      if (res.userId === user?.id) {
        setOnlineStatus(res.status);
      }
    })

    return () => {
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
          <Details
            toggle={toggle}
            status={user.status}
            name={user.fullName}
            avatar={user?.avatar?.signedUrl}
            onlineStatus={onlineStatus}
          />
        </Group>
        <ActionIcon variant='light' color="red.9" onClick={() => router.push('/chat')} visibleFrom='sm'>
          <IconX />
        </ActionIcon>
        <Dashboard actUser={user} opened={opened} toggle={toggle} />
      </Group>
    </>
  );
};

interface IDetails {
  toggle: () => void;
  avatar?: string;
  status?: string;
  name?: string;
  onlineStatus?: string;
}

function Details({
  toggle,
  avatar,
  name,
  onlineStatus
}: IDetails) {

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Group onClick={() => toggle()} wrap='nowrap'>
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
