import { Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'
import classes from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={classes.main}>
      <Input classNames={{input: classes.input}} placeholder='Search' rightSection={<IconSearch stroke={1.5}/>} size='md'/>
    </div>
  )
}

export default SearchBar