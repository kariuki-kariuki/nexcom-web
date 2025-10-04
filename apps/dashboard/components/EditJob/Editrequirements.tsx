import React, { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Button, Dialog, Group, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { JobDto } from '@repo/nexcom-types';

interface Iprops {
  setJob: (updater: (prev: JobDto) => JobDto) => void;
  requirement: string;
}

function Editrequirements({ requirement, setJob }: Iprops) {
  const [edRequirement, setRequirement] = useState(requirement);
  const [opened, { toggle }] = useDisclosure();

  const handleSubmit = () => {
    if (edRequirement) {
      setJob((prev) => ({
        ...prev,
        requirements: prev.requirements.map((rq) => {
          if (rq === requirement) return edRequirement;
          return rq;
        })
      }));
    } else {
      notifications.show({
        title: 'Error',
        message: 'Requirement cannot be empty',
        color: 'red.9'
      });
    }
  };
  return (
    <>
      <Button
        color="coco.0"
        size="xs"
        onClick={toggle} // Placeholder for editing logic
      >
        <IconEdit size={20} />
      </Button>
      <Dialog
        opened={opened}
        onClose={toggle}
        withCloseButton
        position={{ top: '40%', left: '40%' }}
        size="xl"
      >
        <Text size="sm" mb="xs" fw={500}>
          Edit Requirements
        </Text>
        <Group align="flex-end">
          <TextInput
            value={edRequirement}
            onChange={(e) => setRequirement(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button color="coco.0" onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </Dialog>
    </>
  );
}

export default Editrequirements;
