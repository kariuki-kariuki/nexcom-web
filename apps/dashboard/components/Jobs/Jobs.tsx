'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconCirclePlusFilled, IconPencil } from '@tabler/icons-react';
import {
  Accordion,
  Anchor,
  Button,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Text,
  Title,
  useMantineTheme,
  Loader,
  Box,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { JobDto, JobState } from '@repo/nexcom-types';
import classes from './Jobs.module.css';

function Jobs({ jobsdb }: { jobsdb: JobDto[] | null }): React.JSX.Element {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [active, setActive] = useState('All');

  const filteredJobs = jobsdb
    ?.filter((job) => {
      if (active === 'All') return true;
      return job.status === active;
    })
    .map((job) => (
      <Accordion.Item
        className={classes.item}
        value={job.id.toString()}
        key={job.id}
      >
        <Accordion.Control
          c={
            job.status === JobState.Published
              ? 'teal.6'
              : job.status === JobState.Draft
              ? 'orange.7'
              : 'red.7'
          }
          fw={600}
          style={{ fontSize: mobile ? '1rem' : '1.2rem' }}
        >
          <Flex align="center" gap="xs">
            <Text>{job.title}</Text>
            <Text size="xs" c="dimmed">
              ({job.status})
            </Text>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel>
          <Flex direction="column" gap="md">
            <Text c="dimmed" size={mobile ? 'sm' : 'md'}>
              {job.description || 'No description provided.'}
            </Text>
            <Box>
              <Text fw={600} size="sm">
                Requirements
              </Text>
              {job.requirements.length > 0 ? (
                <Box component="ul" pl="lg" mt="xs">
                  {job.requirements.map((requirement, idx) => (
                    <li key={`${requirement}-${idx}`}>
                      <Text size="sm">{requirement || 'Empty requirement'}</Text>
                    </li>
                  ))}
                </Box>
              ) : (
                <Text c="dimmed" size="sm">
                  No requirements listed.
                </Text>
              )}
            </Box>
            <Flex direction="column" gap="xs">
              <Text size="sm">
                <Text span fw={600}>Location: </Text>
                {job.location || 'Not specified'}
              </Text>
              <Text size="sm">
                <Text span fw={600}>Type: </Text>
                {job.type || 'Not specified'}
              </Text>
              <Text size="sm">
                <Text span fw={600}>Deadline: </Text>
                {job.deadline || 'Not specified'}
              </Text>
            </Flex>
            <Group gap="xs" wrap="wrap">
              {job.jd && (
                <Button
                  component="a"
                  href={job.jd}
                  target="_blank"
                  download={job.jd}
                  variant="light"
                  color="teal"
                  size={mobile ? 'xs' : 'sm'}
                  radius="md"
                >
                  View Job Description
                </Button>
              )}
              <Link href={`/dashboard/jobs/edit/${job.id}`}>
                <Button
                  leftSection={<IconPencil size={16} />}
                  variant="outline"
                  color="coco.5"
                  size={mobile ? 'xs' : 'sm'}
                  radius="md"
                >
                  Edit
                </Button>
              </Link>
              <Anchor
                href="mailto:mkmartinoes@gmail.com"
                c="blue"
                size="sm"
                fw={500}
              >
                Apply Now
              </Anchor>
            </Group>
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    ));

  return (
    <Paper
      shadow="lg"
      radius="lg"
      p={{ base: 'sm', sm: 'md', lg: 'xl' }}
      withBorder
      bg="none"
      maw={1000}
      mx="auto"
      mt="sm"
    >
      <Group justify="space-between" wrap="nowrap" mb="lg">
        <SegmentedControl
          radius="xl"
          size={mobile ? 'xs' : 'md'}
          data={['All', 'Published', 'Draft', 'Archived']}
          value={active}
          onChange={setActive}
          classNames={{ root: classes.segmentedControl }}
          aria-label="Filter jobs by status"
          color="teal"
          transitionDuration={200}
          transitionTimingFunction="ease"
        />
        <Link href="/dashboard/jobs/create">
          <Button
            variant="filled"
            color="teal"
            size={mobile ? 'xs' : 'md'}
            leftSection={<IconCirclePlusFilled size={20} />}
            radius="xl"
            style={{ transition: 'all 0.2s ease' }}
          >
            Add Job
          </Button>
        </Link>
      </Group>

      {jobsdb === null ? (
        <Flex align="center" justify="center" direction="column" gap="md" mih={300}>
          <Loader size="lg" color="teal" />
          <Text c="dimmed" size="lg" ta="center">
            Loading jobs...
          </Text>
        </Flex>
      ) : filteredJobs && filteredJobs.length > 0 ? (
        <Accordion
          variant="separated"
          radius="md"
          transitionDuration={300}
          >
          {filteredJobs}
        </Accordion>
      ) : (
        <Flex align="center" justify="center" direction="column" gap="md" mih={300}>
          <Text c="dimmed" size="lg" ta="center">
            No jobs available for the selected filter.
          </Text>
          <Link href="/dashboard/jobs/create">
            <Button variant="light" color="teal" size="md" radius="xl">
              Create Your First Job
            </Button>
          </Link>
        </Flex>
      )}
    </Paper>
  );
}

export default Jobs;