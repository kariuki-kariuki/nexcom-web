import { ProductStatus } from '@/lib/@types/shop'
import { Group, Button } from '@mantine/core'
import { Icon123, IconArchiveOff, IconCheck, IconDragDrop, IconNotes, IconNotesOff, IconX } from '@tabler/icons-react'
import React from 'react'

const StatusButton = ({status}: {status: ProductStatus}) => {
  return (
    <Group justify='center'>
          <Button
            variant='light'
            color={
              status === ProductStatus.PUBLISHED
                ? 'teal.9'
                : status === ProductStatus.DRAFT
                  ? 'orange.9'
                  : 'red.9'
            }
            radius="lg"
            leftSection={status === ProductStatus.PUBLISHED ? <IconCheck size={20} /> : status === ProductStatus.DRAFT ? <IconNotes /> : <IconArchiveOff size={20} />}
          >
            {status}
          </Button>
        </Group>
  )
}

export default StatusButton