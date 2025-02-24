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
import { useGlobalContext } from '../../../lib/context/appContext';
import { useSocketContext } from '@/lib/hooks/useSocket';
const PictureUpdate = ({ image }: { image: string }) => {
  const [value, setValue] = useState<File | null>(null);
  const { user, setUser } = useGlobalContext()
  const socket = useSocketContext()
  const handleSubmit = async () => {
    if (value) {
      socket.emit('updateProfile', { mimetype: value.type, buffer: value }, (res: { link: string }) => {
        if (user) {
          setValue(null)
          user.photo = res.link;
          setUser(user);
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
              src={value ? URL.createObjectURL(value) : user?.photo}
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
