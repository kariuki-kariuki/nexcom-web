'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@mantine/core';
import classes from './Bar.module.css';

const data = [
  { link: '/settings/faq', label: 'Faq' },
  { link: '/settings/gallery', label: 'Gallery' }
];
function Bar() {
  const [active, setActive] = useState('Faq');
  const router = useRouter();
  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link);
      }}
    >
      <span>{item.label}</span>
    </Link>
  ));
  return (
    <Card className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </Card>
  );
}

export default Bar;
