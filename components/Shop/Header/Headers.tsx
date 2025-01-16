import { Flex, Group, Input, Text } from '@mantine/core';
import FilterBy from './FilterBy';

function Headers({ text }: any) {
  return (
    <Flex justify={'space-between'} align={'center'} p="md" bg={'none'}>
      <Text className="text-center text" fz="md" component="h1">
        {text}
      </Text>

      <Group>
        <FilterBy />
        <Input placeholder="search" />
      </Group>
    </Flex>
  );
}

export default Headers;
