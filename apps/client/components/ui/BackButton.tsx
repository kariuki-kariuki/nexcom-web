'use client'
import { Affix, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  const router = useRouter()
  return (
    <Affix position={{ top: 80 }} p="md">
      <Button variant='subtle' leftSection={<IconArrowLeft />} onClick={() => router.back()}>Back</Button>
    </Affix>
  )
}

export default BackButton