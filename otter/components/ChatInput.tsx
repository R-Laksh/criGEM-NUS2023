'use client';

import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";

type Props = {
  chatId: string;
}

function ChatInput({ chatId }: Props ) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // TODO: useSWR to get model
  const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return; 

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input, 
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      }
    }

    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      message
    )

    const notification = toast.loading('OTTER is calculating...');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input, chatId, model, session
      })
    }).then(() => {
      // Toast notification to say successful!
      toast.success('OTTER has responded!', {
        id: notification,
      });
    });
  }

  return (
  <div className="bg-blue-600/30 text-white rounded-lg text-sm">
    <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
      <input 
        className="bg-transparent focus:outline-none flex-1 
        disabled:cursor-not-allowed disabled:text-gray-300"
        disabled={!session}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        type="text"
        placeholder="Enter your RNA sequence..."
      />
      <button 
        disabled={!prompt || !session} type="submit"
        className="bg-[#11A37F] hover:opacity-50 text-white font-bold
        px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
      </button>
    </form>

    <div>
      {/* ModelSelection */}
    </div>
  </div>
  );
}

export default ChatInput