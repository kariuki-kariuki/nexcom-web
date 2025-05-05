'use client';
import { Group, Code, ScrollArea, Box, Modal, Burger, Drawer } from '@mantine/core';
import classes from './NavbarNested.module.css';
import { LinksGroup } from './NavbarLinksGroup';
import MenuDrop from '@/components/Menudrop/MenuDrop';
import { Category } from '@/lib/@types/shop';
import { useDisclosure } from '@mantine/hooks';
import { datasource } from '@/lib/common/datasource';
import { useState, useEffect } from 'react';
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



export function NavbarNested() {
  const [opened, { toggle }] = useDisclosure()
  const all: Category = { id: 'averyuniqueid123xoxo', name: 'All' }
  const [categories, setCategories] = useState<Category[]>([all])

  useEffect(() => {
    const getCategories = async () => {

      const { data, loading } = await datasource.get<Category[]>('categories');

      if (!loading && data) {
        setCategories(prev => ([...prev, ...data]))
      }
    }
    getCategories()

  }, [])

  return (
    <Box h={'100%'}>
      <Box visibleFrom='sm' h={'100%'}>
        <NavbarNestedT categories={categories} />
      </Box>
      <Box hiddenFrom='sm'>
        <SimpleHeaderToggle categories={categories} />
      </Box>
      <Drawer onClose={toggle} withCloseButton={false} opened={opened} classNames={{ content: classes.drawer, header: classes.bg, body: classes.drawer }}>
        <NavbarNestedT categories={categories} toggle={toggle} opened={opened} />
      </Drawer>
    </Box>
  )
}

