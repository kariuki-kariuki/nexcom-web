export interface MiniProfileProps {
  image: string;
  name: string;
  height: string;
  status: string;
}
const MiniProfile = ({ name, image, height, status }: MiniProfileProps) => {
  return (
    <div className="flex justify-between items-center">
      <img
        src={image}
        alt={`${name} profile`}
        className={`${height} rounded-full`}
      />
      <div className="px-5">
        <p className="  text-white">{name}</p>
        <p className="text-slate-400 hidden lg:block md:text-sm">{status}</p>
      </div>
    </div>
  );
};

export default MiniProfile;
