import { useState } from 'react';
import { Group, Box, Collapse, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import { Category } from '@/lib/@types/shop';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LinksGroupProps {
  name: string;
  initiallyOpened?: boolean;
  sub_category?: Category[];
}

export function LinksGroup({
  name,
  initiallyOpened,
  sub_category,
}: LinksGroupProps) {
  const hasCategories = Array.isArray(sub_category);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const pathname = usePathname()
  const items = (hasCategories ? sub_category : []).map((category) => {
    const link = `/business/product/${category.name.toLowerCase().split(' ').join('-')}`

    return <Link
      className={classes.link}
      color={pathname === link ? 'orange.7' : 'white'}
      key={category.name}
      href={link}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {category.name}
    </Link>
  });
  const link = `/business/product/tags/${name.toLowerCase().split(' ').join('-')}`
  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Link href={link} className={classes.link} data-active={link === pathname || undefined}>
          <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box ml="md" c={link === pathname ? "orange.8" : ''}>{name}</Box>
            </Box>
            {hasCategories && sub_category.length > 1 && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none'
                }}
              />
            )}
          </Group>
        </Link>
      </UnstyledButton>
      {hasCategories ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
