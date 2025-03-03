'use client';
import { ProductImage } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import { Button, ButtonGroup, FileButton, FileInput, Group, Image, LoadingOverlay, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFileSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import SearchedImage from '../SearchedImage/SearchedImage';

const SearchByImage = () => {
  const [opened, { toggle }] = useDisclosure(false)
  const [file, setFile] = useState<File | null>(null)
  const [images, setImages] = useState<ProductImage[] | null>(null)
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async () => {
    if(!file) return;
    setLoading(true);
    const formData = new FormData();
  formData.append('file', file)
    const { data, error, loading } = await datasource.post<ProductImage[]>({formData, path: 'products/image-search', contentType: false })

    if(data && !loading){
      setLoading(false);
      setImages(data);
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
        <Button leftSection={<IconFileSearch />} color='coco.3' onClick={toggle}>Search By Image</Button>
      </Group>
      <Modal opened={opened} onClose={toggle} centered>
        {file && <Image src={URL.createObjectURL(file)} width={400} height="auto"/>}
        <Group justify='center' my="md" wrap='nowrap'>
              <FileInput onChange={setFile} flex={1} maw={300}/>
            <Button color='coco.3' onClick={handleSearch}>Submit</Button>
        </Group>
        <Stack>
          {images && images.map((image) => <SearchedImage image={image}/>)}
        </Stack>
      </Modal>
    </div>
  )
}

export default SearchByImage