import {
  Button,
  Card,
  Divider,
  Group,
  Image,
  Switch,
  Text,
} from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';
import classes from './Styles.module.css';
function Profile() {
  const { user } = useContext(AppContext) as UserContextType;
  return (
    <Card
      h={'100%'}
      className={classes.profile}
      w={{ xs: '100%', md: '40%' }}
      radius={'xl'}
      p={0}
    >
      <Card.Section h={'40%'} p='lg'>
        <Image
          src={
            user.photo
              ? user.photo
              : 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
          }
          style={{ borderRadius: '100%', margin: '0px auto' }}
          h={'100%'}
          w={'auto'}
        />
      </Card.Section>
      <Divider />
      <Card.Section px={'xl'} py={'sm'}>
        <Group justify='space-between'>
          <Text fz={'sm'}>Name</Text>
          <Text>{user.firstName}</Text>
        </Group>
      </Card.Section>
      <Divider />
      <Card.Section px={'xl'} py={'sm'}>
        <Group justify='space-between'>
          <Text fz={'sm'}>Email</Text>
          <Text>{user.email}</Text>
        </Group>
      </Card.Section>
      <Divider />
      <Card.Section p={'xl'}>
        <Group>
          <Text>Two factor authentication</Text>
          <Switch size='xs' onLabel='ON' offLabel='OFF' />
        </Group>
      </Card.Section>
      <Card.Section px={'xl'}>
        <Button fullWidth>Edit</Button>
      </Card.Section>
    </Card>
  );
}

export default Profile;
