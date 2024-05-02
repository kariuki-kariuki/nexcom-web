import { Pagination } from '@mantine/core'
import React from 'react'

interface Props {
    setPage: (arg: number) => void;
    activePage: number
}
function Demo({setPage, activePage}: Props) {
  return (
    <Pagination total= {10} onChange={setPage} mt="sm"/>
  )
}

export default Demo