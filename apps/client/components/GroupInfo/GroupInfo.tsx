import { Avatar, Button, Card, CardSection, Drawer, FileInput, GridCol, Group, Indicator, InputWrapper, Menu, MenuDropdown, MenuItem, MenuLabel, MenuTarget, Paper, ScrollArea, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import classes from './GroupInfo.module.css';
import { ConversationProps, GlobalUser } from '@/lib/@types/app';

import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useDisclosure } from '@mantine/hooks';
import { IconMessage2, IconX } from '@tabler/icons-react';
import Dashboard from '../Profile/ProfileDashboard';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { useSocketContext } from '../../lib/hooks/useSocket';
import { notifications } from '@mantine/notifications';
import GroupUserCard from './GroupUserCard/GroupUserCard';
import GroupMembers from './GroupMembers/GroupMembers';


interface IProps {
  group: ConversationProps

}

interface IGDrawar {
  opened: boolean;
  toggle: () => void;
  group: ConversationProps

}

export const GroupInfoDrawer = ({ opened, toggle, group }: IGDrawar) => {

  return (
    <Drawer opened={opened} onClose={toggle}
      classNames={{ header: classes.header, content: classes.content }}
      title={group.name}
      position='right'
      withOverlay={false}
    >
      <GroupInfo group={group} />
    </Drawer>
  )
}

export const GroupInfoPaper = ({ toggle, group }: IGDrawar) => {

  return (
    <Paper bg="none" visibleFrom='lg' className={classes.info} radius={0} w={{ md: "50%", lg: 'auto' }}>
      <Paper className={classes.header} radius={0} p="md" h={{ base: 80, xl: 100 }}>
        <Group justify='space-between' align='center' h="100%">
          <Text c="teal.6">{group.name?.toUpperCase()}</Text>
          <IconX size={23} color='red' onClick={toggle} />
        </Group>
      </Paper>
      <Paper bg="none" px='md' className={classes.content}>
        <GroupInfo group={group} />
      </Paper>
    </Paper>
  )
}

function GroupInfo({ group }: IProps) {
  const user = useGlobalStore((state) => state.user);
  const [profile, setProfile] = useState<FileWithPath | null>(null)

  const IAMAdmin = group.admins?.some((member) => member.id === user?.id);
  const date = new Date(group.created_at);
  const socket = useSocketContext();

  const handleUpdateProfile = () => {
    if (!profile) {
      notifications.show({
        message: 'Profile Cannot Be Empty',
        color: 'red.7',
        title: 'Error',
      })
      return;
    }
    notifications.show({
      message: 'Called Notification',
      title: "Checler"
    });

    try {
      const messageBody = { groupId: group.id, file: { mimetype: profile.type, buffer: profile } }

      socket.emit('group-profile-update', messageBody, () => {
        setProfile(null);
      })
    } catch (e) {
      console.log('Failed to upload');
    }

  }
  return (

    <Card bg="none" className={classes.profile} radius={0} pb={'lg'}>
      <CardSection py="xl" mb="xs" classNames={{ section: classes.sections }}>
        <Stack justify='center' align='center' gap="sm" >
          {!IAMAdmin &&
            <Avatar
              src={group.profile?.signedUrl}
              size="xl"
              name={group.name}
              alt={`${group.name} profile`}
            />
          }
          {IAMAdmin && <Menu>
            <MenuTarget>
              <Avatar
                src={profile ? URL.createObjectURL(profile) : group.profile?.signedUrl}
                size="xl"
                name={group.name}
                alt={`${group.name} profile`}
              />
            </MenuTarget>
            <MenuDropdown w={400}>
              <InputWrapper label="Select Image">
                <FileInput value={profile} onChange={setProfile} />
              </InputWrapper>
              <Button color='coco.4' onClick={handleUpdateProfile}>Update Profile</Button>
            </MenuDropdown>
          </Menu>}
          <Text w="fit-content">Created by {group.creator?.fullName}</Text>
        </Stack>
      </CardSection>

      <CardSection p="md" mb='xs' className={classes.sections}>
        <Text size='sm' w="fit-content">{date.toDateString()}</Text>
        <Text w="fit-content">{group.users.length} Members</Text>
      </CardSection>
      <CardSection p="md" mb='xs' className={classes.sections}>
        <GroupMembers group={group} />
      </CardSection>
      <CardSection p="md" className={classes.sections}>
      </CardSection>
      <CardSection className={classes.sections}>
      </CardSection>
    </Card>
  );
}



export default GroupInfo;
