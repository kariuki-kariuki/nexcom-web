import { useState } from "react";
import { NavbarSearch } from "./AdminNav/NavbarSearch";
import Demo from "./Tables/Pagination";
import { UsersTable } from "./Tables/UserTable";

function Admin() {
  const [activePage, setPage] = useState<number>(1)
  return (
    <div className="flex">
      <NavbarSearch />
      <div className="w-full">
        <UsersTable activePage={activePage}/>
        <div className="flex justify-around">
          <Demo setPage={setPage} activePage={activePage}/>
        </div>
      </div>
    </div>
  );
}

export default Admin;
