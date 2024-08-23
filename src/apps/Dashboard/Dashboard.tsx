import { GlobalUser } from '../../@types/chat';
import Profile from './DashComponents/Profile/Profile';
import classes from './Dashboard.module.css';
import { Drawer } from '@mantine/core';
interface Iprops {
  opened: boolean;
  close: () => void;
  actUser: GlobalUser;
}
const Dashboard = ({ opened = true, close, actUser }: Iprops) => {
  return (
    <Drawer
      opened={opened}
      onClose={close}
      w={'100%'}
      style={{ overflow: 'hidden' }}
      classNames={{ root: classes.hero }}
      h={'100%'}
    >
      <Profile userClicked={actUser} />
    </Drawer>
  );
};
export default Dashboard;
