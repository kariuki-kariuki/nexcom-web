import { LineChart } from '@mantine/charts';
import { Card } from '@mantine/core';
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
    <Card my={'md'} className={classes.main}>
      <LineChart
        h={300}
        data={data}
        series={[{ name: 'KPI', label: 'Avg. KPI' }]}
        dataKey="date"
        type="gradient"
        gradientStops={[
          { offset: 0, color: 'red.6' },
          { offset: 20, color: 'orange.6' },
          { offset: 40, color: 'yellow.5' },
          { offset: 70, color: 'lime.5' },
          { offset: 80, color: 'cyan.5' },
          { offset: 100, color: 'blue.5' }
        ]}
        strokeWidth={5}
        curveType="natural"
        yAxisProps={{ domain: [-25, 40] }}
        valueFormatter={(value) => `${value}°C`}
      />
    </Card>
  );
}
