'use client';

import React, { useState, useCallback } from 'react';
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
  Paper,
  Text,
  Textarea,
  Loader,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import EditRequirements from './Editrequirements'; // Renamed to match CreateJob
import { JobDto, JobState } from '@repo/nexcom-types';
import { datasource } from '@repo/shared-logic';
import classes from './EditJob.module.css'; // Reusing CreateJob's CSS module

function EditJob({ jobdb }: { jobdb: JobDto | null }) {
  if (!jobdb) {
    redirect('/dashboard/jobs');
  }

  const initialJobState: JobDto = {
    ...jobdb,
    deadline: jobdb.deadline ? new Date(jobdb.deadline).toDateString() : new Date().toDateString(),
  };

  const [job, setJob] = useState<JobDto>(initialJobState);
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<Date | null>(jobdb.deadline ? new Date(jobdb.deadline) : new Date());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingJd, setIsUploadingJd] = useState(false);
  const [opened, { toggle, close }] = useDisclosure();

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!job.title.trim()) newErrors.title = 'Title is required';
    if (!job.description.trim()) newErrors.description = 'Description is required';
    if (!job.location.trim()) newErrors.location = 'Location is required';
    if (!job.type.trim()) newErrors.type = 'Job type is required';
    if (!value) newErrors.deadline = 'Deadline is required';
    if (job.requirements.every(req => !req.trim())) {
      newErrors.requirements = 'At least one requirement is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [job, value]);

  const addRequirement = () => {
    setJob((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
    setErrors((prev) => ({ ...prev, requirements: '' }));
  };

  const handleUploadJd = async () => {
    if (!file) {
      notifications.show({
        message: 'No file selected',
        title: 'Error',
        color: 'red',
      });
      return;
    }

    setIsUploadingJd(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data, error } = await datasource.update<{ link: string }>(
        formData,
        `jobs/jd/${job.id}`,
        false,
      );

      if (error || !data) {
        throw new Error('Failed to upload job description');
      }

      setJob((prev) => ({ ...prev, jd: data.link }));
      notifications.show({
        title: 'Success',
        message: 'Job description uploaded successfully',
        color: 'teal',
      });
      setFile(null);
      close();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to upload job description. Please try again.',
        color: 'red',
      });
    } finally {
      setIsUploadingJd(false);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please fill in all required fields',
        color: 'red',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const jobData = { ...job, deadline: value?.toDateString() ?? '' };
      const { data, error } = await datasource.update(jobData, `jobs/${job.id}`);

      if (error || !data) {
        throw new Error('Failed to update job');
      }

      notifications.show({
        title: 'Success',
        message: 'Job updated successfully',
        color: 'teal',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update job. Please try again.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setJob(initialJobState);
    setValue(jobdb.deadline ? new Date(jobdb.deadline) : new Date());
    setErrors({});
    setFile(null);
    notifications.show({
      title: 'Form Reset',
      message: 'Form has been reset to initial state',
      color: 'blue',
    });
  };

  return (
    <Paper
      shadow="lg"
      radius="lg"
      p="xl"
      mt="sm"
      withBorder
      bg="none"
      maw={1000}
      mx="auto"
    >
      <Flex direction={{ base: 'column', sm: 'row' }} gap="xl">
        <Box
          w={{ base: '100%', sm: '50%' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <InputWrapper
            label="Job Title"
            error={errors.title}
            labelProps={{ fw: 600 }}
          >
            <Input
              classNames={{ input: classes.input }}
              value={job.title}
              size="lg"
              mt="xs"
              placeholder="Enter job title"
              onChange={(e) =>
                setJob((prev) => ({ ...prev, title: e.target.value }))
              }
              error={!!errors.title}
              variant="filled"
            />
          </InputWrapper>

          <InputWrapper
            label="Description"
            error={errors.description}
            labelProps={{ fw: 600 }}
          >
            <Textarea
              value={job.description}
              rows={5}
              classNames={{ input: classes.input }}
              size="lg"
              mt="xs"
              placeholder="Describe the job role and responsibilities"
              onChange={(e) =>
                setJob((prev) => ({ ...prev, description: e.target.value }))
              }
              error={!!errors.description}
              variant="filled"
            />
          </InputWrapper>

          <InputWrapper
            label="Location"
            error={errors.location}
            labelProps={{ fw: 600 }}
          >
            <Input
              size="lg"
              value={job.location}
              classNames={{ input: classes.input }}
              mt="xs"
              placeholder="Enter job location"
              onChange={(e) =>
                setJob((prev) => ({ ...prev, location: e.target.value }))
              }
              error={!!errors.location}
              variant="filled"
            />
          </InputWrapper>

          <InputWrapper
            label="Job Type"
            error={errors.type}
            labelProps={{ fw: 600 }}
          >
            <Input
              value={job.type}
              size="lg"
              classNames={{ input: classes.input }}
              mt="xs"
              placeholder="e.g., Full-time, Part-time, Contract"
              onChange={(e) =>
                setJob((prev) => ({ ...prev, type: e.target.value }))
              }
              error={!!errors.type}
              variant="filled"
            />
          </InputWrapper>

          <InputWrapper
            label="Status"
            labelProps={{ fw: 600 }}
          >
            <NativeSelect
              size="lg"
              value={job.status}
              classNames={{ input: classes.input }}
              mt="xs"
              onChange={(event) =>
                setJob((prev) => ({
                  ...prev,
                  status: event.target.value as JobState,
                }))
              }
              data={['Published', 'Archive', 'Draft']}
              variant="filled"
            />
          </InputWrapper>

          <InputWrapper
            label="Application Deadline"
            error={errors.deadline}
            labelProps={{ fw: 600 }}
          >
            <DatePickerInput
              value={value}
              onChange={setValue}
              size="lg"
              classNames={{ input: classes.input }}
              mt="xs"
              placeholder="Select deadline date"
              minDate={new Date()}
              error={!!errors.deadline}
              variant="filled"
            />
          </InputWrapper>

          <Group justify="space-between" mt="md">
            {job.jd ? (
              <Text
                component="a"
                download={job.jd}
                target="_blank"
                href={job.jd}
                c="blue"
              >
                View Job Description
              </Text>
            ) : (
              <Text c="dimmed">No Job Description</Text>
            )}
            <Button
              onClick={toggle}
              color="orange.7"
              variant="light"
              size="sm"
            >
              Upload JD
            </Button>

            <Dialog
              opened={opened}
              withCloseButton
              onClose={close}
              size="lg"
              radius="md"
            >
              <Text size="sm" mb="xs" fw={500}>
                Select Job Description File
              </Text>
              <Group align="flex-end">
                <FileInput
                  placeholder="Select file"
                  value={file}
                  onChange={setFile}
                  style={{ flex: 1 }}
                  error={file ? undefined : 'Please select a file'}
                />
                <Button
                  onClick={handleUploadJd}
                  disabled={isUploadingJd || !file}
                  leftSection={isUploadingJd && <Loader size="sm" />}
                >
                  {isUploadingJd ? 'Uploading...' : 'Submit'}
                </Button>
              </Group>
            </Dialog>
          </Group>
        </Box>

        <Paper
          w={{ base: '100%', sm: '50%' }}
          p="lg"
          bg="none"
          radius="md"
          shadow="md"
          withBorder
        >
          <Group justify="space-between" mb="lg">
            <Text fw={600} size="lg">
              Requirements
            </Text>
            <Button
              leftSection={<IconCirclePlus size={20} />}
              size="sm"
              color="teal"
              variant="light"
              onClick={addRequirement}
            >
              Add Requirement
            </Button>
          </Group>

          {errors.requirements && (
            <Text c="red" size="sm" mb="md">
              {errors.requirements}
            </Text>
          )}

          <Box
            component="ul"
            p="md"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {job.requirements.map((requirement, idx) => (
              <li key={`${requirement}-${idx}`}>
                <Group align="center" py="xs">
                  <Text style={{ flex: 1 }}>
                    {requirement || 'Empty requirement'}
                  </Text>
                  <ButtonGroup>
                    <EditRequirements setJob={setJob} requirement={requirement} />
                    <Button
                      color="red"
                      size="xs"
                      variant="light"
                      onClick={() =>
                        setJob((prev) => ({
                          ...prev,
                          requirements: prev.requirements.filter(
                            (_, index) => index !== idx
                          ),
                        }))
                      }
                    >
                      <IconTrashX size={20} />
                    </Button>
                  </ButtonGroup>
                </Group>
              </li>
            ))}
          </Box>
        </Paper>
      </Flex>

      <Group justify="center" mt="xl">
        <Button
          onClick={handleUpdate}
          disabled={isSubmitting}
          leftSection={isSubmitting && <Loader size="sm" />}
          color="coco.5"
          size="lg"
          px="xl"
          variant="filled"
        >
          {isSubmitting ? 'Updating...' : 'Update Job'}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          color="gray"
          size="lg"
          px="xl"
        >
          Reset Form
        </Button>
      </Group>
    </Paper>
  );
}

export default EditJob;