import { IconArrowLeft } from "@tabler/icons-react";
import { useContext } from "react";
import { ScreenContext, screenContextType } from "../../../context/screenContext";

export interface MiniProfileProps {
  image: string;
  name: string;
  height: string;
  status: string;
}
const MiniProfile = ({ name, image, height, status }: MiniProfileProps) => {
  const {updateActiveScreen} = useContext(ScreenContext) as screenContextType;
  return (
    <div className="flex justify-between items-center">
      <div className="flex content-center justify-center al">
        <div className="sm:hidden">
          <IconArrowLeft width={14}  onClick={() => updateActiveScreen('nav')}/>
        </div>
        <img
          src={image}
          alt={`${name}'s profile`}
          className={`${height} rounded-full`}
        />
      </div>

      <div className="px-5">
        <p className="  text-white">{name}</p>
        <p className="text-slate-400 hidden lg:block md:text-sm">{status}</p>
      </div>
    </div>
  );
};

export default MiniProfile;
