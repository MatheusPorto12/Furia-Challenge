import React, { useState } from "react";
import Logo from "../../assets/images/furia_logo.png"; 

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [user, setUser] = useState({
    username: "Matheus", 
    avatar: Logo, 
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "w-48" : "w-16"
      } h-screen bg-black flex flex-col items-center py-4 transition-all duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="self-end mr-2 mb-8 text-white text-2xl"
      >
        {isOpen ? "<" : ">"}
      </button>

      {isLoggedIn ? (
        <>
          <div
            className={`flex items-center mb-8 ${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <img
                src={user.avatar}
                alt="Avatar do usuário"
                className="w-6 h-6 rounded-full"
              />
            </div>
            {isOpen && (
              <span className="bg-white text-gray-700 px-2 py-1 rounded font-bold italic text-xs">
                {user.username}
              </span>
            )}
          </div>
        </>
      ) : (
        <div
          className={`flex items-center justify-center text-white text-sm ${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          Faça login
        </div>
      )}
    </div>
  );
}