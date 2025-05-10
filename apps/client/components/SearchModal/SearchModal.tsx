'use client'
import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Card,
  Divider,
  Flex,
  Group,
  InputWrapper,
  Modal,
  ScrollArea,
  Text,
  TextInput
} from '@mantine/core';
import { IconCirclePlusFilled, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './SearchModal.module.css';
import { GlobalUser } from '@/lib/@types/app';
import { datasource } from '@/lib/common/datasource';
import { notifications } from '@mantine/notifications';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

const SearchModal = () => {
  const [value, setValue] = useState('');
  const [opened, { toggle }] = useDisclosure(false);
  const [users, setUsers] = useState<GlobalUser[] | null>(null);
  const { setNewConversation } = useGlobalStore((state) => state);
  const conversations = useGlobalStore((store) => store.conversations);
  const [loading, setLoading] = useState(false)
  const user = useGlobalStore((state) => state.user);
  const [error, setError] = useState('')
  const router = useRouter()
  const setActiveConversation = useGlobalStore(state => state.setActiveConversation)
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
          router.push(`/chat/${convo.id}`);
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
        <Avatar src={person?.avatar?.signedUrl} name={person.fullName} />
        <Text>{person.id === user?.id ? 'Me' : person.fullName}</Text>
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
    <Box className={classes.absolute}>
      <ActionIcon bg={'blue'} size={40} onClick={toggle}>
        <IconCirclePlusFilled size={20} color={'white'} />
      </ActionIcon>

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
    </Box>
  );
};

export default SearchModal;
