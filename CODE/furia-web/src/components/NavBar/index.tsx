import React, { useContext } from 'react';
import logo from '../../assets/images/Furia_Esports_logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext não encontrado. Certifique-se de usar o AuthProvider.");
  }

  const { isLoggedIn, logout, user } = auth;

  return (
    <nav className="w-full bg-black text-white px-4 py-2 flex items-center justify-between">
      <img src={logo} alt="Logo FURIA" className="h-8" />
      <div className="flex space-x-4 pr-2">
        {isLoggedIn ? (
          <>
            <span className="text-white font-bold">{user?.nome}</span>
            <button
              onClick={() => {
                logout();
                navigate('/home');
              }}
              className="bg-transparent border border-white text-white font-bold py-1 px-4 rounded-full hover:bg-white hover:text-black transition duration-200"
            >
              Sair
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;