import {
  Button,
  Group,
  Input,
  InputWrapper,
  Popover,
  Text
} from '@mantine/core';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import classes from './CreateShop.module.css';
import { AppContext } from '../../../../context/appContext';
import { UserContextType } from '../../../../@types/app';
import { url } from '../../../../data/url';
import { redirect } from 'next/navigation';
const CreateShop = () => {
  const [name, setName] = useState('');
  const [erros, setErrors] = useState(null);
  const { user, updateUser } = useContext(AppContext) as UserContextType;

  function handleSubmit() {
    setErrors(null);
    const token = localStorage.getItem('token');
    if (name) {
      fetch(`${url}/auth/register-shops`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      }).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            if (user) {
              user.shop = { name: res.name, id: res.id };
              localStorage.setItem('token', res.token);
              updateUser(user);
              redirect('/home');
            }
          });
        } else {
          res.json().then((r) => {
            setErrors(r.message);
          });
        }
      });
    }
  }
  return (
    <Popover withArrow>
      <Popover.Target>
        <Group justify="center" p={'md'}>
          <Button
            leftSection={<IconCirclePlusFilled size={18} color="teal" />}
            w={'fit-content'}
            variant="outline"
            color="purple"
          >
            Create Shop
          </Button>
        </Group>
      </Popover.Target>
      <Popover.Dropdown className={classes.main}>
        <Text ta={'center'} c={'dimmed'}>
          New Shop
        </Text>
        <InputWrapper label="Shop Name" error={erros}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        <Group justify="center" py={'md'}>
          <Button w={'100%'} onClick={handleSubmit} color={'purple'}>
            Submit
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CreateShop;
