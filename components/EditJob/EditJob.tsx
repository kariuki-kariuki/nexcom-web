'use client';

import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { IconCirclePlus, IconTrashX } from '@tabler/icons-react';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  FileInput,
  Flex,
  Group,
  Input,
  InputWrapper,
  NativeSelect,
  Text,
  Textarea
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { JobDto, JobState } from '../../lib/@types/jobs';
import SimpleRoute from '../SimpleRoute/SimpleRoute';
import { UploadImage } from '../SimpleRoute/uploadImage';
import Editrequirements from './Editrequirements';
import { datasource } from '@/lib/common/datasource';

function EditJob({ jobdb }: { jobdb: JobDto | null }) {
  if (!jobdb) {
    redirect('/jobs');
  }

  const [job, setJob] = useState(jobdb);
  const [file, setFile] = useState<File | null>(null);

  const [opened, { toggle }] = useDisclosure();

  const addRequirement = () => {
    setJob((prev) => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const handleUploadJd = async () => {
    const formData = new FormData();
    if (!file) {
      notifications.show({
        message: 'No File To Upload',
        title: 'Error',
        color: 'red.7'
      });
      return;
    }
    formData.append('file', file);
    const {data, error} = await datasource.post<{ link: string }>({formData,
       path: `jobs/jd/${job.id}`}
    );
    if (error) {
      notifications.show({
        message: 'Failed to update',
        title: 'Error',
        color: 'red'
      });
      setFile(null);
    } else if(data){
      setJob((prev) => ({ ...prev, jd: data.link }));
      setFile(null);
      toggle();
    }
  };

  const handleUpdate = async () => {
    const {data, error} = await datasource.update(job, `jobs/${job.id}`);

    if (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed ToUpdate The Product',
        color: 'red.8'
      });
      return;
    }

    notifications.show({
      title: 'Success',
      message: 'Updated the job succesfuly',
      color: 'scode.8'
    });
  };

  return (
    <Box px="sm">
      <SimpleRoute main="jobs" tag={`Edit Job ${jobdb?.id}`} />
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

          <Group justify="space-between" py="md">
            {job.jd ? (
              <Text
                component="a"
                download={job.jd}
                target="_blank"
                href={job.jd}
              >
                click to view JD
              </Text>
            ) : (
              <Text>No Job Description</Text>
            )}
            <Button onClick={toggle} color="orange.7">
              Upload JD
            </Button>

            <Dialog
              opened={opened}
              withCloseButton
              onClose={toggle}
              size="lg"
              radius="md"
            >
              <Text size="sm" mb="xs" fw={500}>
                Select File
              </Text>

              <Group align="flex-end">
                <FileInput
                  placeholder="select file"
                  value={file}
                  onChange={setFile}
                  style={{ flex: 1 }}
                />
                <Button onClick={handleUploadJd}>Submit</Button>
              </Group>
            </Dialog>
          </Group>
        </Box>
        <Box py="md" w={{ base: '100%', sm: '50%' }} px="md">
          <Group justify="space-between">
            <Text>Requirements</Text>
            <Button
              leftSection={<IconCirclePlus />}
              size="xs"
              color="scode.8"
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
        <Button color="scode.8" onClick={handleUpdate}>
          Update
        </Button>
      </Group>
    </Box>
  );
}

export default EditJob;
