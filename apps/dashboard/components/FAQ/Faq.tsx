'use client';

import React, { useState, useCallback } from 'react';
import { IconCirclePlusFilled, IconPencil, IconTrashX } from '@tabler/icons-react';
import {
  Accordion,
  Button,
  Dialog,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import classes from './Faq.module.css'; // Assuming Faq.module.css exists, or reuse CreateJob.module.css
import { datasource } from '@repo/shared-logic';

export interface IFaq {
  id?: number;
  question: string;
  answer: string;
}

function Faq({ faqsdb }: { faqsdb: IFaq[] | null }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [faqs, setFaqs] = useState<IFaq[]>(faqsdb ?? []);
  const [isLoading, setIsLoading] = useState(false); // For async loading state

  const accords = faqs.map((item, idx) => (
    <FAQ item={item} key={`${item.id}-${idx}`} setFaqs={setFaqs} />
  ));

  return (
    <Paper
      shadow="lg"
      radius="lg"
      p={{ base: 'sm', sm: 'md', lg: 'xl' }}
      withBorder
      bg="none"
      maw={1000}
      mx="auto"
      mt="sm"
    >
      <Header setFaqs={setFaqs} />
      {isLoading ? (
        <Flex align="center" justify="center" direction="column" gap="md" mih={300}>
          <Loader size="lg" color="teal" />
          <Text c="dimmed" size="lg" ta="center">
            Loading FAQs...
          </Text>
        </Flex>
      ) : faqs.length > 0 ? (
        <Accordion
          variant="separated"
          radius="md"
          transitionDuration={300}
        >
          {accords}
        </Accordion>
      ) : (
        <Flex align="center" justify="center" direction="column" gap="md" mih={300}>
          <Text c="dimmed" size="lg" ta="center">
            No FAQs available.
          </Text>
          <Button
            variant="light"
            color="teal"
            size="md"
            radius="xl"
            // onClick={() => document.querySelector('button[aria-label="Add new FAQ"]')?.click()}
          >
            Create Your First FAQ
          </Button>
        </Flex>
      )}
    </Paper>
  );
}

interface IHeader {
  setFaqs: (updater: (faq: IFaq[]) => IFaq[]) => void;
}

function Header({ setFaqs }: IHeader) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [newFaq, setNewFaq] = useState<IFaq>({ question: '', answer: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!newFaq.question.trim()) newErrors.question = 'Question is required';
    if (!newFaq.answer.trim()) newErrors.answer = 'Answer is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [newFaq]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please fill in all required fields',
        color: 'red',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await datasource.post<IFaq>({ path: 'faqs', formData: newFaq });
      if (error || !data) {
        throw new Error('Failed to create FAQ');
      }
      setFaqs((prev) => [...prev, { ...newFaq, id: data.id }]);
      notifications.show({
        title: 'Success',
        message: 'New FAQ created successfully',
        color: 'teal',
      });
      setNewFaq({ question: '', answer: '' });
      setErrors({});
      close();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to create FAQ. Please try again.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setNewFaq({ question: '', answer: '' });
    setErrors({});
    notifications.show({
      title: 'Form Reset',
      message: 'Form has been reset',
      color: 'blue',
    });
  };

  return (
    <Group justify="space-between" mb="lg">
      <Text fw={600} size="lg">
        FAQs
      </Text>
      <Button
        leftSection={<IconCirclePlusFilled size={20} />}
        variant="filled"
        color="teal"
        size={mobile ? 'sm' : 'md'}
        radius="xl"
        onClick={toggle}
        aria-label="Add new FAQ"
      >
        New FAQ
      </Button>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size={mobile ? '100%' : 'lg'}
        radius="md"
        position={{ top: mobile ? 'auto' : '20%', left: mobile ? 'auto' : '50%' }}
        style={{ transform: mobile ? 'none' : 'translate(-50%, -20%)' }}
      >
        <Text size="sm" mb="md" fw={600}>
          Add New FAQ
        </Text>
        <Stack gap="md">
          <TextInput
            label="Question"
            placeholder="Enter question"
            value={newFaq.question}
            onChange={(e) => setNewFaq((prev) => ({ ...prev, question: e.target.value }))}
            error={errors.question}
            classNames={{ input: classes.input }}
            variant="filled"
            size="lg"
            required
          />
          <Textarea
            label="Answer"
            placeholder="Enter answer"
            value={newFaq.answer}
            onChange={(e) => setNewFaq((prev) => ({ ...prev, answer: e.target.value }))}
            error={errors.answer}
            classNames={{ input: classes.input }}
            variant="filled"
            size="lg"
            rows={4}
            required
          />
        </Stack>
        <Group justify="space-between" mt="md">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            leftSection={isSubmitting && <Loader size="sm" />}
            color="coco.5"
            size="md"
            radius="md"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            color="gray"
            size="md"
            radius="md"
          >
            Reset
          </Button>
        </Group>
      </Dialog>
    </Group>
  );
}

