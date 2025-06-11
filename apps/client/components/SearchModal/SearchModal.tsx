'use client'
import {
  Avatar,
  Burger,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  InputWrapper,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Modal,
  ScrollArea,
  Text,
  TextInput
} from '@mantine/core';
import { IconCirclePlusFilled, IconMessageCirclePlus, IconSearch, IconUsersGroup } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './SearchModal.module.css';
import { GlobalUser } from '@/lib/@types/app';
import { datasource } from '@/lib/common/datasource';
import { notifications } from '@mantine/notifications';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import GroupModal from '../GroupModal/GroupModal';

const SearchModal = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [modalOpened, setOpened] = useState(false);

  return (
    <div className={classes.absolute}>
      <Menu position='top-start'>
        <MenuTarget>
          <Button><IconCirclePlusFilled size={20} color={'white'} /></Button>
        </MenuTarget>
        <MenuDropdown className={classes.menu_drop}>
          <MenuLabel>Actions</MenuLabel>
          <MenuItem onClick={toggle} leftSection={<IconMessageCirclePlus size={20} color={'white'} />}>
            New Chat
          </MenuItem>
          <MenuItem onClick={() => setOpened(!modalOpened)} leftSection={<IconUsersGroup size={20} color={'white'} />}>
            New Group
          </MenuItem>
        </MenuDropdown>
      </Menu>
      <NewChatModal opened={opened} toggle={toggle} />
      <GroupModal open={setOpened} opened={modalOpened} />
    </div>
  );
};

interface INewChatModal {
  opened: boolean,
  toggle: () => void;
}

const NewChatModal = ({opened, toggle}: INewChatModal) => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<GlobalUser[] | null>(null);
  const conversations = useGlobalStore((store) => store.conversations);
  const [loading, setLoading] = useState(false)
  const user = useGlobalStore((state) => state.user);
  const [error, setError] = useState('')
  const usersFound = users?.map((person) => {
    const convo = conversations.find(convo => convo.users[0].id === person.id);
    const isMe = person.id === user?.id;
    if (convo) {
      return (
        <Link href={`/chat/${convo.id}`} key={person.id} onClick={toggle}>
          <UserCard user={person} />
        </Link>
      )
    } else if (isMe) {
      return (
        <UserCard user={person} />
      )
    } else {
      return (
        <Link href={`/chat/new/${person.id}`} key={person.id} onClick={toggle}>
          <UserCard user={person} />
        </Link>
      )
    }

  });
  const handleSubmit = async () => {
    setError('')
    setLoading(true);
    const { data, error } = await datasource.post<GlobalUser[]>({ formData: { text: value }, path: 'users/search' })
    if (data) {
      if (data.length === 0) {
        notifications.show({
          title: 'Not found',
          color: 'red',
          message: `No search results found for ${value}`
        })
      }
      setUsers(data);
    }

    if (error) {
      setError('')
    }
    setLoading(loading)
  };

  return (
    <Modal
      opened={opened}
      onClose={toggle}
      classNames={{
        body: classes.body,
        content: classes.root,
        header: classes.header
      }}
      withCloseButton={false}
      centered
    >
      <Flex h={'100%'} className={classes.box} px="md" direction={'column'}>
        <Group justify='end' py="sm">
          <Burger opened={opened} color='red' onClick={toggle} />
        </Group>
        <Group >
          <InputWrapper error={error}
            w={'100%'}
          >
            <TextInput
              rightSection={
                <IconSearch size={20} color="teal" onClick={handleSubmit} style={{ cursor: 'pointer' }} />
              }
              placeholder="Enter name, email or phone"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit()
                }
              }}
              radius={"lg"}
              size='md'
            />
          </InputWrapper>
        </Group>
        <Divider my="md" />
        <ScrollArea h={'100%'}>{usersFound}</ScrollArea>
      </Flex>
    </Modal>
  )
}


const UserCard = ({ user }: { user: GlobalUser }) => {
  const loggedInUser = useGlobalStore(state => state.user);
  return (<Card
    radius={'md'}
    className={classes.card}
    shadow="md"
    mb={'md'}
    key={user.id}
  >
    <Group wrap='nowrap'>
      <Avatar src={user?.avatar?.signedUrl} size="xl" name={user.fullName} />
      <div>
        <Text fz="xl" fw="bold">{user.id === loggedInUser?.id ? 'Me' : user.fullName}</Text>
        <Text lineClamp={2}>{user.status}</Text>
      </div>
    </Group>
  </Card>)
}
export default SearchModal;
