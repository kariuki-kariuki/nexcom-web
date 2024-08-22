import { BarChart } from '@mantine/charts';
import { Card } from '@mantine/core';
import classes from './StatsBar.module.css'
const data = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
];
const StatsBar = () => {
  return (
    <Card  mb={"sm"} className={classes.main}>
      <BarChart
        h={300}
        data={data}
        dataKey="month"
        series={[
          { name: 'Smartphones', color: 'purple' },
          { name: 'Laptops', color: 'orange' },
          { name: 'Tablets', color: 'teal.6' },
        ]}
        tickLine="xy"
        gridAxis="y"
      />
    </Card>
  );
};

export default StatsBar;
