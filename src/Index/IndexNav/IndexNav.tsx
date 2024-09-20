import { Group, Burger, Avatar, Drawer, Flex, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './IndexNav.module.css';
import logo from '../../assets/mklogo.png';
import { useNavigate } from 'react-router-dom';
import MenuDrop from '../MenuDrop';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { UserContextType } from '../../@types/app';

interface Link {
  link: string;
  label: string;
}
interface ILink {
  links: Link[];
}
export function IndexNav({ links }: ILink) {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useContext(AppContext) as UserContextType;
  const navigate = useNavigate();
  const items = links.map((link) => (
    <div
      key={link.label}
      className={classes.link}
      onClick={() => navigate(link.link)}
    >
      {link.label}
    </div>
  ));

  return (
    <Box className={classes.header} py={'md'} mb={'sm'}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Avatar src={logo} />
        </Group>

        <Group align="center" justify="center" visibleFrom="sm">
          <Group ml={50} gap={5} className={classes.links}>
            {items}
          </Group>
          <MenuDrop />
        </Group>
        <Drawer
          title="Navigation"
          opened={opened}
          onClose={toggle}
          classNames={{
            header: classes.bg,
            body: classes.body,
            content: classes.content,
          }}
        >
          <Flex direction={'column'} justify={'space-between'} h={'100%'}>
            <Flex direction={'column'} gap={'lg'} py={'md'}>
              {items}
              {user?.shop ? (
                <div
                  className={classes.link}
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </div>
              ) : (
                ''
              )}
            </Flex>
            <MenuDrop />
          </Flex>
        </Drawer>
      </div>
    </Box>
  );
}
