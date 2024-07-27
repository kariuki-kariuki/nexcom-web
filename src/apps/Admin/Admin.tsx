import { useState } from 'react';
import { NavbarSearch } from './AdminNav/NavbarSearch';
import Demo from './Tables/Pagination';
import { UsersTable } from './Tables/UserTable';
import { IconBurger } from '@tabler/icons-react';

function Admin() {
  const [activePage, setPage] = useState<number>(1);
  const [active, setActive] = useState(false);
  return (
    <div className="sm:flex">
      <div
        className={`${active ? 'block' : 'hidden'} sm:block fixed top-0 left-0 right-0 z-50`}
      >
        <NavbarSearch active={active} setActive={setActive} />
      </div>
      <div className="sm:hidden">
        <IconBurger onClick={() => setActive(!active)} />
      </div>
      <div className="w-full">
        <UsersTable activePage={activePage} />
        <div className="flex justify-around">
          <Demo setPage={setPage} activePage={activePage} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
