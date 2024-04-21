import { IconBrandShopee, IconHome, IconMessageCircle, IconUserCircle } from "@tabler/icons-react";
import Navbutton, { LinkProps } from "./Navbutton";


const link: LinkProps[] = [
  {name: "Chat", link: "/", Icon: <IconHome size={24}/>},
  {name: "Shop", link: "/", Icon: <IconBrandShopee size={24}/>},
  {name: "Home", link: "/", Icon: <IconMessageCircle size={24}/>},
  {name: "Profile", link: "/", Icon: <IconUserCircle size={24}/>},

]
const Navbar = () => {
  const links = link.map((item: LinkProps) => <Navbutton link={item.link} name={item.name} Icon={item.Icon} key={item.name}/>) 
  return (
    <div className="w-2/12 font-mono  md:pt-5 bg-slate-100 min-h-full border-left-2 ">
      <header className="py-5">
        <h1 className="text-center">X</h1>
      </header>
      <div className="flex flex-col">
        {links}
      </div>
    </div>
  );
};

export default Navbar;
