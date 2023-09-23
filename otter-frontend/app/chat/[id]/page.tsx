/**
 * The ChatPage component renders a Chat component and a ChatInput component, passing the chatId as a
 * prop to both.
 * @param {Props}  - The below is a React functional component called `ChatPage`. It takes a
 * single prop called `params`, which is an object with a property `id` of type string.
 * @returns The ChatPage component is returning a div element with the class name "flex flex-col
 * h-screen overflow-hidden". Inside the div, it renders the Chat component and the ChatInput
 * component, passing the chatId prop to both components.
 */
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
    params: {
        id: string
    }
}

function ChatPage({params: { id }}: Props) {

  return <div className="flex flex-col h-screen overflow-hidden">
    <Chat chatId={id}/>
    <ChatInput chatId={id}/>
  </div>;
}

export default ChatPage;