import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  IconDeviceAnalytics,
  IconTrendingUp3,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import { Product } from '@/lib/@types/shop';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
  interactions: IconDeviceAnalytics,
  growth: IconTrendingUp3
};

interface IProps {
  products: Product[];
}

export function StatsGrid({ products }: IProps) {
  // Calculate metrics
  const calculateMetrics = () => {
    let revenue = 0;
    let prevMonthRev = 0;
    let views = 0;
    let prevMonthViews = 0;
    let totalRevenue = 0;
    let totalViews = 0;

    products.forEach((product) => {
        totalViews =+ (product?.analytics?.length || 0);

      product.cartItems.forEach((item) => {
        const date = new Date(item.created_at);
        const month = date.getMonth() + 1;
        const currentMonth = new Date().getMonth() + 1;
        totalRevenue += (item.size.price * item.quantity);
        if (month === currentMonth) {
          revenue += (item.size.price * item.quantity);
        } else if (month === (currentMonth - 1)) {
          prevMonthRev += (item.size.price * item.quantity);
        }
      });

      product.analytics?.forEach((analysis) => {
        const date = new Date(analysis.created_at);
        const month = date.getMonth() + 1;
        const currentMonth = new Date().getMonth() + 1;

        if (month === currentMonth) {
          views += 1;
        } else if (month === (currentMonth - 1)) {
          prevMonthViews += 1;
        }
      });
    });

    const revDiff = (revenue - prevMonthRev) / (revenue + prevMonthRev) * 100 || 0;
    const viewsDiff = (views - prevMonthViews) / (views + prevMonthViews) * 100 || 0;
    const totalDiff = ((revenue + views) - (prevMonthRev + prevMonthViews)) /
      ((revenue + views) + (prevMonthRev + prevMonthViews)) * 100 || 0;

    return {
      revenue,
      prevMonthRev,
      views,
      prevMonthViews,
      totalRevenue,
      revDiff,
      viewsDiff,
      totalDiff
    };
  };

  const {
    revenue,
    views,
    totalRevenue,
    revDiff,
    viewsDiff,
    totalDiff
  } = calculateMetrics();

  const data = [
    { title: 'Revenue', icon: 'receipt', value: revenue, diff: revDiff, desc: 'Compared to previous month' },
    { title: 'Views', icon: 'interactions', value: views, diff: viewsDiff , desc: 'Compared to previous month'},
    { title: 'Total Revenue', icon: 'discount', value: totalRevenue, diff: 100, desc: 'All time' },
    { title: 'Overall Growth', icon: 'growth', value: revenue + views, diff: totalDiff, desc: 'All time' },
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
          <Text className={classes.value}>
            {stat.value > 1000 ? `${(stat.value / 1000).toFixed(1)}K` : stat.value}
          </Text>
          <Text
            c={stat.diff > 0 ? 'teal' : 'red'}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{Math.abs(stat.diff).toFixed(1)}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          {stat.desc}
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