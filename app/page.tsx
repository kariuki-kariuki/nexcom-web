import { Welcome } from '@/components/Welcome/Welcome';
import { GlobalUser } from '@/lib/@types/app';
import get from '@/utils/fetch';

async function Index() {
  const user = await get<GlobalUser>('auth/me');
  return <Welcome user={user} />;
}

export default Index;
