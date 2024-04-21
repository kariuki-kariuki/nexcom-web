import MiniProfile from "../components/MiniProfile"
import Miscelenious from "../components/Miscelenious"

interface Iprops {
    name: string
    image: string
    status: string
}

// Top Bar on the Chatbox Area
const Bar = ({name, image, status} : Iprops) => {
  return (
    <div className="bg-gray-700 text-white flex justify-between p-5 sticky top-0 ">
        <MiniProfile name={name} image={image} height="h-10" status = {status}/>
        <Miscelenious />
    </div>
  )
}

export default Bar