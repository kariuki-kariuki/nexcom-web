import { Flex } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import classes from './AdminCalendar.module.css';
const AdminCalendar = () => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      p={'md'}
      className={classes.main}
      my={'md'}
      style={{ borderRadius: '10px' }}
    >
      <Calendar />
    </Flex>
  );
};

export default AdminCalendar;
