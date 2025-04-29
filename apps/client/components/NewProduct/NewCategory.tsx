import React, { useState } from 'react';
import { Button, Dialog, Group, Text, TextInput, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Category } from '../../lib/@types/category';
import classes from './NewCategory.module.css'
import { datasource } from '@/lib/common/datasource';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

interface Props {
  setCategories: (updater: (categories: Category[]) => Category[]) => void;
}
function NewCategory({ setCategories }: Props) {
  const [name, setNewCategory] = useState('');
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  async function handleSubmit() {
    if (name) {
      const { data } = await datasource.post<Category>(
        { formData: { name }, path: 'categories' }
      );
      if (data) {
        notifications.show({
          message: `Created ${name}`,
          title: 'Succesful'
        });
        toggle();
        setCategories((prev) => [...prev, data]);
        return;
      }
      notifications.show({
        message: `Failed to create category ${name}`,
        title: 'Failed',
        color: 'red.9'
      });
    }
  }
  return (
    <div>
      <Button fullWidth color='coco.4'
        onClick={toggle} style={{ width: '100%' }}>
        Add Category
      </Button>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={toggle}
        size="lg"
        radius="md"
        position={{ bottom: '20%', left: '30%' }}
        classNames={{ root: classes.main }}
      >
        <Text size="sm" mb="xs" fw={500}>
          Create a new category
        </Text>

        <Group align="flex-end">
          <TextInput
            placeholder="Banking"
            style={{ flex: 1 }}
            value={name}
            classNames={{ input: classes.input }}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={handleSubmit} color="coco.4">Add</Button>
        </Group>
      </Dialog>
    </div>

  );
}

export default NewCategory;
