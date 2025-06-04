// import DemoDash from '@/components/DemoDashBoard/DemoDash';
// import Dashboard from '@/components/Profile/ProfileDashboard';
import { Welcome } from '@/components/Welcome/Welcome';
// import { Product } from '@/lib/@types/shop';
// import { datasource } from '@/lib/common/datasource';

async function Index () {
  // const {data} = await datasource.get<Product[]>('demo')
  return <>
  <Welcome />
  {/* {data && <DemoDash products={data} />} */}
  </>;
}

export default Index;
