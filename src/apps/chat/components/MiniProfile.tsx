
export interface MiniProfileProps{
    image: string;
    name: string;
    height: string
}
const MiniProfile = ({name, image, height}: MiniProfileProps) => {
  return (
    <div className="flex justify-between content-center">
          <img
            src={image}
            alt={`${name} profile`}
            className={`${height} rounded-full`}
          />
          <p className="px-5 text-slate-500">{name}</p>
        </div>
  )
}

export default MiniProfile