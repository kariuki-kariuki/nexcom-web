import {
  Avatar,
  Button,
  FileInput,
  Group,
  Indicator,
  InputWrapper,
  Popover,
  Stack,
  TextInput
} from '@mantine/core';
import { useState } from 'react';
import classes from './PictureUpdate.module.css';
import { FileWithPath } from '@mantine/dropzone';
import { useGlobalStore, useSocketContext } from '@repo/shared-logic';
import { GlobalUser } from '@repo/nexcom-types';
const PictureUpdate = ({ image }: { image: string }) => {
  const [value, setValue] = useState<FileWithPath | null>(null);
  const user = useGlobalStore(state => state.user)
  const setUser = useGlobalStore(state => state.setUser)
  const [status, setStatus] = useState(user?.status || '')
  const socket = useSocketContext()
  const handleSubmit = async () => {
      let body;
      if(value) {
        body = {status, file: { mimetype: value.type, buffer: value }}
      } else {
        body = {status}
      }
      socket.emit('updateProfile', body, (res: GlobalUser) => {
        if (user) {
          setValue(null)
          setUser(res);
        }
      })
  }
  return (
    <Popover width={300} onClose={() => setValue(null)}>
      <Popover.Target>
        <Group justify="center">
          <Indicator
            size={20}
            processing
            title="Click To edit"
            color="teal"
            withBorder
          >
            <Avatar
              src={value ? URL.createObjectURL(value) : user?.avatar?.signedUrl}
              size={200}
              name={'AV'}
              className={classes.avatar}
            />
          </Indicator>
        </Group>
      </Popover.Target>
      <Popover.Dropdown p={'md'}>
        <Stack gap="lg">
          <FileInput
            label="Choose new picture"
            placeholder="Image"
            size="lg"
            value={value}
            onChange={setValue}
            accept="image/png,image/jpeg,image/webp,image/jpg"
          />
          <InputWrapper>
            <TextInput size="lg" value={status} onChange={(e) => setStatus(e.target.value)} />
          </InputWrapper>
        </Stack>

        <Group my={'md'}>
          <Button onClick={handleSubmit}>Update</Button>
          {value ? (
            <Button color="red" onClick={() => setValue(null)}>
              Clear
            </Button>
          ) : (
            ''
          )}
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PictureUpdate;


