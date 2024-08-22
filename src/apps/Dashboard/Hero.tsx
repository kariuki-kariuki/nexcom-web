import { Paper, useMantineColorScheme } from '@mantine/core';
import Header from './DashComponents/Header';
import Profile from './DashComponents/Profile';
import { ActiveProps } from './Navbar';
import classes from './Dashboard.module.css';
const Hero = ({ setActive }: ActiveProps) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Paper w={'100%'} style={{ overflow: 'hidden' }} className={classes.hero}>
      <Header setActive={setActive} />
      <Paper
        h={'75%'}
        bg={
          colorScheme == 'dark'
            ? 'rgba(24, 24, 24, .7)'
            : 'rgba(231, 241, 255, .5)'
        }
        p={{ sm: 'md', md: 'lg' }}
        m={{ md: 'lg', xs: 'lg' }}
        radius={'xl'}
      >
        <Profile />
      </Paper>
    </Paper>
  );
};
export default Hero;
