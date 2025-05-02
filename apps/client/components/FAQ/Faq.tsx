'use client';

import React, { useState } from 'react';
import { IconCirclePlus2, IconPencil, IconTrashX } from '@tabler/icons-react';
import {
  Accordion,
  Button,
  Dialog,
  Group,
  rem,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import classes from './Faq.module.css';
import { datasource } from '@/lib/common/datasource';

export interface IFaq {
  id?: number;
  question: string;
  answer: string;
}

function Faq({ faqsdb }: { faqsdb: IFaq[] | null }) {
  const [faqs, setFaqs] = useState<IFaq[]>(faqsdb ?? []);
  const accords = faqs.map((item, idx) => (
    <FAQ item={item} key={idx} setFaqs={setFaqs} />
  ));
  if (faqs.length < 1) {
    return <Header setFaqs={setFaqs} />;
  }
  return (
    <div>
      <Header setFaqs={setFaqs} />
      <Accordion>{accords}</Accordion>
    </div>
  );
}

interface Ihaeder {
  setFaqs: (updater: (faq: IFaq[]) => IFaq[]) => void;
}

function Header({ setFaqs }: Ihaeder) {
  const [newFaq, setNewFaq] = useState<IFaq>({ question: '', answer: '' });
  const [opened, setOpened] = useState(false);
  const handleSubmit = async () => {
    if (!newFaq.question || !newFaq.answer) {
      notifications.show({
        title: 'Input Error',
        message: 'Question and answer cannot be empty.',
        color: 'red'
      });
      return;
    }

      const {data, error} = await datasource.post<IFaq>({ path: 'faqs', formData: newFaq });
    if (data) {
      setFaqs((prev: IFaq[]) => [...prev, { ...newFaq, id: data.id }]);
      notifications.show({
        title: 'Success',
        message: 'New FAQ created successfully.',
        color: 'green'
      });
      setNewFaq({ question: '', answer: '' });
      setOpened(false);
    }
  };
  return (
    <div>
      <Group py="md">
        <Button
          leftSection={<IconCirclePlus2 />}
          onClick={() => setOpened((prev) => !prev)}
        >
          New FAQ
        </Button>
      </Group>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened((prev) => !prev)}
      >
        <Text size="sm" mb="xs" fw={500}>
          Add new FAQ
        </Text>
        <Stack gap="md">
          <TextInput
            placeholder="Enter question"
            value={newFaq.question}
            onChange={(e) =>
              setNewFaq((prev) => ({ ...prev, question: e.target.value }))
            }
          />
          <TextInput
            placeholder="Enter answer"
            value={newFaq.answer}
            onChange={(e) =>
              setNewFaq((prev) => ({ ...prev, answer: e.target.value }))
            }
          />
        </Stack>
        <Button mt="md" onClick={handleSubmit}>
          Submit
        </Button>
      </Dialog>
    </div>
  );
}

interface IFAQ {
  item: IFaq;
  setFaqs: (updater: (faqs: IFaq[]) => IFaq[]) => void;
}

const FAQ = ({ item, setFaqs }: IFAQ) => {
  const [opened, { toggle }] = useDisclosure();
  const [faq, setFaq] = useState(item);

  const handleDelete = async () => {
    if (!item.id) return; // Ensure item has an ID to delete
    try {
      const {data, error} = await datasource.delete(`faqs/${item.id}`);
      if (data) {
        notifications.show({
          title: 'Success',
          message: `Deleted FAQ ${item.id}`,
          color: 'teal'
        });
        setFaqs((prevFaqs) =>
          prevFaqs.filter((faqItem) => faqItem.id !== item.id)
        );
      } else {
        throw new Error('Failed to delete FAQ');
      }
    } catch (error) {
      notifications.show({
        title: 'Delete Failure',
        message: `Failed to delete FAQ ${item.id}. Please try again.`,
        color: 'red'
      });
    }
  };

  return (
    <Accordion.Item
      className={classes.item}
      value={faq.id?.toString() ?? faq.question}
    >
      <Accordion.Control>
        {faq.id}: {faq.question}
      </Accordion.Control>
      <Accordion.Panel>
        <Text>{faq.answer}</Text>
        <Group py="md">
          <Button
            color="blue"
            onClick={toggle}
            leftSection={
              <IconPencil style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Edit
          </Button>
          <Button
            color="red"
            leftSection={
              <IconTrashX style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Group>
        <Dialog
          opened={opened}
          onClose={toggle}
          withCloseButton
          size="xl"
          position={{ top: '40%', left: '40%' }}
        >
          <Edit faq={faq} setFaq={setFaq} toggle={toggle} />
        </Dialog>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

interface IEdit {
  faq: IFaq;
  setFaq: (faq: IFaq) => void;
  toggle: () => void;
}

function Edit({ faq, setFaq, toggle }: IEdit) {
  const [item, setItem] = useState(faq);

  const handleSubmit = async () => {
    if (!item.question || !item.answer) {
      notifications.show({
        title: 'Update Failure',
        message: 'Question and answer cannot be empty.',
        color: 'red'
      });
      return;
    }

    const {data, error} = await datasource.update(item, `faqs/${faq.id}`);
    if (data) {
      notifications.show({
        title: 'Success',
        message: 'FAQ updated successfully.',
        color: 'green'
      });
      setFaq(item);
      toggle();
    } else {
      notifications.show({
        title: 'Update Failure',
        message: error,
        color: 'red'
      });
    }
  };

  return (
    <>
      <Text size="sm" mb="xs" fw={500}>
        Edit Question {faq.id}
      </Text>
      <Stack gap="md">
        <TextInput
          placeholder="Edit question"
          value={item.question}
          onChange={(e) =>
            setItem((prev) => ({ ...prev, question: e.target.value }))
          }
        />
        <TextInput
          placeholder="Edit answer"
          value={item.answer}
          onChange={(e) =>
            setItem((prev) => ({ ...prev, answer: e.target.value }))
          }
        />
      </Stack>
      <Button mt="md" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default Faq;
