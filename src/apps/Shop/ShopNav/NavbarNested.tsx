import { Group, Code, ScrollArea } from '@mantine/core';
import classes from './NavbarNested.module.css';
import { LinksGroup } from './NavbarLinksGroup';
import MenuDrop from '../../../Index/MenuDrop';
import { useFetch } from '../../../hooks/useFetchHooks';
import { Category } from '../../../@types/shop';
export interface FilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function NavbarNested({ filter, setFilter }: FilterProps) {
  const { response, isLoading } = useFetch<Category[]>('categories');
  if (isLoading) return <div>Loading</div>;
  const links = response?.map((item: Category) => (
    <LinksGroup
      {...item}
      key={item.name}
      filter={filter}
      setFilter={setFilter}
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
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <MenuDrop />
      </div>
    </nav>
  );
}
