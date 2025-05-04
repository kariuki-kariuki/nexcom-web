import {
  Avatar,
  Button,
  FileInput,
  Group,
  Indicator,
  Popover
} from '@mantine/core';
import { useState } from 'react';
import classes from './PictureUpdate.module.css';
import { useSocketContext } from '@/lib/hooks/useSocket';
import { GlobalUser } from '@/lib/@types/app';
import { FileWithPath } from '@mantine/dropzone';
import { useGlobalStore } from '@/lib/context/global-store.provider';
const PictureUpdate = ({ image }: { image: string }) => {
  const [value, setValue] = useState<FileWithPath | null>(null);
  const user = useGlobalStore(state => state.user)
    const setUser = useGlobalStore(state => state.setUser)
  const socket = useSocketContext()
  const handleSubmit = async () => {
    if (value) {
      socket.emit('updateProfile', { file: {mimetype:  value.type, buffer: value}, message: 'Updated Profile Picture' }, (res: GlobalUser) => {
        if (user) {
          setValue(null)
          setUser(res);
        }
      })
    }
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
              size={80}
              radius={80}
              mt={-30}
              className={classes.avatar}
            />
          </Indicator>
        </Group>
      </Popover.Target>
      <Popover.Dropdown p={'md'}>
        <FileInput
          label="Choose new picture"
          placeholder="Image"
          size="xs"
          value={value}
          onChange={setValue}
          accept="image/png,image/jpeg,image/webp,image/jpg"
        />
        <Group my={'md'}>
          <Button onClick={handleSubmit}>Save</Button>
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
