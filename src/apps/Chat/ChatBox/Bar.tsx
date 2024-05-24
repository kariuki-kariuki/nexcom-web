import { useContext } from "react";
import MiniProfile from "../components/MiniProfile";
import Miscelenious from "../components/Miscelenious";
// import girl from "../../../assets/girl.jpg";
import { IconArrowLeftCircle } from "@tabler/icons-react";
import {
  ScreenContext,
  screenContextType,
} from "../../../context/screenContext";

// Top Bar on the Chatbox Area
const Bar = () => {
  const { updateActiveScreen } = useContext(ScreenContext) as screenContextType;
  return (
    <div className="bg-slate-800  sm:min-h-24 text-white flex justify-between  items-center p-3 sm:p-5 fixed top-0 right-0 left-0 md:sticky  md:top-0 border-b-2 border-gray-700">
      <div className="sm:hidden">
        <IconArrowLeftCircle
          size={20}
          onClick={() => updateActiveScreen("nav")}
        />
      </div>
      <MiniProfile />
      <Miscelenious />
    </div>
  );
};

export default Bar;
