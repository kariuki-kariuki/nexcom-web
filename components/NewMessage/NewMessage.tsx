import {
  Avatar,
  Burger,
  Card,
  Divider,
  Drawer,
  Flex,
  Group,
  InputWrapper,
  ScrollArea,
  Text,
  TextInput
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './NewMessage.module.css';
import { GlobalUser } from '@/lib/@types/app';
import { datasource } from '@/lib/common/datasource';
import { notifications } from '@mantine/notifications';
import { useGlobalContext } from '@/lib/context/appContext';
import useGlobalStore from '@/lib/store/globalStore';

interface DProps {
  opened: boolean;
  toggle: () => void;
  open: () => void;
}

const NewMessage = ({ opened = true, toggle, open }: DProps) => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<GlobalUser[] | null>(null);
  const conversations = useGlobalStore((state) => state.conversations) ;
  const setActiveConversation = useGlobalStore((state) => state.setActiveConversation);
  const setNewConversation = useGlobalStore((state) => state.setNewConversation);
  
  const [loading, setLoading] = useState(false)
  const { user } = useGlobalContext()
  const [error, setError] = useState('')

  const usersFound = users?.map((person) => (
    <Card
      radius={'md'}
      className={classes.card}
      shadow="md"
      mb={'md'}
      onClick={() => {
        if (user?.id === person.id) return;

        const convo = conversations.find(convo => convo.users[0].id === person.id);
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
    console.log("Called submit")
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
                <IconSearch size={20} color="teal" onClick={handleSubmit} style={{ cursor: 'pointer'}}/>
              }
              placeholder="Enter name, email or phone"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  handleSubmit()
                }
              }}
              radius={"lg"}
              size='md'
            />
          </InputWrapper>
        </Group>
        <Divider my="md"/>
        <ScrollArea h={'100%'}>{usersFound}</ScrollArea>
      </Flex>
    </Drawer>
  );
};

export default NewMessage;
