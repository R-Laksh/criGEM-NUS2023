import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isOTTER = message.user.name === "OTTER";

  return (
    <div className={`flex items-start px-4 py-2 ${isOTTER ? "bg-[#F0F4F8]" : "bg-[#D3E3FC]"} ${isOTTER ? "text-black" : "text-black"}`}>
      <img
        src={message.user.avatar}
        alt={message.user.name}
        className="w-8 h-8 rounded-full mr-3"
      />
      <div className={`rounded-lg p-3 max-w-xs ${isOTTER ? "bg-[#F0F4F8] text-black" : "bg-[#D3E3FC] text-black"}`}>
        <p className="text-lg break-words" style={{ whiteSpace: "nowrap" }}>{message.text}</p> 
      </div>
    </div>
  );
}

export default Message;


