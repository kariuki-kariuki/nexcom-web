// import DemoDash from '@/components/DemoDashBoard/DemoDash';
// import Dashboard from '@/components/Profile/ProfileDashboard';
import GroupChatInfo from '@/components/GroupChatInfo/GroupChatInfo';
import Security from '@/components/Security/Security';
import ShoppingFeatureInfo from '@/components/ShoppingFeatureInfo/ShoppingFeatureInfo';
import { Welcome } from '@/components/Welcome/Welcome';
import classes from "./styles.module.css"
import { FooterLinks } from '@/components/Footer/Footer';
// import { Product } from '@/lib/@types/shop';
// import { datasource } from '@/lib/common/datasource';

async function Index () {
  // const {data} = await datasource.get<Product[]>('demo')
  return (<div className={classes.bg}>
  <Welcome />
  <Security />
  <GroupChatInfo />
  <ShoppingFeatureInfo />
  <FooterLinks />
  </div>);
}

export default Index;
