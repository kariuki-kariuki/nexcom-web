'use client';
import { ImageInterface } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import { Button, FileInput, Group, Image, LoadingOverlay, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFileSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import SearchedImage from '../SearchedImage/SearchedImage';
import { NODE_ENV } from '@/lib/common/constants';

const SearchByImage = () => {
  const [opened, { toggle }] = useDisclosure(false)
  const [file, setFile] = useState<File | null>(null)
  const [images, setImages] = useState<ImageInterface[] | null>(null)
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async () => {
    if(!file) return;
    if(NODE_ENV !== 'development'){
      notifications.show({
        message: 'Feature Not Available Yet',
        color: 'yellow.8',
      })
      return;
    }
    setLoading(true);
    const formData = new FormData();
  formData.append('file', file)
    const { data, error, loading } = await datasource.post<ImageInterface[]>({formData, path: 'products/image-search', contentType: false })

    if(data && !loading){
      setLoading(false);
      setImages(data);
      setFile(null);
    }

    if(error) {
      notifications.show({
        color: 'red.7',
        title: 'Error',
        message: 'Error',
      })
    }
    setLoading(false);
  }
  return (
    <div>
      <LoadingOverlay  visible={isLoading} />
      <Group>
        <Button leftSection={<IconFileSearch />} color='coco.4' onClick={toggle}>Search By Image</Button>
      </Group>
      <Modal opened={opened} onClose={toggle} centered title="Search By Image">
        {file && <Image src={URL.createObjectURL(file)} width={400} height="auto"/>}
        <Group justify='center' my="md" wrap='nowrap'>
              <FileInput onChange={setFile} flex={1} maw={300} placeholder="Choose file"/>
            <Button color='coco.4' onClick={handleSearch}>Submit</Button>
        </Group>
        <Stack>
          {images && images.map((image) => <SearchedImage image={image}/>)}
        </Stack>
      </Modal>
    </div>
  )
}

export default SearchByImage