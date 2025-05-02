import { Burger, Drawer, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavbarSearch } from '../../AdminNav/NavbarSearch/NavbarSearch';
import classes from './Header.module.css';
interface IProps {
  active: boolean;
  setActive: (o: boolean) => void;
}
const Header = ({ active, setActive }: IProps) => {

  return (
    <Group
      px={'xl'}
      py={{ base: 'md', sm: 'sm' }}
      justify="start"
      className={classes.header}
    >
      <Text>Analytics</Text>
    </Group>
  );
};

export default Header;
