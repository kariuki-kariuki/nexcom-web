import Navbutton, { LinkProps } from "./Navbutton";
import { FaRocketchat } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";


const link: LinkProps[] = [
  {name: "Chat", link: "/", Icon: FaRocketchat},
  {name: "Shop", link: "/", Icon: FaShopify},
  {name: "Home", link: "/", Icon: IoHome},
  {name: "Profile", link: "/", Icon: FaRegCircleUser},

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
