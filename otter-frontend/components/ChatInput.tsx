'use client';

import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
}

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const { data: model } = useSWR('model', {
    fallbackData: 'Select a model'
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      }
    };

    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      message
    );

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
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col">
      <form onSubmit={sendMessage} className="flex space-x-4">
        <input
          className="flex-1 px-4 py-2 bg-white rounded-lg focus:outline-none"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Enter your RNA sequence..."
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>
      <div className="mt-2 md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
