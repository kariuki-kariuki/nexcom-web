import { useState } from 'react';
import { Rating } from '@mantine/core';

export default function ProductRating() {
  const [value, setValue] = useState(5);
  return <Rating value={value} onChange={setValue} readOnly />;
}