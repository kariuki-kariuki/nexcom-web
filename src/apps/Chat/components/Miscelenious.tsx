import { IconDotsVertical, IconPhoneCalling, IconVideo } from "@tabler/icons-react";
import PopMenu from "./PopMenu";

function Miscelenious() {
  return (
    <div className="flex justify-around">
      <div className="p-3">
        <IconVideo />
      </div>
      <div className="p-3">
        <IconPhoneCalling />
      </div>
      <div className="p-3">
        <div className="hidden sm:block"><IconDotsVertical/></div>
        <div className="sm:hidden"><PopMenu /></div>
      </div>
    </div>
  );
}

export default Miscelenious;
