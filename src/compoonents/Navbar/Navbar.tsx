import { IconBrandShopee, IconHome, IconMessageCircle, IconUserCircle } from "@tabler/icons-react";
import Navbutton, { LinkProps } from "./Navbutton";
import { UserButton } from "./UserButton";


const link: LinkProps[] = [
  {name: "Chat", link: "/", Icon: <IconHome size={24} color="white"/>},
  {name: "Shop", link: "/", Icon: <IconBrandShopee size={24} color="white"/>},
  {name: "Home", link: "/", Icon: <IconMessageCircle size={24} color="white"/>},
  {name: "Profile", link: "/", Icon: <IconUserCircle size={24} color="white"/>},

]
const Navbar = () => {
  const links = link.map((item: LinkProps) => <Navbutton link={item.link} name={item.name} Icon={item.Icon} key={item.name}/>) 
  return (
    <div className="hidden sm:w-1/12  lg:w-2/12 font-mono md:pt-5 bg-slate-800 min-h-full border-left-2 sm:block">
      <header className="py-5">
        <h1 className="text-center text-white">X</h1>
      </header>
      <div className="flex flex-col">
        {links}
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
