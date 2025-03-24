import { Button, Drawer, Group, Input, InputWrapper, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'
import React, { useState } from 'react'
import { VideoDropzoneButton } from '../Videos/VideoDropZone/VideoDrop';
import { FileWithPath } from '@mantine/dropzone';
import ReactPlayer from 'react-player'
import classes from './createvideo.module.css';
import { Product } from '@/lib/@types/shop';
import { notifications } from '@mantine/notifications';
import { datasource } from '@/lib/common/datasource';

const CreateVideo = ({ product }: { product: Product }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (files.length < 1 || !description) {
      notifications.show({
        message: 'No file or description',
        color: 'red.8',
        title: 'Error'
      })
      return;
    }
    setIsLoading(true)
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('description', description);
    formData.append('productId', product.id)

    const { data, error, loading } = await datasource.post({ formData, path: 'product-videos', contentType: false })
    if (error) {
      setError(error)
    }

    if (data && !loading) {
      toggle;
      notifications.show({
        title: "Success",
        message: 'Successfuly uploaded a video',
        color: 'teal.7',
      })
      setFiles([])
    }

    setIsLoading(false);
  }

  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      <Button onClick={toggle}>Add Video</Button>
      <Drawer opened={opened} onClose={toggle} title="Create Video">
        {files.length < 1 && <VideoDropzoneButton setFiles={setFiles} />}
        <InputWrapper my="md" error={error} label="Video description">
          <Input value={description} onChange={e => setDescription(e.target.value)} />
        </InputWrapper>
        <div className={classes.video}>
          {files.length > 0 && <ReactPlayer url={URL.createObjectURL(files[0])} loop playing muted controls width={400} />}
        </div>
        <Group justify='center' my="lg" grow>
          <Button onClick={handleSubmit}>Upload</Button>
        </Group>
      </Drawer>
    </div>
  )
}

export default CreateVideo