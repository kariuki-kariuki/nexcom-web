import { Card, Menu, MenuTarget, Stack, Indicator, Avatar, MenuDropdown, MenuLabel, MenuItem, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GlobalUser, ConversationProps } from "../../../lib/@types/app";
import { useGlobalStore } from "../../../lib/context/global-store.provider";
import Dashboard from "../../Profile/ProfileDashboard";
import classes from './GroupUserCard.module.css'
import { IconBellOff, IconLogout, IconShieldCancel, IconShieldPlus, IconUserScreen } from "@tabler/icons-react";
import { useState } from "react";
import { useSocketContext } from "../../../lib/hooks/useSocket";
import { notifications } from "@mantine/notifications";

interface IUserCardProps { user: GlobalUser, isAdmin: boolean | undefined, group: ConversationProps }

const GroupUserCard = ({ user, isAdmin, group }: IUserCardProps) => {
  const [opened, { toggle }] = useDisclosure(false)
  const loggedInUser = useGlobalStore((state) => state.user);
  const IAMAdmin = group.admins?.some((member) => member.id === loggedInUser?.id);
  const IAMmoderator = group.creator?.id === user.id;
  const [isLoading, setIsLoading] = useState(false);
  const socket = useSocketContext();

  const handleAddAdmin = () => {
    const isAdmin = group.admins?.some((admin) => admin.id === user.id);
    if (isAdmin || isLoading) return;

    const messageBody = {
      userId: user.id,
      groupId: group.id
    }
    setIsLoading(true);
    socket.emit('add-group-admin', messageBody, () => {
      notifications.show({
        message: 'Added Admin',
        color: 'green',
        title: 'Success'
      })
    })
    setIsLoading(false);
  }
  return (
    <Card data-active={isAdmin || undefined} bg="none">
      <Menu>
        <MenuTarget>
          <Stack justify='center' gap="sm">
            {isAdmin ?
              <Indicator label="🛡️" size="16" color="teal.6">
                <Avatar size="lg" src={user.avatar?.signedUrl} name={user.fullName} color={isAdmin ? 'teal.5' : ''} className={classes.avatar} data-active={isAdmin || undefined} />
              </Indicator>
              :
              <Avatar size="lg" src={user.avatar?.signedUrl} name={user.fullName} color={isAdmin ? 'teal.5' : ''} className={classes.avatar} data-active={isAdmin || undefined} />
            }
            <Text>{user.fullName.split(' ')[0]}</Text>
          </Stack>
        </MenuTarget>
        <MenuDropdown className={classes.menu_drop}>
          <MenuLabel>Action</MenuLabel>
          <MenuItem leftSection={<IconUserScreen size={20} />} onClick={toggle}>View Profile</MenuItem>
          {IAMAdmin && !isAdmin && <MenuItem onClick={handleAddAdmin} leftSection={<IconShieldPlus size={20} />}>Make Admin</MenuItem>}
          <MenuItem></MenuItem>
          <MenuLabel c="red.9">Danger Zone</MenuLabel>
          {IAMAdmin && isAdmin && !IAMmoderator && <MenuItem leftSection={<IconShieldCancel color="red" />}>Remove Admin</MenuItem>}
          {IAMAdmin && !IAMmoderator && <MenuItem leftSection={<IconBellOff color="orange" size={20} />}>Mute From Messaging</MenuItem>}
          {IAMAdmin && !IAMmoderator && <MenuItem leftSection={<IconLogout color="red" size={20} />}>Remove From Group</MenuItem>}
        </MenuDropdown>
      </Menu>
      <Dashboard opened={opened} toggle={toggle} actUser={user} />
    </Card>
  )
}

export default GroupUserCard