interface IFAQ {
  item: IFaq;
  setFaqs: (updater: (faqs: IFaq[]) => IFaq[]) => void;
}

const FAQ = ({ item, setFaqs }: IFAQ) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [opened, { toggle, close }] = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!item.id) {
      notifications.show({
        title: 'Error',
        message: 'Cannot delete FAQ without an ID',
        color: 'red',
      });
      return;
    }

    setIsDeleting(true);
    try {
      const { data, error } = await datasource.delete(`faqs/${item.id}`);
      if (error || !data) {
        throw new Error('Failed to delete FAQ');
      }
      setFaqs((prevFaqs) => prevFaqs.filter((faqItem) => faqItem.id !== item.id));
      notifications.show({
        title: 'Success',
        message: `FAQ "${item.question}" deleted successfully`,
        color: 'teal',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to delete FAQ. Please try again.`,
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Accordion.Item
      className={classes.item}
      value={item.id?.toString() ?? item.question}
    >
      <Accordion.Control fw={600} c="teal.6">
        <Flex align="center" gap="xs">
          <Text size={mobile ? 'sm' : 'md'}>{item.question}</Text>
          {item.id && (
            <Text size="xs" c="dimmed">
              (ID: {item.id})
            </Text>
          )}
        </Flex>
      </Accordion.Control>
      <Accordion.Panel>
        <Flex direction="column" gap="md">
          <Text size={mobile ? 'sm' : 'md'} c="dimmed">
            {item.answer || 'No answer provided.'}
          </Text>
          <Group gap="xs">
            <Button
              color="coco.5"
              variant="light"
              size={mobile ? 'xs' : 'sm'}
              radius="md"
              onClick={toggle}
              leftSection={<IconPencil size={16} />}
            >
              Edit
            </Button>
            <Button
              color="red"
              variant="light"
              size={mobile ? 'xs' : 'sm'}
              radius="md"
              onClick={handleDelete}
              disabled={isDeleting}
              leftSection={isDeleting ? <Loader size="sm" /> : <IconTrashX size={16} />}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </Group>
        </Flex>
        <Dialog
          opened={opened}
          onClose={close}
          withCloseButton
          size={mobile ? '100%' : 'lg'}
          radius="md"
          position={{ top: mobile ? 'auto' : '20%', left: mobile ? 'auto' : '50%' }}
          style={{ transform: mobile ? 'none' : 'translate(-50%, -20%)' }}
        >
          <Edit faq={item} setFaqs={setFaqs} toggle={close} />
        </Dialog>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

interface IEdit {
  faq: IFaq;
  setFaqs: (updater: (faqs: IFaq[]) => IFaq[]) => void;
  toggle: () => void;
}

function Edit({ faq, setFaqs, toggle }: IEdit) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [item, setItem] = useState(faq);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!item.question.trim()) newErrors.question = 'Question is required';
    if (!item.answer.trim()) newErrors.answer = 'Answer is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [item]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please fill in all required fields',
        color: 'red',
      });
      return;
    }

    if (!item.id) {
      notifications.show({
        title: 'Error',
        message: 'Cannot update FAQ without an ID',
        color: 'red',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await datasource.update(item, `faqs/${item.id}`);
      if (error || !data) {
        throw new Error('Failed to update FAQ');
      }
      setFaqs((prev) =>
        prev.map((f) => (f.id === item.id ? { ...item } : f))
      );
      notifications.show({
        title: 'Success',
        message: 'FAQ updated successfully',
        color: 'teal',
      });
      toggle();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update FAQ. Please try again.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setItem(faq);
    setErrors({});
    notifications.show({
      title: 'Form Reset',
      message: 'Form has been reset',
      color: 'blue',
    });
  };

  return (
    <Stack gap="md">
      <Text size="sm" fw={600}>
        Edit FAQ {faq.id}
      </Text>
      <TextInput
        label="Question"
        placeholder="Edit question"
        value={item.question}
        onChange={(e) => setItem((prev) => ({ ...prev, question: e.target.value }))}
        error={errors.question}
        classNames={{ input: classes.input }}
        variant="filled"
        size="lg"
        required
      />
      <Textarea
        label="Answer"
        placeholder="Edit answer"
        value={item.answer}
        onChange={(e) => setItem((prev) => ({ ...prev, answer: e.target.value }))}
        error={errors.answer}
        classNames={{ input: classes.input }}
        variant="filled"
        size="lg"
        rows={4}
        required
      />
      <Group justify="space-between" mt="md">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          leftSection={isSubmitting && <Loader size="sm" />}
          color="coco.5"
          size="md"
          radius="md"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          color="gray"
          size="md"
          radius="md"
        >
          Reset
        </Button>
      </Group>
    </Stack>
  );
}

export default Faq;