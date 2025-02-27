import useVideoStream from '@/lib/hooks/useVideoStream'
import { Avatar, Button, ButtonGroup, Dialog, Group, Text } from '@mantine/core'
import { time } from 'console'
import { title } from 'process'
import React from 'react'

const ReceiveCall = () => {
  const { call: { caller, isReceivingCall } } = useVideoStream()
  const title=`Incoming call from ${caller?.firstName}`;
  return (
    <div>
      <Dialog opened={isReceivingCall}>
      <Text>{title}</Text>
        <Group justify='space-between'>
          <Group>
            <Avatar src={caller?.photo} />
            <Text>{caller?.firstName}</Text>
          </Group>
          <ButtonGroup>
            <Button color='teal.7'>Accept</Button>
            <Button color='red.7'>Decline</Button>
          </ButtonGroup>
        </Group>
      </Dialog>
    </div>
  )
}

export default ReceiveCall