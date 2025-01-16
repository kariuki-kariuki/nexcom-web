import { useState } from 'react';
import { Group, Box, Collapse, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import { Category } from '../../../../lib/@types/shop';
import { FilterProps } from './NavbarNested';

interface LinksGroupProps extends FilterProps {
  name: string;
  initiallyOpened?: boolean;
  sub_category?: Category[];
}

export function LinksGroup({
  name,
  initiallyOpened,
  sub_category,
  // filter,
  setFilter
}: LinksGroupProps) {
  const hasCategories = Array.isArray(sub_category);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasCategories ? sub_category : []).map((category) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      key={category.name}
      href={`${category.name}`}
      onClick={(event) => {
        event.preventDefault();
        setFilter(classes.link);
      }}
    >
      {category.name}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box ml="md">{name}</Box>
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
      </UnstyledButton>
      {hasCategories ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
