import { Avatar, Button, Card, Group, Switch, Text } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../../../context/appContext';
import { UserContextType } from '../../../../@types/app';
import classes from './Profile.module.css';
import { GlobalUser } from '../../../../@types/chat';
import { useFetch } from '../../../../hooks/useFetchHooks';
import { ShopProduct } from '../../../../@types/shop';
import { CardsCarousel } from '../CardsCarousel/CardsCarousel';
const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];

function Profile({ userClicked }: { userClicked: GlobalUser }) {
  const { user } = useContext(AppContext) as UserContextType;
  const { result } = useFetch<ShopProduct[]>(`shops/${userClicked.shop?.id}`);
  console.log('Result', result);
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
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
      <Avatar
        src={userClicked.photo}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {userClicked.firstName}{' '}
        {userClicked.shop ? `• at ${userClicked.shop.name}` : ''}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {userClicked.email}
      </Text>
      <Group my="md" justify="center" gap={30}>
        {items}
      </Group>
      {userClicked.email == user?.email ? (
        <>
          <Group justify="center" p={'md'}>
            <Text fz={'sm'} c={'dimmed'}>
              Two factor authentication
            </Text>
            <Switch size="xs" onLabel="ON" offLabel="OFF" />
          </Group>
          <Button fullWidth radius="md" mt="xl" size="md" variant="default">
            Edit
          </Button>
        </>
      ) : (
        ''
      )}
      <Card.Section>
        {result != null ? <CardsCarousel products={result} /> : ''}
      </Card.Section>
    </Card>
  );
}

export default Profile;
