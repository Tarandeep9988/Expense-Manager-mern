"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const Navbar = ({user}) => {

  const router = useRouter();

  const fileInputRef = useRef(null);
  
  const handleLogout = () => {
    console.log("logout");
    window.localStorage.removeItem("user");
    router.replace("/");
  }
  const handleSetAvatar = () => {
    console.log("set avatar clicked");
    fileInputRef.current.click();
    // Further implementation for handling file upload will be done later
  }

  return (
    <nav className="bg-gray-300 border rounded-lg p-2 flex justify-between items-center">
      <span className="flex gap-2 justify-between items-center">
        <img src="/avatar.png" alt="avatar" className="h-8 w-8 rounded-full" />
        <input type="file" className="hidden" ref={fileInputRef} accept="image/jpg image/png image/jpeg"/>
        <button className="cursor-pointer bg-blue-500 px-4 py-1 rounded-md border" onClick={handleSetAvatar}>Set Avatar</button>
      </span>
      <span>
        <h1 className="capitalize">Wecome, {user ? user.name : "Guest"}</h1>
      </span>
      <span>
        <button className="cursor-pointer bg-blue-500 px-4 py-1 rounded-md border" onClick={handleLogout}>
         Logout
        </button>
      </span>
    </nav>
  )
}
export default Navbar