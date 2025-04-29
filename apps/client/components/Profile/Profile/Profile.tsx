import { Avatar, Button, Card, Group, Text } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../../lib/context/appContext';
import classes from './Profile.module.css';
import { CardsCarousel } from '../CardsCarousel/CardsCarousel';
import PictureUpdate from '../PictureUpdate/PictureUpdate';
import { GlobalUser, UserContextType } from '@/lib/@types/app';
import Link from 'next/link';
import { IconArrowsLeftRight, IconSwitch } from '@tabler/icons-react';
const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' }
];

function Profile({ userClicked }: { userClicked: GlobalUser }) {
  const { user } = useContext(AppContext) as UserContextType;
  const active = userClicked.id === user?.id;
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
        <PictureUpdate image={userClicked?.avatar?.signedUrl} />
      ) : (
        <Avatar
          src={userClicked?.avatar?.signedUrl}
          size={80}
          radius={80}
          name={user?.fullName}
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
      {/* <Group my="md" justify="center" gap={30}>
        {userClicked.shop ? items : ''}
      </Group> */}
      {active ? (
        <Group justify="center">{!user?.shop &&  <Link href="/shop/create"><Button my="md" variant='light' color="teal.7" leftSection={<IconArrowsLeftRight />}>Switch to Business</Button></Link>}</Group>
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
