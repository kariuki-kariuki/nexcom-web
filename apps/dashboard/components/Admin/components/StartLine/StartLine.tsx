import { LineChart } from '@mantine/charts';
import { Card, Text } from '@mantine/core';
import classes from './StartLine.module.css';
const data = [
  { date: 'Jan', KPI: -25 },
  { date: 'Feb', KPI: -10 },
  { date: 'Mar', KPI: 5 },
  { date: 'Apr', KPI: 15 },
  { date: 'May', KPI: 30 },
  { date: 'Jun', KPI: 15 },
  { date: 'Jul', KPI: 30 },
  { date: 'Aug', KPI: 40 },
  { date: 'Sep', KPI: 15 },
  { date: 'Oct', KPI: 20 },
  { date: 'Nov', KPI: 0 },
  { date: 'Dec', KPI: -10 }
];
export function StartLine() {
  return (
    <Card className={classes.main}  p="md"  w={{ base: '100%', sm: '49%' }}>
      <Text py="md">Stats</Text>

      <LineChart
        h={300}
        data={data}
        series={[{ name: 'KPI', label: 'Avg. KPI', color: 'yellow.7' }]}
        dataKey="date"
        color='yellow.7'
        strokeWidth={3}
        curveType="natural"
        yAxisProps={{ domain: [-25, 40] }}
        valueFormatter={(value) => `${value}%`}
      />
    </Card>
  );
}
