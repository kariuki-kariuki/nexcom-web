import { Grid, Group, Paper, Text } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { IconUserBolt, IconUserCheck } from '@tabler/icons-react';
import classes from './StatsChart.module.css';
import { useGlobalStore } from '@repo/shared-logic';

const data = [
  { name: 'Kenya', value: 400, color: 'purple' },
  { name: 'India', value: 300, color: 'orange.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' }
];

const data2 = [
  { name: 'Kenya', value: 300, color: 'purple' },
  { name: 'India', value: 200, color: 'orange.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 180, color: 'gray.6' }
];

const userData = [
  {
    label: 'Followers',
    desc: 'Total',
    icon: IconUserCheck,
    data
  },
  
];
const StatsChart = () => {
  const conversations = useGlobalStore((state) => state.conversations)

  const stats = userData.map((data) => (
    <Grid.Col span={{ base: 12 }}>
      <Paper p={'md'} className={classes.main}>
        <div>
          <Group justify="space-between" mb={'md'}>
            <Text fz={'sm'}>{data.label}</Text>
            <data.icon size={22}  />
          </Group>
          <Group justify="space-between">
            <div>
              <Text fz={'h1'} ff={'serif'}>
                {`${conversations.length} ${data.desc}`}
                </Text>
            </div>
            <DonutChart data={data.data} size={70} />
          </Group>
        </div>
      </Paper>
    </Grid.Col>
  ));
  return <Grid py={'sm'}>{stats}</Grid>;
};

export default StatsChart;
