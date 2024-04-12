interface Props {
  image: string;
  name: string;
  status: string;
}
const ContactCard = ({ image, name, status }: Props) => {
  return (
    <div className="max-w-full p-5 bg-white border-b-2 border-gray-300 text-sm  min-h-32">
      <div className="flex justify-between">
        <div className="flex justify-between">
          <img
            src={image}
            alt={`${name} profile`}
            className="h-5 rounded-full "
          />
          <p className="px-5 text-slate-500">{name}</p>
        </div>
        <p className="text-slate-500">4h ago</p>
      </div>
      <div className="font-serif py-5">
        <p>{status}</p>
      </div>
    </div>
  );
};

export default ContactCard;
