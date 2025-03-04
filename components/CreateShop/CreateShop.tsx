import {
  Box,
  Button,
  Dialog,
  Group,
  Input,
  InputWrapper,
  LoadingOverlay,
  Text
} from '@mantine/core';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { useGlobalContext } from '../../lib/context/appContext';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { datasource } from '@/lib/common/datasource';
import setToken from '@/utils/setToken';
const CreateShop = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [name, setShopName] = useState('');
  const [error, setError] = useState('');
  const [opened, { toggle }] = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleCreateShop = async () => {
    if (!name) {
      setError('Name cannot be empty');
      return;
    }
    setLoading(prev => !prev)
    const { data, error, loading } = await datasource.post<{ token: string }>({ formData: { name }, path: 'auth/register-shops' })
    if (error) {
      setError(error);
    }
    if (data && !loading) {
      setToken(data.token)
      setIsLoggedIn(false);
    }
    setLoading(prev => !prev)

  }

  return (
    <Box>
      <LoadingOverlay visible={loading} />
      <Group justify="center" p={'md'}>
        <Button
          leftSection={<IconCirclePlusFilled size={18} color="teal" />}
          w={'fit-content'}
          variant="outline"
          color="coco.4"
          onClick={toggle}
        >
          Create Shop
        </Button>
      </Group>
      <Dialog opened={opened} onClose={toggle} position={{top: '40%', left: '40%'}} withCloseButton withBorder>
        <Text c={'dimmed'}>
          Creat New Shop
        </Text>
        
        <Group justify="center" py={'md'} align='flex-end'>
        <InputWrapper error={error}
            style={{ flex: 1 }}
        >
          <Input
            type="text"
            name='name'
            value={name}
            placeholder='Choose name'
            onChange={(event) => setShopName(event.target.value)}
          />
        </InputWrapper>
          <Button type='submit' value="submit" color={'coco.4'} onClick={handleCreateShop}>
            Submit
          </Button>
        </Group>
      </Dialog>
    </Box>
  );
};

export default CreateShop;
