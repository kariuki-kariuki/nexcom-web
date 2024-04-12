import { IconType } from "react-icons";

export interface LinkProps {
  link: string,
  name: string,
  Icon: IconType,
}
const Navbutton = ({ link, name, Icon }: LinkProps) => {
  return (
    <div className="flex align-center  border-b-2 border-slate-300 shadow-sm p-4">
      <div className="px-4">
        <Icon height={72} width={72} />
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
