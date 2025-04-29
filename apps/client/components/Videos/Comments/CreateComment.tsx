'use client';
import { ProductComment } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import { Button, Dialog, Divider, Group, Input, InputWrapper, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications';
import { IconTextPlus } from '@tabler/icons-react';
import { time } from 'console';
import { title } from 'process';
import React, { useState } from 'react'

interface IProps { 
  productId: string;
  setComments: (updater: (comments: ProductComment[]) => ProductComment[]) => void;
}

const CreateComment = ({ productId, setComments }: IProps ) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [opened, {toggle}] = useDisclosure(false);

  const handleSubmit = async () => {
    setLoading(true)
    const { data, error, } = await datasource.post<ProductComment>({ formData: { content, productId }, path: 'product-comments' })
    if (error) {
      notifications.show({
        message: error,
        title: 'Login to comment',
        color: 'red'
      })
    }

    if (data) {
      console.log(data)
      setContent('')
      toggle()
      setComments((prev) => ([...prev, data]))
    }
    setLoading(false)
  }
  return (
    <div>
      <IconTextPlus size={28} color='orange' onClick={toggle}/>
      <Dialog opened={opened} withCloseButton onClose={toggle} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Add Comment
        </Text>

        <Group align="flex-end" justify='start'>
            <Input value={content} disabled={loading} placeholder='Keep your comments mindful' onChange={(e) => setContent(e.target.value)} onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit()
              }
            }} />
          <Button onClick={handleSubmit} disabled={loading}>Comment</Button>
        </Group>
      </Dialog>
    </div>
  )
}

export default CreateComment