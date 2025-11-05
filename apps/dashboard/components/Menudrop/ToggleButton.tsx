import { Avatar, Group, rem, Stack, Text, UnstyledButton } from '@mantine/core';
import { useGlobalStore } from '@repo/shared-logic';
import { IconChevronRight } from '@tabler/icons-react';

const ToggleButton = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <UnstyledButton p={0} w="100%">
      <Group align="center" h={'70'} justify="center" w={'100%'}>
        <Avatar src={user?.avatar?.signedUrl} className="h-full" name={user?.fullName}/>
        <Stack style={{ flex: 1 }} gap={2}>
          <Text size="sm">{user?.fullName}</Text>
        </Stack>
        <IconChevronRight
          size={22}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
};

export default ToggleButton;
