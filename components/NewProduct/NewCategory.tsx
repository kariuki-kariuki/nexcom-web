import React, { useState } from 'react';
import { Button, Dialog, Group, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Category } from '../../lib/@types/category';
import classes from './NewCategory.module.css'
import { datasource } from '@/lib/common/datasource';

interface Props {
  opened: boolean;
  toggle: () => void;
  setCategories: (updater: (categories: Category[]) => Category[]) => void;
}
function NewCategory({ opened, toggle, setCategories }: Props) {
  const [name, setNewCategory] = useState('');
  async function handleSubmit() {
    if (name) {
      const {data} = await datasource.post<Category>(
        { formData: { name }, path: 'categories'}
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
          placeholder="Bedding"
          style={{ flex: 1 }}
          value={name}
          size='xl'
          classNames={{ input: classes.input }}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={handleSubmit} size='xl' color="coco.3">Submit</Button>
      </Group>
    </Dialog>
  );
}

export default NewCategory;
