import { useState } from 'react';
import { Rating, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function ProductRating() {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const [value, setValue] = useState(5);
  return <Rating value={value} onChange={setValue} size={mobile ? 'xs': 'md'} readOnly />;
}