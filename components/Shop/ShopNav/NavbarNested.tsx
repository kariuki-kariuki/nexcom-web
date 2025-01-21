'use client';
import { Group, Code, ScrollArea } from '@mantine/core';
import classes from './NavbarNested.module.css';
import { LinksGroup } from './NavbarLinksGroup';
import MenuDrop from '@/components/Menudrop/MenuDrop';
import { Category } from '@/lib/@types/shop';


export function NavbarNested({ categories }: {categories: Category[]}) {

  const links = categories?.map((item: Category) => (
    <LinksGroup
      {...item}
      key={item.name}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Code fw={700}>Filter</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        
        <div className={classes.linksInner}>
          {links}
          </div>
      </ScrollArea>

      <div className={classes.footer}>
        <MenuDrop />
      </div>
    </nav>
  );
}
