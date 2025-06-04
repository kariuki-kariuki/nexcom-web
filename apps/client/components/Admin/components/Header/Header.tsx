import { Group, Title } from '@mantine/core';
import classes from './Header.module.css';
interface IProps {
  name?: string
}
const Header = ({ name = 'Analytics' }: IProps) => {

  return (
    <Group
      py={{ base: 'md', sm: 'sm' }}
      justify="start"
      className={classes.header}
    >
      <Title>{name}</Title>
    </Group>
  );
};

export default Header;
