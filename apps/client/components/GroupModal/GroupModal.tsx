import React, { useState } from 'react'
import { useGlobalStore } from '../../lib/context/global-store.provider'
import { Card, Group, Avatar, Text, Modal, InputWrapper, Input, Title, Flex, Paper, FileInput, Button, Stepper, StepperCompleted, StepperStep } from '@mantine/core';
import { ConvsersationType, GlobalUser } from '../../lib/@types/app';
import classes from './GroupModal.module.css'
import { FileWithPath } from '@mantine/dropzone';
import { datasource } from '@repo/shared-logic';
import { notifications } from '@mantine/notifications';
import { useSocketContext } from '../../lib/hooks/useSocket';

interface IGroupModal {
  open: (opened: boolean) => void;
  opened: boolean;
}
const GroupModal = ({ open, opened }: IGroupModal) => {
  const { conversations, user } = useGlobalStore((state) => state);
  const socket = useSocketContext()
  let users = conversations.filter((convo) => convo.type === ConvsersationType.CONVERSATION).map((convo) => convo.users[0]);
  const [errors, setErrors] = useState({
    name: '',
    filter: '',
  })
  const [usersFromSearch, setUsersFromSearch] = useState<GlobalUser[]>([])
  const [groupName, setGroupName] = useState('')
  const [value, setValue] = useState('')
  const [avatar, setAvatar] = useState<FileWithPath | null>(null);
  users = [...usersFromSearch, ...users].filter((usr) => usr.id !== user?.id);
  const [selectedUsers, setSelectedUsers] = useState<GlobalUser[]>([])
  const [active, setActive] = useState(0)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleUpdateGroupUsers = (user: GlobalUser) => {
    const isPresent = selectedUsers.find((usr: GlobalUser) => usr.id === user.id);

    if (isPresent) {
      setSelectedUsers((prev) => prev.filter((usr) => usr.id !== user.id));
    } else {
      setSelectedUsers((prev) => [...prev, user])
    }
  }

  const handleCreateGorup = async () => {
    if (selectedUsers.length < 2) {
      errorNotifications('Select More Than Two People')
      return;
    } else if (groupName === '' || groupName.length < 3) {
      errorNotifications('Make sure group name is more than 3 char')
      return;
    }

    let formData: {
      groupName: string,
      membersId: string[],
      file?: any
    } = {
      groupName,
      membersId: selectedUsers.map((usr) => usr.id),
    }

    if (avatar) {
      formData = { ...formData, file: { mimetpe: avatar?.type, buffer: avatar } }
    }

    try {
      socket.emit('new-group', formData, () => {
        setGroupName('');
        setSelectedUsers([]);
        setActive(0);
        open(!opened);
      })
      return;
    } catch (e: any) {
      errorNotifications(e.message)
    }

  }

  const errorNotifications = (message: string) => {
    notifications.show({
      message,
      color: 'red.7',
      title: "Error"
    })
  }
  const usersCards = users.map((usr, index) => <UserCard selectedUsers={selectedUsers} handleUpdate={() => handleUpdateGroupUsers(usr)} user={usr} key={index} />)
  const handleSearch = async () => {
    const { data } = await datasource.post<GlobalUser[]>({ formData: { text: value }, path: 'users/search' })
    if (data?.length === 0 || !data) {
      errorNotifications(`No User with name or email ${value}`);
      return;
    }
    setUsersFromSearch(data);

  }
  return (
    <Modal
      opened={opened}
      onClose={() => open(!opened)}
      classNames={{
        body: classes.body,
        content: classes.root,
        header: classes.header
      }}
      withCloseButton={false}
      size=''
      centered
    >
      <Title ta="center">New Group</Title>
      <Stepper active={active} onStepClick={setActive} flex={1}>
        <StepperStep label="Group Name" description="Choose A group name">
          <InputWrapper my="sm" label="Name" size='xl'>
            <Input size='lg' radius="xl" placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          </InputWrapper>
        </StepperStep>
        <StepperStep label="Display Picture" description="Choose Group Avatar">
          <Group justify='center'>
            <Avatar size="xl" name={groupName ?? 'Group Name'} src={avatar ? URL.createObjectURL(avatar) : ''} />
          </Group>
          <InputWrapper label="Avatar" size="xl" my="sm">
            <FileInput size='lg' radius="xl" accept='image/*' value={avatar} onChange={setAvatar} />
          </InputWrapper>
        </StepperStep>
        <StepperStep label="Members" description="Select Group Users">
          <InputWrapper my="sm" label="Filter" size='xl'>
            <Input size='lg' radius="xl" placeholder='Filter'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }} />
          </InputWrapper>
          <Paper className={classes.paper}>
            {usersCards}
          </Paper>
        </StepperStep>

        <StepperCompleted>
          <Group justify='center'>
            <Button size='lg' my='sm' radius="xl" onClick={handleCreateGorup}>Create Group</Button>
          </Group>
        </StepperCompleted>
      </Stepper>
      <Group justify="center" mt="xl">
        <Button size='lg' radius="xl" variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} size='lg' className={classes.button} radius="xl">Next step</Button>
      </Group>
    </Modal>
  )
}

interface IUserCard {
  user: GlobalUser,
  handleUpdate: () => void;
  selectedUsers: GlobalUser[]
}
const UserCard = ({ user, handleUpdate, selectedUsers }: IUserCard) => {
  const loggedInUser = useGlobalStore(state => state.user);
  const isSelected = selectedUsers.find((usr) => usr.id === user.id)
  return (<Card
    radius={'xl'}
    className={classes.card}
    shadow="md"
    mb={'md'}
    onClick={handleUpdate}
    data-active={isSelected || undefined}
  >
    <Group wrap='nowrap'>
      <Avatar src={user?.avatar?.signedUrl} size="xl" name={user.fullName} />
      <div>
        <Text fz="xl" fw="bold">{user.id === loggedInUser?.id ? 'Me' : user.fullName}</Text>
        <Text lineClamp={2}>{isSelected ? 'Click To Diselect' : user.status}</Text>
      </div>
    </Group>
  </Card>)
}

export default GroupModal