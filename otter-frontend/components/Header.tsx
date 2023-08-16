import Image from "next/image";
import React from 'react';
import { useSession} from "next-auth/react";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  GlobeAltIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  VideoCameraIcon
} from "@heroicons/react/24/outline";
import { 
  ChevronDownIcon, 
  HomeIcon, 
  Bars3Icon,
  MagnifyingGlassIcon 
} from "@heroicons/react/24/solid";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-21 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: 'black', 
            textTransform: 'uppercase',
            letterSpacing: '-1px',
            lineHeight: '1.2',    
            padding: '0.2rem 0',  
            display: 'inline-block',  
          }}>
            OTTERSIDE
          </h1>
        </Link>
        
      </div>
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5"/>
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search Box */}
      <form className="flex flex-1 items-center space-x-2  rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search OTTERSIDE" />
        <button type="submit" hidden />
      </form>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon"/>
        <GlobeAltIcon className="icon"/>
        <VideoCameraIcon className="icon"/>
        <hr className="h-10 border border-gray-100"/>
        <ChatBubbleLeftIcon className="icon"/>
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerWaveIcon  className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {/* Sign in/ Sign out button */}
      <div className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex">
      {session && (
        <div className="hidden items-center space-x-2 lg:flex">
          <div className="relative h-12 w-12">
            <Image
              src={session?.user?.image ?? ""}
              alt="Profile pic"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p>{session?.user?.name}</p>
        </div>
      )}  
        </div>
    </div>
  );
}

export default Header;





