import { Button, Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'
import { IconPaperclip } from '@tabler/icons-react'
import React from 'react'
import { DropzoneButton } from '../DropzoneButton/DropzoneButton'

interface FilePickerProps {
  files: FileWithPath[]
  setFiles: (files: FileWithPath[]) => void
  actionClick: () => void
}
const FilePicker = ({ files, setFiles, actionClick }: FilePickerProps) => {
  return (
    <Menu >
      <MenuTarget>
           <Button variant="subtle" leftSection={<IconPaperclip />}>Attachment</Button>
      </MenuTarget>
      <MenuDropdown bg="none" bd="none">
        {files.length === 0 && <DropzoneButton setFiles={setFiles} /> }
      </MenuDropdown>
    </Menu>
  )
}

export default FilePicker