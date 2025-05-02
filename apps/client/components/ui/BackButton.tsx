'use client'
import { Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  const router = useRouter()
  return (
      <Button variant='subtle' leftSection={<IconArrowLeft />} m="xl" onClick={() => router.back()}>Back</Button>
  )
}

export default BackButton