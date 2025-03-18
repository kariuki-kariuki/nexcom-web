'use client'
import { Input, InputWrapper } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react'


interface IProps {
  slug: string;
}
const SearchButton = ({ slug }: IProps) => {
  const [value, setValue] = useState(slug)

  return (
    <InputWrapper pb="md">
      <Input size='lg' placeholder='skinny' radius="xl" value={value} onChange={(e) => setValue(e.target.value)} leftSection={<IconSearch size={20} />} />
    </InputWrapper>
  )
}

export default SearchButton