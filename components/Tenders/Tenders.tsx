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
import { TenderInterface } from '../../lib/@types/tender';
import { Delete } from '../../lib/hooks/useFetchHooks';
import { createImage } from '../EditProduct/create';
import SimpleRoute from '../SimpleRoute/SimpleRoute';

function Tenders({ tenderdb }: { tenderdb: TenderInterface[] | null }) {
  const [tenders, setTenders] = useState(tenderdb);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [opened, { toggle }] = useDisclosure();

  const handleDelete = async (id: number) => {
    const res = await Delete(`tender-files/${id}`);
    if (res) {
      setTenders((prev) =>
        prev ? prev.filter((tenderFile) => tenderFile.id !== id) : prev
      );
    }
  };

  const handleUploadtender = async () => {
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
    const res = await createImage<TenderInterface>({
      resource: 'tenders',
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
      setTenders((prev: TenderInterface[] | null) =>
        prev ? [...prev, res] : [res]
      );
      setFile(null);
    }
  };
  const rows = tenders?.map((element, idx) => (
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
      <SimpleRoute main="tenders" tag="All tenders" />
      <Group justify="end" px="md">
        <Button
          onClick={toggle}
          radius="xl"
          variant="outline"
          size="sm"
          leftSection={<IconCirclePlus size={20} />}
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
            <Button onClick={handleUploadtender}>Submit</Button>
          </Group>
        </Dialog>
      </Group>
      {tenders && tenders.length > 0 ? (
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
          <Text>No tenders Found</Text>
        </Group>
      )}
    </>
  );
}

export default Tenders;
