import { GlobalUser } from '@/lib/@types/app';
import Profile from './Profile/Profile';
import classes from './Dashboard.module.css';
import { Drawer } from '@mantine/core';
interface Iprops {
  opened: boolean;
  toggle: () => void;
  actUser: GlobalUser;
}
const Dashboard = ({ opened, toggle, actUser }: Iprops) => {
  return (
    <Drawer
      opened={opened}
      onClose={toggle}
      withOverlay={false}
      w={'100%'}
      style={{ overflow: 'hidden' }}
      classNames={{ header: classes.header, content: classes.color }}
      h={'100%'}
      title={`${actUser.fullName}'s Profile`}
      position="right"
    >
      <Profile userClicked={actUser} />
    </Drawer>
  );
};
export default Dashboard;
