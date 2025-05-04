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

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin
};



export function StatsGrid() {
  const [analytics, setAnalytics] = useState<Analytic[]>([])
  useEffect(() => {
    const getAnalytics = async () => {
      const { data } = await datasource.get<Analytic[]>('analytics');
      if (data) {
        setAnalytics(data);
        console.log(data);
      }
    }
    getAnalytics();
    return () => {
    }
  }, [])
  const data = [
    { title: 'Revenue', icon: 'receipt', value: '13,456', diff: 34 },
    { title: 'Profit', icon: 'coin', value: '4,145', diff: -13 },
    { title: 'Coupons usage', icon: 'discount', value: '745', diff: 18 },
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
          <Text className={classes.value}>{stat.value}</Text>
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
  const color = analytics.length > 1
    ? (analytics[1].count - analytics[0].count > 0 ? 'teal' : 'red')
    : (analytics.length === 1 && analytics[0].count > 0 ? 'teal' : 'red');
  const percentege = analytics.length > 1 ? analytics[1].count - analytics[0].count / analytics[0].count + analytics[1].count * 100 : 100;
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}
        <Paper
          withBorder
          p="md"
          radius="md"
          className={classes.stat}
        >
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              Interactions
            </Text>
            <IconDeviceAnalytics className={classes.icon} size="1.4rem" stroke={1.5} />
          </Group>

          <Group align="flex-end" gap="xs" mt={25}>
            <Text className={classes.value}>{analytics.length > 0 ? analytics[0].count : 0}</Text>
            <Text
              c={color}
              fz="sm"
              fw={500}
              className={classes.diff}
            >
              <span>{percentege}%</span>
              {analytics && analytics[0]?.count > 0 ? <IconArrowUpRight size={'1rem'} stroke={1.5} /> : <IconArrowDownRight size={'1rem'} stroke={1.5} />}
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Compared to previous month
          </Text>
        </Paper>
      </SimpleGrid>
    </div>
  );
}
