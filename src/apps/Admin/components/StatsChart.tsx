import { Badge, Grid, Paper, Text } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
const StatsChart = () => {
  return (
    <Paper h={"100%"} p={"md"} bg={"black"} bd={"1px solid gray"}>
      <div>
        <Text fz={"sm"}>Users</Text>
        <Text fz={"h1"}>12K</Text>
        <Text fz={"xs"}>Total users</Text>
      </div>
      <Grid py={'md'}>
        <Grid.Col span={6}>
          <Badge color="blue">USA</Badge>
          <br />
          <Badge color="blue">India</Badge>
          <br />
          <Badge color="blue">Kenya</Badge>
        </Grid.Col>
        <Grid.Col span={6} >
          <DonutChart data={data} size={100}/>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default StatsChart;
