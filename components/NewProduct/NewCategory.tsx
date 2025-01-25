import React, { useState } from 'react';
import { Button, Dialog, Group, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Category } from '../../lib/@types/category';
import { create } from '../../lib/hooks/useFetchHooks';
import classes from './NewCategory.module.css'

interface Props {
  opened: boolean;
  toggle: () => void;
  setCategories: (updater: (categories: Category[]) => Category[]) => void;
}
function NewCategory({ opened, toggle, setCategories }: Props) {
  const [name, setNewCategory] = useState('');
  async function handleSubmit() {
    if (name) {
      const res = await create<Category>({
        resource: 'categories',
        formData: { name }
      });
      if (res) {
        notifications.show({
          message: `Created ${name}`,
          title: 'Succesful'
        });
        toggle();
        setCategories((prev) => [...prev, res]);
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
    <Dialog
      opened={opened}
      withCloseButton
      onClose={toggle}
      size="lg"
      radius="md"
      position={{ bottom: '20%', left: '30%' }}
      classNames={{root: classes.main}}
    >
      <Text size="sm" mb="xs" fw={500}>
        Create a new category
      </Text>

      <Group align="flex-end">
        <TextInput
          placeholder="Biomas"
          style={{ flex: 1 }}
          value={name}
          size='xl'
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Group>
    </Dialog>
  );
}

export default NewCategory;
