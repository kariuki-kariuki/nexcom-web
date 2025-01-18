import {
  Autocomplete,
  Group,
  Burger,
  rem,
  Avatar,
  Flex,
  Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './HeaderSearch.module.css';
import { useRouter } from 'next/navigation';
import MenuDrop from '../Menudrop/MenuDrop';

interface Link {
  link: string;
  label: string;
}
interface ILink {
  links: Link[];
}
export function HeaderSearch({ links }: ILink) {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useRouter();
  const items = links.map((link) => (
    <div
      key={link.label}
      className={classes.link}
      onClick={() => navigate.push(link.link)}
    >
      {link.label}
    </div>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Avatar src={'/logos/logo.png'} />
        </Group>
        <Drawer
          opened={opened}
          onClose={toggle}
          title="Navigation"
          classNames={{
            header: classes.bg,
            body: classes.body,
            content: classes.content,
          }}
        >
          <Flex direction={'column'} h="100%" justify={'space-between'}>
            <Flex direction={'column'} gap={'md'}>
              {items}
            </Flex>
            <MenuDrop />
          </Flex>
        </Drawer>

        <Group visibleFrom="sm">
          <Group ml={50} gap={5} className={classes.links}>
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            visibleFrom="md"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            data={[
              'React',
              'Angular',
              'Vue',
              'Next.js',
              'Riot.js',
              'Svelte',
              'Blitz.js',
            ]}
          />
        </Group>
      </div>
    </header>
  );
}