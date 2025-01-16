import {
  Avatar,
  Card,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  TextInput
} from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import {
  NewConversationContext,
  NewConversationType
} from '../../lib/context/newConversation';
import {
  activeConversatonType,
  ConversationContext
} from '../../lib/context/activeConversation';
import classes from './NewMessage.module.css';
import { GlobalUser } from '@/lib/@types/app';
import { PostFecthFX } from '@/lib/bhooks/fetchFX';

interface DProps {
  opened: boolean;
  toggle: () => void;
  open: () => void;
}

const NewMessage = ({ opened = true, toggle, open }: DProps) => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<GlobalUser[] | null>(null);
  const { setNewConversation } = useContext(
    NewConversationContext
  ) as NewConversationType;
  const { setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  const usersFound = users?.map((user) => (
    <Card
      radius={'md'}
      className={classes.card}
      shadow="md"
      mb={'md'}
      onClick={() => {
        setActiveConversation(null);
        setNewConversation(user);
        open();
        toggle();
      }}
      key={user.id}
    >
      <Group>
        <Avatar src={user.photo} />
        <Text>{user.firstName}</Text>
      </Group>
    </Card>
  ));
  const handleSubmit = async () => {
    const body = { text: value };
    const { result } = await PostFecthFX<GlobalUser[], { text: string }>({
      resource: `users/search`,
      method: 'POST',
      body
    });
    if (result) {
      setUsers(result);
    }
  };
  return (
    <Drawer
      opened={opened}
      onClose={toggle}
      classNames={{
        body: classes.body,
        content: classes.root,
        header: classes.header
      }}
      withCloseButton={false}
    >
      <Flex h={'100%'} className={classes.box} p={'md'} direction={'column'}>
        <Group>
          <TextInput
            w={'80%'}
            rightSection={
              <IconSearch size={20} color="teal" onClick={handleSubmit} />
            }
            placeholder="Enter name, email or phone"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            my={'md'}
          />
          <IconX color="red" onClick={toggle} />
        </Group>
        <ScrollArea h={'100%'}>{usersFound}</ScrollArea>
      </Flex>
    </Drawer>
  );
};

export default NewMessage;
