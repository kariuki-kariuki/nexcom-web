import MiniProfile from "../components/MiniProfile";
import Miscelenious from "../components/Miscelenious";
import girl from "../../../assets/girl.jpg";
import { IconArrowLeftCircle } from "@tabler/icons-react";



// Top Bar on the Chatbox Area
const Bar = () => {
  return (
    <div className="bg-gray-700 h-auto sm:min-h-24 text-white flex justify-between align-center p-3 sm:p-5 fixed top-0 right-0 left-0 md:sticky  md:top-0">
      <div className="sm:hidden flex content-center h-full bg-black " onClick={() => console.log("arrow")}>
        <IconArrowLeftCircle size={20}  />
      </div>
      <MiniProfile
        
      />

      <Miscelenious />
    </div>
  );
};

export default Bar;
