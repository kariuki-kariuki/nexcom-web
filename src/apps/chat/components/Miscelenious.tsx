import { FaVideo } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

function Miscelenious() {
  return (
    <div className="flex justify-around">
      <div className="p-3">
        <FaVideo />
      </div>
      <div className="p-3">
        <MdAddIcCall />
      </div>
      <div className="p-3">
        <CiMenuKebab />
      </div>
    </div>
  );
}

export default Miscelenious;
