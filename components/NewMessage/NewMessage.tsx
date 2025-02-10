import {
  Avatar,
  Card,
  Drawer,
  Flex,
  Group,
  InputWrapper,
  ScrollArea,
  Text,
  TextInput
} from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import {
  useNewConverSationContext
} from '../../lib/context/newConversation';
import {
  useActiveConversation
} from '../../lib/context/activeConversation';
import classes from './NewMessage.module.css';
import { GlobalUser } from '@/lib/@types/app';
import { datasource } from '@/lib/common/datasource';
import { notifications } from '@mantine/notifications';
import { useGlobalContext } from '@/lib/context/appContext';
import { useChat } from '@/lib/context/ConversationContext';

interface DProps {
  opened: boolean;
  toggle: () => void;
  open: () => void;
}

const NewMessage = ({ opened = true, toggle, open }: DProps) => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<GlobalUser[] | null>(null);
  const { setNewConversation } = useNewConverSationContext();
  const { state } = useChat()
  const [loading, setLoading] = useState(false)
  const { user } = useGlobalContext()
  const [error, setError] = useState('')
  const { setActiveConversation } = useActiveConversation();
  const usersFound = users?.map((person) => (
    <Card
      radius={'md'}
      className={classes.card}
      shadow="md"
      mb={'md'}
      onClick={() => {
        if (user?.id === person.id) return;

        const convo = state.conversations.find(convo => convo.users[0].id === person.id);
        if (convo) { 
          setActiveConversation(convo); 
          toggle(); 
          return; 
        }
        setActiveConversation(null);
        setNewConversation(person);
        open();
        toggle();
      }}
      key={person.id}
    >
      <Group>
        <Avatar src={person.photo} />
        <Text>{person.id === user?.id ? 'Me' : person.firstName}</Text>
      </Group>
    </Card>
  ));
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
        <Group >
          <InputWrapper error={error} size='lg'
            w={'80%'}
          >
            <TextInput
              rightSection={
                <IconSearch size={20} color="teal" onClick={handleSubmit} />
              }
              placeholder="Enter name, email or phone"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              my={'md'}
              size='lg'
            />
          </InputWrapper>
          <IconX color="red" onClick={toggle} />
        </Group>
        <ScrollArea h={'100%'}>{usersFound}</ScrollArea>
      </Flex>
    </Drawer>
  );
};

export default NewMessage;
