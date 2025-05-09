'use client';

import { useContext, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import {
  Avatar,
  Button,
  Dialog,
  FileInput,
  Group,
  rem,
  Text,
  UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { UserContextType } from '../../lib/@types/app';
import { UploadImage } from './uploadImage';
import classes from './UserButton.module.css';
import { useGlobalStore } from '@/lib/context/global-store.provider';

interface Res {
  link: string;
}
export function UserButton() {
  const user = useGlobalStore(state => state.user)
  const setUser = useGlobalStore(state => state.setUser)
  const [value, setValue] = useState<File | null>(null);
  const [opened, { toggle }] = useDisclosure();
  const handleUpload = async () => {
    const formData = new FormData();
    if (value) {
      formData.append('file', value);
      const res = await UploadImage<Res | string>({
        resource: 'users/avatar',
        formData
      });
      if (typeof res === 'string') {
        notifications.show({
          message: res,
          title: 'Error',
          color: 'red'
        });
        return;
      }
      if (user) {
        user.avatar.signedUrl = res.link;
        setUser(user);
        setValue(null);
        notifications.show({
          message: 'Uploaded Images Correctly',
          title: 'Success',
          color: 'coco.0'
        });
        toggle();
      }
    }
  };
  return (
    <>
      <UnstyledButton className={classes.user} onClick={toggle}>
        <Group>
          <Avatar
            src={
              value ? URL.createObjectURL(value) : user?.avatar?.signedUrl ? user?.avatar?.signedUrl : ''
            }
            radius="xl"
            alt={`${user?.fullName} profile picture`}
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {user?.fullName}
            </Text>

            <Text c="dimmed" size="xs">
              {user?.shop && `@ ${user.shop.name}`}
            </Text>
          </div>

          <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        </Group>
      </UnstyledButton>
      <Dialog
        opened={opened}
        onClose={() => {
          toggle();
          setValue(null);
        }}
        withCloseButton
        position={{ top: 100, right: 0 }}
      >
        <Text>Update Profile Image</Text>
        <Group>
          <FileInput value={value} onChange={setValue} style={{ flex: 1 }} />
          <Button onClick={handleUpload}>Submit</Button>
        </Group>
      </Dialog>
    </>
  );
}
