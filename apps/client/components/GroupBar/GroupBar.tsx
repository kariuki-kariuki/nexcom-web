import { IconArrowBadgeLeftFilled, IconUsersGroup, IconX } from '@tabler/icons-react';
import { ActionIcon, Avatar, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import classes from './GroupBar.module.css';
import { ConversationProps } from '@/lib/@types/app';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';
// Top Bar on the Chatbox Area
interface BarProps {
  group: ConversationProps
}
const GroupBar = ({ group }: BarProps) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
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
        <Group flex={1} wrap='nowrap'>
          <Paper variant="outline" hiddenFrom="sm" bd={'none'}>
            <IconArrowBadgeLeftFilled
              size={40}
              onClick={() => {
                router.push('/chat');
              }}
              color="teal"
            />
          </Paper>
          <Group flex={1}>
            <Avatar src={group.profile?.signedUrl} name={group.name} size={mobile ? 'md' : "lg"} />
            <Stack gap={0} flex={1} >
              <Group c="orange.6">
                <Text fz={mobile ? 'xs' : 'lg'}>{group.name?.toUpperCase()}</Text>
                <IconUsersGroup size="20" />
              </Group>
              <Text fz={'xs'} c={'dimmed'} flex={1} lineClamp={1} w={{ base: '100%', sm: '80%' }}>
                Created by {group.creator?.fullName}
              </Text>
            </Stack>
          </Group>
        </Group>
        <ActionIcon variant='light' color="red.9" onClick={() => router.push('/chat')} visibleFrom='sm'>
          <IconX />
        </ActionIcon>
      </Group>
    </>
  );
};





export default GroupBar;
