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
import { datasource } from '@/lib/common/datasource';
import { notifications } from '@mantine/notifications';
const PictureUpdate = ({ image }: { image: string }) => {
  const [value, setValue] = useState<File | null>(null);
  const { user, setUser } = useGlobalContext()
  const handleSubmit = async () => {
    if (value) {
      const formdata = new FormData();
      formdata.append('file', value);

      const { data, error } = await datasource.update<{ link: string }>(formdata, 'users/avatar', false);
      if (error) {
        notifications.show({
          title: 'Error',
          color: 'red.7',
          message: error,
        })
        return;
      }
      if (error) {
       
      }

      if (data && user) {
        user.photo = data.link;
        notifications.show({
          title: 'Success',
          color: 'teal.7',
          message: 'Updated profile succefully',
        })
        setUser(user);
        setValue(null);

      }
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
              src={value ? URL.createObjectURL(value) : image}
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
