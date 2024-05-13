import { Input } from '@mantine/core'
import FilterBy from './FilterBy'

function Headers() {
  return (
    <div className='flex justify-center p-5'>
        <FilterBy/>
        <Input placeholder='search'/>
    </div>
  )
}

export default Headers