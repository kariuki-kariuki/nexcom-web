import {
  Button,
  Group,
  Input,
  InputWrapper,
  Popover,
  Text
} from '@mantine/core';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import classes from './CreateShop.module.css';
import { useGlobalContext } from '../../lib/context/appContext';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import PostSrr from '@/lib/common/post';
import ShopSsr from './ShopSrr';
const CreateShop = () => {
  const { user, setUser } = useGlobalContext();
  const [state, formAction] = useFormState(ShopSsr, { error: '', name: '', id: 0 })
  if (state.name && state.id && user) {
    user.shop = { name: state.name, id: state.id };
    setUser(user);
    redirect('/dashboard');
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
        <form action={(e) => {formAction(e); }}>
        <Text ta={'center'} c={'dimmed'}>
          New Shop
        </Text>
        <InputWrapper label="Shop Name" error={state.error}>
          <Input
            type="text"
            name='name'
          />
        </InputWrapper>
        <Group justify="center" py={'md'}>
          <Button w={'100%'} type='submit' value="submit" color={'purple'}>
            Submit
          </Button>
        </Group>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CreateShop;
