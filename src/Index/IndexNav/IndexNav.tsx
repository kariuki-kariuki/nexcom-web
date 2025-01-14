import { Group, Burger, Avatar, Drawer, Flex, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './IndexNav.module.css';
import logo from '../../assets/mklogo.png';
import MenuDrop from '../MenuDrop';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { UserContextType } from '../../@types/app';
import Link from 'next/link';

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
  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <Box className={classes.header} py={'md'} mb={'sm'}>
      <div className={classes.inner}>
        <Group justify="space-between" w={{ base: '100%', sm: 'auto' }}>
          <Avatar src={logo} />
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </Group>

        <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
          {items}
        </Group>
        <Group align="center" justify="space-between" visibleFrom="sm">
          <MenuDrop />
        </Group>
        <Drawer
          title="Navigation"
          opened={opened}
          onClose={toggle}
          classNames={{
            header: classes.bg,
            body: classes.body,
            content: classes.content
          }}
        >
          <Flex direction={'column'} justify={'space-between'} h={'100%'}>
            <Flex direction={'column'} gap={'lg'} py={'md'}>
              {items}
              {user?.shop ? (
                <Link className={classes.link} href="/admin">
                  Admin
                </Link>
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
