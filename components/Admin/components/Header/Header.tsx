import { Burger, Drawer, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavbarSearch } from '../../AdminNav/NavbarSearch/NavbarSearch';
import classes from './Header.module.css';
interface IProps {
  active: boolean;
  setActive: (o: boolean) => void;
}
const Header = ({ active, setActive }: IProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Group
      px={'xl'}
      bg={'coco-2'}
      py={{ base: 'md', sm: 'sm' }}
      justify="space-between"
    >
      <Text>Analytics</Text>
      <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
      <Drawer
        hiddenFrom="sm"
        opened={opened}
        onClose={toggle}
        classNames={{ content: classes.color, header: classes.color }}
      >
        <NavbarSearch active={active} setActive={setActive} />
      </Drawer>
    </Group>
  );
};

export default Header;
