import { Avatar, Button, Card, CardSection, Group, Text } from '@mantine/core';
import classes from './Profile.module.css';
import { CardsCarousel } from '../CardsCarousel/CardsCarousel';
import PictureUpdate from '../PictureUpdate/PictureUpdate';
import { GlobalUser } from '@/lib/@types/app';
import Link from 'next/link';
import { IconArrowsLeftRight } from '@tabler/icons-react';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { AUTH_URL } from '@repo/shared-logic';


function Profile({ userClicked }: { userClicked: GlobalUser }) {
  const user = useGlobalStore((state) => state.user);
  const active = userClicked.id === user?.id;
  console.log(user)

  return (
    <Card h={'100%'} bg="none" className={classes.profile} radius={0} pb={'lg'}>
      <CardSection py="xl" mb="xs" classNames={{ section: classes.sections }}>
        {active ? (
          <PictureUpdate image={userClicked?.avatar?.signedUrl} />
        ) : (
          <Avatar
            src={userClicked?.avatar?.signedUrl}
            size={200}
            name={userClicked?.fullName}
            mx="auto"
            className={classes.avatar}
          />
        )}

        <Text ta="center" fz="lg" fw={500} mt="sm">
          {userClicked.fullName}{' '}
          {userClicked.shop ? `• at ${userClicked.shop.name}` : ''}
        </Text>
      </CardSection>
      <CardSection p="md" mb='xs' className={classes.sections}>
        <Text>Status</Text>
        <Text fz="sm" c="dimmed">
          {userClicked.status}
        </Text>
      </CardSection>
      {/* <Group my="md" justify="center" gap={30}>
        {userClicked.shop ? items : ''}
      </Group> */}

      {active ? (
        <CardSection p="md" className={classes.sections}>
          <Group justify="center">{!user?.shop && <Link href={`${AUTH_URL}/auth/business-signup`}><Button my="md" variant='light' color="teal.7" leftSection={<IconArrowsLeftRight />}>Switch to Business</Button></Link>}</Group>
        </CardSection>
      ) : (
        ''
      )}

      <CardSection className={classes.sections}>
        {userClicked.shop ? <CardsCarousel userClicked={userClicked} /> : ''}
      </CardSection>
    </Card>
  );
}

export default Profile;
