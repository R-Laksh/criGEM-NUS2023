/**
 * This is a login component in TypeScript React that displays a logo and a button to sign in using
 * Google.
 * @returns The Login component is being returned.
 */
'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import OtterLogo from "./OtterLogo.png"

function Login() {
  return (
    <div className="bg-white h-screen flex flex-col items-center
    justify-center text-center">
    <Image
        src={OtterLogo}
        width={300}
        height={300}
        alt="logo"
    />
    <button 
      onClick={() => signIn('google')} 
      className="text-black font-bold text-3xl animate-pulse"
    >
      Sign In to use OTTER
    </button>
  </div>
  );
}

export default Login 

