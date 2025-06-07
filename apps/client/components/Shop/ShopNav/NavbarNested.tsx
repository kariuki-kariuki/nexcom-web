'use client';
import { Group, Code, ScrollArea, Burger, Drawer, Paper } from '@mantine/core';
import classes from './NavbarNested.module.css';
import { LinksGroup } from './NavbarLinksGroup';
import { Category } from '@/lib/@types/shop';
import { useDisclosure } from '@mantine/hooks';
import SimpleHeaderToggle from '@/components/SimpleHeader/SimpleHeaderToggle';
import SearchByImage from '@/components/SearchByImage/SearchByImage';

interface INavbar {
  categories: Category[];
  toggle?: () => void;
  opened?: boolean;
}

function NavbarNestedT({ categories, toggle, opened }: INavbar) {

  const links = categories?.map((item: Category) => (
    <LinksGroup
      {...item}
      key={item.name}
    />
  ));


  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between" h="50">
          <Code fw={700}>Filter</Code>
          <SearchByImage />
          {toggle &&
            <Burger opened={opened} onClick={toggle} />
          }
        </Group>
      </div>

      <ScrollArea className={classes.links}>

        <div className={classes.linksInner}>
          {links}
        </div>
      </ScrollArea>

    </nav>
  );
}


interface IProps {
  categoriesdb: Category[];
}
export function NavbarNested({ categoriesdb }: IProps) {
  const [opened, { toggle }] = useDisclosure()
  const all: Category = { id: 'averyuniqueid123xoxo', name: 'All' }
  const categories = [all, ...categoriesdb]



  return (
    <Paper bg="none" h={'100%'}>
      <Paper visibleFrom='sm' h={'100%'}>
        <NavbarNestedT categories={categories} />
      </Paper>
      <Paper hiddenFrom='sm'>
        <SimpleHeaderToggle categories={categories} />
      </Paper>
      <Drawer onClose={toggle} withCloseButton={false} opened={opened} classNames={{ content: classes.drawer, header: classes.bg, body: classes.drawer }}>
        <NavbarNestedT categories={categories} toggle={toggle} opened={opened} />
      </Drawer>
    </Paper>
  )
}

