import { Group, Paper, Text } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { IconUserBolt, IconUserCheck } from '@tabler/icons-react';
import classes from './StatsChart.module.css';

const data = [
  { name: 'Kenya', value: 400, color: 'purple' },
  { name: 'India', value: 300, color: 'orange.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];

const data2 = [
  { name: 'Kenya', value: 300, color: 'purple' },
  { name: 'India', value: 200, color: 'orange.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 180, color: 'gray.6' },
];

const userData = [
  {
    label: 'Users',
    desc: 'Total Users',
    icon: IconUserCheck,
    data,
  },
  {
    label: 'Active',
    desc: 'Active Users',
    icon: IconUserBolt,
    data: data2,
  },
];
const StatsChart = () => {
  const stats = userData.map((data) => (
    <Paper p={'md'} className={classes.main}>
      <div>
        <Group justify="space-between" mb={'md'}>
          <Text fz={'sm'}>{data.label}</Text>
          <data.icon size={18} />
        </Group>
        <Group justify="space-between">
          <div>
            <Text fz={'h1'} ff={'serif'}>
              {data.data.reduce((acc, curr) => {
                return acc + curr.value;
              }, 0) / 100}
              K
            </Text>
            <Text fz={'xs'}>{data.desc}</Text>
          </div>
          <DonutChart data={data.data} size={70} />
        </Group>
      </div>
    </Paper>
  ));
  return (
    <Group grow py={'sm'}>
      {stats}
    </Group>
  );
};

export default StatsChart;
