'use client';

import { useState } from 'react';
import { IconCirclePlus, IconDownload, IconTrashX } from '@tabler/icons-react';
import {
  Button,
  Dialog,
  FileInput,
  Group,
  LoadingOverlay,
  Table,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Resource } from '../../lib/@types/resource';
import { Delete } from '../../lib/hooks/useFetchHooks';
import { createImage } from '../EditProduct/create';
import SimpleRoute from '../SimpleRoute/SimpleRoute';

function Resources({ resourcedb }: { resourcedb: Resource[] | null }) {
  const [resources, setResources] = useState(resourcedb);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [opened, { toggle }] = useDisclosure();

  const handleDelete = async (id: number) => {
    const res = await Delete(`resource-files/${id}`);
    if (res) {
      setResources((prev) =>
        prev ? prev.filter((resourceFile) => resourceFile.id !== id) : prev
      );
    }
  };

  const handleUploadResource = async () => {
    setLoading((prev) => !prev);
    const formData = new FormData();
    if (!file) {
      notifications.show({
        message: 'No File To Upload',
        title: 'Error',
        color: 'red.7'
      });
      setLoading((prev) => !prev);
      return;
    }
    formData.append('file', file);
    formData.append('fileName', file.name);
    const res = await createImage<Resource>({
      resource: 'resource-files',
      formData
    });
    if (typeof res === 'string') {
      setLoading((prevState) => !prevState);
      notifications.show({
        message: res,
        title: 'Error',
        color: 'red'
      });
    } else {
      setLoading((prevState) => !prevState);
      setResources((prev: Resource[] | null) =>
        prev ? [...prev, res] : [res]
      );
      setFile(null);
    }
  };
  const rows = resources?.map((element, idx) => (
    <Table.Tr key={element.name}>
      <Table.Td>{idx + 1}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>
        <Button
          color="scode.8"
          component="a"
          download={element.url}
          target="_blank"
          href={element.url}
          size="xs"
        >
          <IconDownload />
        </Button>
      </Table.Td>
      <Table.Td>
        <IconTrashX color="red" onClick={() => handleDelete(element.id)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <LoadingOverlay
        visible={loading}
        loaderProps={{ type: 'bars', color: 'teal.9' }}
      />
      <SimpleRoute main="Resources" tag="All resources" />
      <Group justify="end" px="md">
        <Button
          onClick={toggle}
          size="sm"
          radius="xl"
          variant="outline"
          leftSection={<IconCirclePlus />}
          color="orange.7"
        >
          Add
        </Button>

        <Dialog
          opened={opened}
          withCloseButton
          onClose={toggle}
          size="lg"
          radius="md"
        >
          <Text size="sm" mb="xs" fw={500}>
            Select File
          </Text>

          <Group align="flex-end">
            <FileInput
              placeholder="select file"
              value={file}
              onChange={setFile}
              style={{ flex: 1 }}
            />
            <Button onClick={handleUploadResource}>Submit</Button>
          </Group>
        </Dialog>
      </Group>
      {resources && resources.length > 0 ? (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Test Download</Table.Th>
              <Table.Th>Delete</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      ) : (
        <Group>
          {' '}
          <Text>No Resources Found</Text>
        </Group>
      )}
    </>
  );
}

export default Resources;
