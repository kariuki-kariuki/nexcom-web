// import { IconProps } from "@tabler/icons-react";
import { ReactNode } from "react";

export interface LinkProps {
  link: string,
  name: string,
  Icon: ReactNode,
}
const Navbutton = ({ link, name, Icon }: LinkProps) => {
  return (
    <div className="flex align-center  border-b-2 border-slate-300 shadow-sm p-4 sm:my-5">
      <div className="flex justify-center">
        {Icon}
      </div>
      <div>
      <a href={link} className="hidden lg:block lg:px-5">
        <button>{name}</button>
      </a>
      </div>
     
    </div>
  );
};

export default Navbutton;
