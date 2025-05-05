import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  IconDeviceAnalytics
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import { datasource } from '@/lib/common/datasource';
import { useEffect, useState } from 'react';
import { Analytic } from '@/lib/@types/app';
import { Product } from '@/lib/@types/shop';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
  interactions: IconDeviceAnalytics
};

interface IProps {
  products: Product[]
}

export function StatsGrid({products}: IProps) {
  let revenue = 0;
  let prevMonthRev = 0;
  let views = 0;
  let prevMonthViews = 0;
  let totalRevenue = 0;
  
  products.forEach((product) => {
    product.cartItems.forEach((item) => {
      const date = new Date(item.created_at)
      const month = date.getMonth() + 1;
      const currentMonth = new Date().getMonth() + 1;
      totalRevenue += (item.size.price * item.quantity)
      if(month === currentMonth){
        revenue += (item.size.price * item.quantity)
      } else if(month === (currentMonth -1)){
        prevMonthRev += (item.size.price * item.quantity)
      }
    })

    product.analytics?.forEach((analysis) => {
      const date = new Date(analysis.created_at)
      const month = date.getMonth() + 1;
      const currentMonth = new Date().getMonth() + 1;

      if(month === currentMonth){
        views += 1;
      } else if(month === (currentMonth -1)){
        prevMonthViews += 1
      }
    })
  })
  const revDiff = (revenue - prevMonthRev) / (revenue + prevMonthRev) * 100 || 0;
  const viewsDiff = (views - prevMonthViews)/ (views + prevMonthViews) * 100 || 0;
  const data = [
    { title: 'Revenue', icon: 'receipt', value: revenue, diff: revDiff },
    { title: 'Views', icon: 'interactions', value: views, diff: viewsDiff },
    { title: 'Total Revenue', icon: 'discount', value: totalRevenue, diff: 100 },
    { title: 'Coupons usage', icon: 'discount', value: 745, diff: 18 },
  ] as const;
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.title}
        className={classes.stat}
      >
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value > 1000 ? `${stat.value / 1000}K`: stat.value}</Text>
          <Text
            c={stat.diff > 0 ? 'teal' : 'red'}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
 
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
