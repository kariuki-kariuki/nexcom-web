import { Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'
import classes from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}
const SearchBar = ({ value, onChange}: Props) => {
  return (
    <div className={classes.main}>
      <Input classNames={{input: classes.input}} value={value} onChange={(e) => onChange(e.target.value)} placeholder='Search' rightSection={<IconSearch stroke={1.5}/>} size='md'/>
    </div>
  )
}

export default SearchBar