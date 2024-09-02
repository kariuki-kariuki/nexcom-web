import { Autocomplete, Group, Burger, rem, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './HeaderSearch.module.css';
import logo from '../../../assets/mklogo.png';
import { useNavigate } from 'react-router-dom';
const links = [
  { link: '/', label: 'Home' },
  { link: '/chat', label: 'Chat' },
  { link: '/shop', label: 'Shop' },
  { link: '/admin', label: 'Admin' },
  { link: '/cart', label: 'Cart' },
];

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);
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
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Avatar src={logo} />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
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
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}
