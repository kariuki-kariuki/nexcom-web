import { NavbarSearch } from "./AdminNav/NavbarSearch";
import { UsersTable } from "./Tables/UserTable";

function Admin() {
  return (
    <div className="flex">
      <NavbarSearch />
      <div className="w-full h-screen overflow-y-auto">
        <UsersTable />
      </div>
    </div>
  );
}

export default Admin;
