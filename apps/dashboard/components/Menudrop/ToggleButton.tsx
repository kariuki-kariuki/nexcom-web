import { Avatar, Group, rem, Stack, Text, UnstyledButton } from '@mantine/core';
import { useGlobalStore } from '@repo/shared-logic';
import { IconChevronRight } from '@tabler/icons-react';

const ToggleButton = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <UnstyledButton p={0}>
      <Group align="center" h={'70'} justify="center" w={'100%'}>
        <Avatar src={user?.avatar?.signedUrl} className="h-full" name={user?.fullName}/>
        <Stack style={{ flex: 1 }} gap={2}>
          <Text size="sm">{user?.fullName}</Text>
          <Text size="sm" lineClamp={1}>
            {user?.shop && `@ ${user.shop.name}`}
          </Text>
        </Stack>
        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
};

export default ToggleButton;
