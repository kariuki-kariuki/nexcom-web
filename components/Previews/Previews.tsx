import React from 'react';
import { IconX } from '@tabler/icons-react';
import { Box, Button, Group, Image, SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';

interface Props {
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
}
function Previews({ files, setFiles }: Props) {
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Box pos="relative" bg="none" key={index}>
        <Group pos="absolute" justify="end">
          <Button
            color="red.9"
            variant="outline"
            radius="md"
            p="xs"
            onClick={() => setFiles(files.filter((item) => item !== file))}
          >
            <IconX color="white" size={20} />{' '}
          </Button>
        </Group>
        <Image
          key={index}
          src={imageUrl}
          w="auto"
          h={100}
          pr="20px"
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
      </Box>
    );
  });
  return (
    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={files.length > 0 ? 'xl' : 0}>
      {previews}
    </SimpleGrid>
  );
}

export default Previews;
