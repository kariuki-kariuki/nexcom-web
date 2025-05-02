'use client';

import React, { useState } from 'react';
import { IconCirclePlus, IconTrashX } from '@tabler/icons-react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Group,
  Input,
  InputWrapper,
  NativeSelect,
  Text,
  Textarea
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { JobInterface, JobState } from '../../lib/@types/jobs';
import Editrequirements from './EditRequirements';
import { datasource } from '@/lib/common/datasource';

const jobState: JobInterface = {
  title: '',
  description: '',
  location: '',
  type: '',
  status: JobState.Published,
  requirements: [''],
  deadline: `${new Date().getDate().toString()}`,
  jd: null
};

function CreateJob() {
  const [job, setJob] = useState<JobInterface>(jobState);
  const [value, setValue] = useState<Date | null>(new Date());
  const addRequirement = () => {
    setJob((prev) => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const handleUpdate = async () => {
    job.deadline = value?.toDateString() ?? '';
    const res = await datasource.post({ path: 'jobs', formData: job });

    if (!res) {
      notifications.show({
        title: 'Error',
        message: 'Failed To Create Job',
        color: 'red.8'
      });
      return;
    }

    notifications.show({
      title: 'Success',
      message: 'Created the job succesfuly',
      color: 'coco.0'
    });
  };

  return (
    <Box>
      <Flex direction={{ base: 'column', sm: 'row' }} gap="md">
        <Box py="md" w={{ base: '100%', sm: '50%' }}>
          <InputWrapper pb="md" label="Title">
            <Input
              value={job.title}
              size="lg"
              onChange={(e) =>
                setJob((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </InputWrapper>
          <InputWrapper pb="md" label="Description">
            <Textarea
              value={job.description}
              rows={4}
              size="lg"
              onChange={(e) =>
                setJob((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </InputWrapper>
          <InputWrapper pb="md" label="Location">
            <Input
              size="lg"
              value={job.location}
              onChange={(e) =>
                setJob((prev) => ({ ...prev, location: e.target.value }))
              }
            />
          </InputWrapper>
          <InputWrapper pb="md" label="Type">
            <Input
              value={job.type}
              size="lg"
              onChange={(e) =>
                setJob((prev) => ({ ...prev, type: e.target.value }))
              }
            />
          </InputWrapper>
          <InputWrapper pb="md" label="State">
            <NativeSelect
              size="lg"
              value={job.status}
              onChange={(event) =>
                setJob((prev) => ({
                  ...prev,
                  status: event.target.value as JobState
                }))
              }
              data={['Published', 'Archive', 'Draft']}
            />
          </InputWrapper>
          <DatePickerInput
            label="Pick DeadLine"
            placeholder="Pick date"
            value={value}
            onChange={setValue}
            size="lg"
          />
        </Box>
        <Box py="md" w={{ base: '100%', sm: '50%' }} px="md">
          <Group justify="space-between">
            <Text>Requirements</Text>
            <Button
              leftSection={<IconCirclePlus />}
              size="xs"
              color="coco.0"
              onClick={addRequirement}
            >
              New
            </Button>
          </Group>
          <ul>
            {job.requirements.map((requirement, idx) => (
              <li key={`${requirement}-${idx}`}>
                <Group py="md" align="top">
                  <Text style={{ flex: 1 }}>{requirement}</Text>
                  <ButtonGroup>
                    <Editrequirements
                      setJob={setJob}
                      requirement={requirement}
                    />

                    <Button
                      color="red.7"
                      size="xs"
                      onClick={() =>
                        setJob((prev) => ({
                          ...prev,
                          requirements: prev.requirements.filter(
                            (_, index) => index !== idx
                          )
                        }))
                      }
                    >
                      <IconTrashX size={20} />
                    </Button>
                  </ButtonGroup>
                </Group>
              </li>
            ))}
          </ul>
        </Box>
      </Flex>
      <Group justify="center">
        <Button color="coco.0" onClick={handleUpdate}>
          Update
        </Button>
      </Group>
    </Box>
  );
}

export default CreateJob;
