// import { IconProps } from "@tabler/icons-react";
import { ReactNode } from "react";

export interface LinkProps {
  link: string,
  name: string,
  Icon: ReactNode,
}
const Navbutton = ({ link, name, Icon }: LinkProps) => {
  return (
    <div className="flex align-center  border-b-2 border-slate-300 shadow-sm p-4">
      <div className="px-4">
        {Icon}
      </div>
      <div>
      <a href={link} className="">
        <button>{name}</button>
      </a>
      </div>
     
    </div>
  );
};

export default Navbutton;
