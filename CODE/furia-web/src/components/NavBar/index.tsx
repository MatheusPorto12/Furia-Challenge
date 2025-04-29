import React from 'react';
import logo from '../../assets/images/Furia_Esports_logo.png';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="w-full bg-black text-white px-4 py-2 flex items-center justify-between">
      <img src={logo} alt="Logo FURIA" className="h-8" />
      <div className="flex space-x-4 pr-2">
        <button className="bg-transparent border border-white text-white font-bold py-1 px-4 rounded-full hover:bg-white hover:text-black transition duration-200">
          Login
        </button>
        <button className="bg-white border border-black text-black font-bold py-1 px-4 rounded-full hover:bg-black hover:text-white hover:border-white transition duration-200">
          Cadastro
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
