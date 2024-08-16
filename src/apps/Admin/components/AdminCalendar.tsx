import { Flex } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import React from 'react'

const AdminCalendar = () => {
  return (
    <Flex justify={"center"} align={"center"} p={"md"} bg={"coco.2"} my={"md"} style={{ borderRadius: "10px" }}>
      <Calendar />
    </Flex>
  )
}

export default AdminCalendar