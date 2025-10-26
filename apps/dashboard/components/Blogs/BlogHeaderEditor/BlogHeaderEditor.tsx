import React, { useState } from 'react'
import { EditorProps } from '../Richtext/Editor'
import { FileWithPath } from '@mantine/dropzone'
import { Button, Group, Divider, Text, Drawer, FileInput, Input, InputWrapper, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconXboxXFilled } from '@tabler/icons-react';

interface BlogHeaderEditorProps {
    description: string;
    title: string
    setDescription: (description: string) => void;
    setTitle: (title: string) => void;
    setTags: (updatater: (tag: string[]) => string[]) => void;
    tags: string[];
    onSetFeaturedImage: (file: FileWithPath | null) => void
}
const BlogHeaderEditor = (props: BlogHeaderEditorProps) => {
    const { setDescription, tags, setTags, onSetFeaturedImage, setTitle, title, description } = props
    const [opened, { toggle }] = useDisclosure(false)
    const [newTag, setNewTag] = useState('')
    async function handleRemoveTag(tag: string) {
        setTags(prev => prev.filter((tagName) => tagName !== tag))
    }

    async function addTag() {
        if (newTag) {
            setTags((prev) => [...prev, newTag])
        }
    }
    return (
        <div>
            <Button radius="xl" onClick={toggle} color='coco.5' size='lg'>Edit Section</Button>
            <Drawer position='right' opened={opened} onClose={toggle}>
                <Stack gap="xl">
                    <InputWrapper size='lg' label="Featured Image">
                        <FileInput size='lg' onChange={onSetFeaturedImage} />
                    </InputWrapper>
                    <InputWrapper size='lg' label="Title" error={title.split(" ").length < 1 ? 'Title must be more than 1 word' : ''}>
                        <Input size='lg' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper size='lg' label="Article Description" error={description.split(' ').length < 3 ? 'Description must be more than 3 words' : ''}>
                        <Input size='lg' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </InputWrapper>

                    <Text>Tags</Text>
                    <Divider />
                    <Group>
                        {
                            tags.map((tag, idx) => <Button variant='subtle' key={idx}
                                rightSection={<IconXboxXFilled color='red' onClick={() => handleRemoveTag(tag)} />}
                            >{tag}</Button>)
                        }
                    </Group>
                    <Divider />
                    <Input leftSection={<IconPlus size="28" />} size="lg"
                        placeholder='Add tag and press Enter' onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                addTag()
                                setNewTag("")
                            }
                        }} value={newTag} onChange={(e) => setNewTag(e.target.value)} />
                </Stack>
            </Drawer>
        </div>
    )
}

export default BlogHeaderEditor