import MiniProfile from "../components/MiniProfile"
import Miscelenious from "../components/Miscelenious"
import girl from"../../../assets/girl.jpg"

interface Iprops {
    name: string
    image: string
    status: string
}

// Top Bar on the Chatbox Area
const Bar = ({name, image, status} : Iprops) => {
  return (
    <div className="bg-gray-700 h-auto sm:min-h-24 text-white flex justify-between p-3 sm:p-5 fixed top-0 right-0 left-0 md:sticky md:top-0">
        <MiniProfile name={name} image={image ? girl : girl} height="h-10" status = {status}/>
        
        <Miscelenious />
    </div>
  )
}

export default Bar