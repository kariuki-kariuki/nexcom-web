import { Avatar, Button, FileInput, Group, Popover } from '@mantine/core';
import { url } from '../../../../data/url';
import { useContext, useState } from 'react';
import classes from './PictureUpdate.module.css';
import { AppContext } from '../../../../context/appContext';
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
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((res) => {
              console.log(res);
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
    <Popover width={300}>
      <Popover.Target>
        <Avatar
          src={value ? URL.createObjectURL(value) : image}
          size={80}
          radius={80}
          mx="auto"
          mt={-30}
          className={classes.avatar}
        />
      </Popover.Target>
      <Popover.Dropdown p={'md'}>
        <FileInput
          label="Choose new picture"
          placeholder="Image"
          size="xs"
          value={value}
          onChange={setValue}
        />
        <Group my={'md'}>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button color="red" onClick={() => setValue(null)}>
            Clear
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PictureUpdate;
