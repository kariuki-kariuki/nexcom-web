import { IconDotsVertical, IconPhoneCalling, IconVideo } from "@tabler/icons-react";

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
        <IconDotsVertical />
      </div>
    </div>
  );
}

export default Miscelenious;
