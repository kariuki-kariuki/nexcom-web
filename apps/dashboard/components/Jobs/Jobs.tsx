'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconCirclePlusFilled, IconPencil } from '@tabler/icons-react';
import {
  Accordion,
  Anchor,
  Button,
  Group,
  SegmentedControl,
  Text,
  useMantineTheme
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { JobDto, JobState } from '@repo/nexcom-types';
import classes from './Jobs.module.css';

function Jobs({ jobsdb }: { jobsdb: JobDto[] | null }): React.JSX.Element {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [active, setActive] = useState('All');

  const jobs = jobsdb
    ?.filter((job) => {
      if (active === 'All') return true;
      return job.status === active;
    })
    .map((job) => (
      <Accordion.Item
        className={classes.item}
        value={job.id.toString()}
        key={job.title}
      >
        <Accordion.Control
          c={
            job.status === JobState.Published
              ? 'coco.0'
              : job.status === JobState.Draft
                ? 'orange.7'
                : 'red.7'
          }
          fw="bold"
        >
          {job.title}
        </Accordion.Control>
        <Accordion.Panel>
          <Group>
            {job.jd ? (
              <Button
                component="a"
                href={job.jd}
                target="_blank"
                download={job.jd}
              >
                {' '}
                View Job Descrition
              </Button>
            ) : (
              ''
            )}
            <Link href={`jobs/edit/${job.id}`}>
              <Button leftSection={<IconPencil />}>Edit</Button>
            </Link>
          </Group>
          <Text c="dimmed" py="sm">
            {job.description}
          </Text>
          <Text>Requirements</Text>
          <ul>
            {job.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
          <Text>Location: {job.location}</Text>
          <Text>Type: {job.type}</Text>
          <Text>Deadline: {job.deadline}</Text>
          <Anchor href="mailo:mkmartinoes@gmail.com">Apply Now</Anchor>
        </Accordion.Panel>
      </Accordion.Item>
    ));

  return (
    <div>
      <Group justify="space-between" wrap="nowrap" pb="md">
        <SegmentedControl
          radius="xl"
          size={mobile ? 'xs' : 'sm'}
          data={['All', 'Published', 'Draft', 'Archived']}
          classNames={classes}
          onChange={setActive}
        />
        <Link href="/jobs/create">
          <Button
            variant="default"
            size={mobile ? 'xs' : 'sm'}
            leftSection={<IconCirclePlusFilled color="teal" />}
            radius="xl"
          >
            Add
          </Button>
        </Link>
      </Group>
      {jobsdb ? (
        <div>Need fix</div>
        // <Accordion variant="separated">{jobs}</Accordion>
      ) : (
        <Text>No Jobs Available</Text>
      )}
    </div>
  );
}

export default Jobs;
