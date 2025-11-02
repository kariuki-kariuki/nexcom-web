'use client'
import { BackgroundImage, Button, Card, Container, Flex, Stack, Text, Title } from '@mantine/core'
import React, { useCallback, useState } from 'react'
import Editor from '../Richtext/Editor'
import classes from "./CreateBlog.module.css"
import { FileWithPath } from '@mantine/dropzone'
import { datasource, useGlobalStore } from '@repo/shared-logic'
import BlogHeaderEditor from '../BlogHeaderEditor/BlogHeaderEditor'
import { notifications } from '@mantine/notifications'

const CreateBlog = () => {
  const user = useGlobalStore((state) => state.user)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState(["React", "StartUp"])
  const [content, setContent] = useState("") 
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const date = new Date()
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(!isLoading)
    if (!featuredImage || !tags || !description || !content) {
      notifications.show({
        message: "Please Make Sure All Fields are filled",
        color: 'red.5',
        title: "Empty Field"
      })
      setIsLoading(!isLoading)
      return;
    }

    const formData = new FormData()
    formData.append('file', featuredImage);
    formData.append('title', title)
    formData.append('content', content)
    formData.append('description', description)
    formData.append('tags', tags.join(','));

    const { error, data } = await datasource.post({ formData, path: 'blogs', contentType: false })
    if (error) {
      notifications.show({
        message: error,
        color: 'red.5',
        title: "Empty Field"
      })
    }

    if (data) {
      notifications.show({
        message: "You have succesfully Created A blog",
        color: 'teal.5',
        title: "Succes"
      })
      console.log(data)
    }
    setIsLoading(!isLoading)
  }

  const handleFeaturedImage = useCallback((file: FileWithPath | null) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setImageURL(objectUrl)
      setFeaturedImage(file)
    } else {
      setImageURL(null)
      setFeaturedImage(null)
    }
  }, [])
  return (
    <Container size="xl">
      <Flex w="100%">
        <Card bg="none" flex={1}>
          <BackgroundImage src={imageURL ? imageURL : '/images/blog-holder.png'} h="50vh">
            <Stack align='center' justify='center' className={classes.title}>
              <Title ta="center">{title || "Article Title"}</Title>
              <Text size='lg' ta="center" c="teal.5" variant=''>{description || "Article Description"}</Text>
              <Text c="dimmed" size='xs'>{user?.fullName} @ {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
              <Text c="teal.5" size='xs'>{tags.join(" | ")}</Text>
              <BlogHeaderEditor
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={setDescription}
                tags={tags}
                setTags={setTags}
                onSetFeaturedImage={handleFeaturedImage}
              />
            </Stack>
          </BackgroundImage>
          <Editor content={content} onChange={setContent}/>
        </Card>
        <Card w={{ base: '100%', md: '20%' }} bg="none">
          <Button size='lg' onClick={handleSubmit}>Create Blog</Button>
        </Card>
      </Flex>
    </Container>
  )
}

export default CreateBlog