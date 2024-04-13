import MiniProfile from "../components/MiniProfile"
import Miscelenious from "../components/Miscelenious"

interface Iprops {
    name: string
    image: string
}
const Bar = ({name, image} : Iprops) => {
  return (
    <div className="bg-slate-200 flex justify-between p-5 sticky top-0 ">
        <MiniProfile name={name} image={image} height="h-10"/>
        <Miscelenious />
    </div>
  )
}

export default Bar