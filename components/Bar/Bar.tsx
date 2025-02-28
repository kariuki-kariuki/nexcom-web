import Miscelenious from '../../components/Miscelenious/Miscelenious';
import { IconArrowBadgeLeftFilled } from '@tabler/icons-react';
import { Avatar, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import classes from './Bar.module.css';
import Dashboard from '../Profile/ProfileDashboard';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ConversationProps } from '@/lib/@types/app';
import useGlobalStore from '@/lib/store/globalStore';
interface CloseProps {
  closes: () => void;
  activeConvo?: ConversationProps | null;
}
// Top Bar on the Chatbox Area
const Bar = ({ closes }: CloseProps) => {
  const activeConversation = useGlobalStore((state) => state.activeConversation);
  const newConversation = useGlobalStore((state) => state.newConversation);
  const setActiveConversation = useGlobalStore((state) => state.setActiveConversation)

  const user = activeConversation?.users[0];
  const [opened, { open, close }] = useDisclosure(false);
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
                closes();
                setActiveConversation(null);
              }}
              color="teal"
            />
          </Paper>
          {user ? (
            <Details
              open={open}
              name={user.firstName}
              status={user.status}
              avatar={user.photo}
            />
          ) : (
            <>
              {newConversation ? (
                <Details
                  name={newConversation?.firstName}
                  status={`Start chatting with ${newConversation.firstName}`}
                />
              ) : (
                <Details />
              )}
            </>
          )}
        </Group>
        <Paper bg={'none'}>
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
      <Avatar src={avatar} size={mobile ? 'md' : "lg"} />
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
