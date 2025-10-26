'use client'
import { BackgroundImage, Button, Container, Stack, Text, Title } from '@mantine/core'
import React, { useCallback, useState } from 'react'
import Editor from '../Richtext/Editor'
import classes from "./CreateBlog.module.css"
import { FileWithPath } from '@mantine/dropzone'
import { useGlobalStore } from '@repo/shared-logic'
import BlogHeaderEditor from '../BlogHeaderEditor/BlogHeaderEditor'

const CreateBlog = () => {
    const user = useGlobalStore((state) => state.user)
    const [title, setTitle] = useState("Article Title")
    const [description, setDescription] = useState("Article Description")
    const [tags, setTags] = useState(["React", "StartUp"])
    const content = '<h2>You are old enough to have a story</h2><p>Start telling your now</p>';
    const [featuredImage, setFeaturedImage] = useState<FileWithPath | null>(null)
    const date = new Date()
     const [imageURL, setImageURL] = useState<string | null>(null)

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
            <BackgroundImage src={imageURL ? imageURL : '/images/blog-holder.png'} h="50vh">
                <Stack align='center' justify='center' className={classes.title}>
                    <Title>{title}</Title>
                    <Text size='lg' c="teal.5" variant=''>{description}</Text>
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
            <Editor content={content} />
        </Container>
    )
}

export default CreateBlog