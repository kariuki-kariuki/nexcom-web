import SimpleNav from '@/components/SimpleNav/SimpleNav'
import { Flex } from '@mantine/core'
import React from 'react'

const TabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex h="100vh">
      <SimpleNav />
      <div style={{ flex: 1, maxHeight: '100vh', overflowY: 'scroll' }}>
        {children}
      </div>
    </Flex>
  )
}

export default TabsLayout