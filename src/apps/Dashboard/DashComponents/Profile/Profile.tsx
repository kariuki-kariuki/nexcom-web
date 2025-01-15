import { Avatar, Card, Group, Text } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../../../../lib/context/appContext';
import { UserContextType } from '../../../../@types/app';
import classes from './Profile.module.css';
import { GlobalUser } from '../../../../@types/chat';
import { CardsCarousel } from '../CardsCarousel/CardsCarousel';
import PictureUpdate from '../PictureUpdate/PictureUpdate';
import CreateShop from '../PictureUpdate/CreateShop';
const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' }
];

function Profile({ userClicked }: { userClicked: GlobalUser }) {
  const { user } = useContext(AppContext) as UserContextType;
  const active = userClicked.email === user?.email;
  userClicked.lastName = 'Doe';
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card h={'100%'} className={classes.profile} radius={'md'} pb={'lg'}>
      <Card.Section
        h={70}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)'
        }}
      />
      {active ? (
        <PictureUpdate image={userClicked.photo} />
      ) : (
        <Avatar
          src={userClicked.photo}
          size={80}
          radius={80}
          mx="auto"
          mt={-30}
          className={classes.avatar}
        />
      )}
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {userClicked.firstName}{' '}
        {userClicked.shop ? `• at ${userClicked.shop.name}` : ''}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {userClicked.status}
      </Text>
      <Group my="md" justify="center" gap={30}>
        {userClicked.shop ? items : ''}
      </Group>
      {active ? (
        <Group justify="center">{user?.shop ? '' : <CreateShop />}</Group>
      ) : (
        ''
      )}
      <Card.Section>
        {userClicked.shop ? <CardsCarousel userClicked={userClicked} /> : ''}
      </Card.Section>
    </Card>
  );
}

export default Profile;
