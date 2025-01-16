import {
  Avatar,
  Button,
  FileInput,
  Group,
  Indicator,
  Popover
} from '@mantine/core';
import { url } from '../../../src/data/url';
import { useContext, useState } from 'react';
import classes from './PictureUpdate.module.css';
import { AppContext } from '../../../lib/context/appContext';
import { UserContextType } from '../../../../@types/app';
const PictureUpdate = ({ image }: { image: string }) => {
  const token = localStorage.getItem('token');
  const [value, setValue] = useState<File | null>(null);
  const { user, updateUser } = useContext(AppContext) as UserContextType;
  function handleSubmit() {
    if (value) {
      const formdata = new FormData();
      formdata.append('file', value);

      fetch(`${url}/users/avatar`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formdata
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((res) => {
              if (user) {
                user.photo = res.link;
                updateUser(user);
              }
              setValue(null);
            });
          }
        })
        .catch((e) => alert(e));
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
