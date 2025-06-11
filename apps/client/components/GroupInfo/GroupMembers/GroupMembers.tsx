import { Avatar, Button, Card, Group, Input, InputWrapper, Paper, ScrollArea, SimpleGrid, Tabs, TabsList, TabsPanel, TabsTab, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import { ConversationProps, ConvsersationType, GlobalUser } from '../../../lib/@types/app'
import GroupUserCard from '../GroupUserCard/GroupUserCard'
import { useGlobalStore } from '../../../lib/context/global-store.provider'
import { IconUserPlus, IconUsersGroup } from '@tabler/icons-react'
import classes from './GroupMembers.module.css'
import { useSocketContext } from '../../../lib/hooks/useSocket'
import { notifications } from '@mantine/notifications'

interface IUserCard {
  user: GlobalUser,
  handleUpdate: () => void;
  selectedUsers: GlobalUser[];
  isInGroup: boolean;
}
const UserCard = ({ user, handleUpdate, selectedUsers, isInGroup }: IUserCard) => {
  const loggedInUser = useGlobalStore(state => state.user);
  const isSelected = selectedUsers.find((usr) => usr.id === user.id)
  return (<Card
    radius={'xs'}
    className={classes.card}
    shadow="md"
    mb={'md'}
    onClick={handleUpdate}
    data-active={isSelected || undefined}
    maw={400}
    bg={isInGroup ? 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-gray-9))' : undefined}
  >
    <Group wrap='nowrap'>
      <Avatar src={user?.avatar?.signedUrl} size="lg" name={user.fullName} />
      <div>
        <Text fz="xl" fw="bold">{user.id === loggedInUser?.id ? 'Me' : user.fullName}</Text>
        {!isInGroup && <Text lineClamp={2}>{isSelected ? 'Click To Diselect' : user.status}</Text>}
        {isInGroup && <Text lineClamp={2}>Member</Text>}
      </div>
    </Group>
  </Card>)
}
interface IGroupMembers {
  group: ConversationProps
}
const GroupMembers = ({ group }: IGroupMembers) => {
  const loggedInUser = useGlobalStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<string | null>('members');
  const [usersFromSearch, setUsersFromSearch] = useState<GlobalUser[]>([])
  const members = group.users.map((member) => {
    const isAdmin = group.admins?.some((admin) => admin.id === member.id)
    return (
      <GroupUserCard user={member} isAdmin={isAdmin} group={group} />
    )
  })
  const IAMadmin = group.admins?.some((admin) => admin.id === loggedInUser?.id);
  const convsersations = useGlobalStore((state) => state.conversations).filter((convo) => convo.type !== ConvsersationType.GROUP);
  const [selectedUsers, setSelectedUsers] = useState<GlobalUser[]>([])
  const socket = useSocketContext();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateGroupUsers = (user: GlobalUser) => {
    const isPresent = selectedUsers.find((usr: GlobalUser) => usr.id === user.id);
    const isInGroup = group.users.some((usr: GlobalUser) => usr.id === user.id);

    if (isInGroup) {
      return;
    }
    if (isPresent) {
      setSelectedUsers((prev) => prev.filter((usr) => usr.id !== user.id));
    } else {
      setSelectedUsers((prev) => [...prev, user])
    }
  }
  const userCards = convsersations.map((convo) => {
    const user = convo.users[0];
    const isInGroup = group.users.some((usr: GlobalUser) => usr.id === user.id);
    return (
      <UserCard user={convo.users[0]} isInGroup={isInGroup} selectedUsers={selectedUsers} handleUpdate={() => handleUpdateGroupUsers(user)} />
    )
  })

  

  const handleAddGroupMembers = () => {
    if(isLoading || selectedUsers.length === 0) {
      return;
    }
    const messageBody = {
      membersId: selectedUsers.map((usr) => usr.id),
      groupId: group.id
    }
    setIsLoading(true);
    socket.emit('add-group-members', messageBody, () => {
      setSelectedUsers([]);
    })
    setIsLoading(false);
  }
  return (
    <Paper bg="none" min-w={400}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabsTab value='members' leftSection={<IconUsersGroup size={20} />}>
            Members
          </TabsTab>
          {IAMadmin && <TabsTab value="users-plus" leftSection={<IconUserPlus size={20} />}>
            Add User</TabsTab>}
        </TabsList>
        <TabsPanel value="members">
          <ScrollArea mah='50vh'>
            <SimpleGrid cols={3}>
              {members}
            </SimpleGrid>
          </ScrollArea>
        </TabsPanel>
        <TabsPanel value='users-plus'>
          <InputWrapper my="md">
            <Input placeholder='Search' size='lg'/>
          </InputWrapper>
          <div className={classes.scroll}>
            {userCards}
          </div>
          <Button fullWidth size='lg' onClick={handleAddGroupMembers}>Add</Button>
        </TabsPanel>
      </Tabs>
    </Paper>
  )
}

export default GroupMembers