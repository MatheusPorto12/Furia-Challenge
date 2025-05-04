import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import Logo from "../../assets/images/furia_logo.png";
import furiaLogin from "../../assets/images/furia_login.jpeg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importa os ícones

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext não encontrado. Certifique-se de usar o AuthProvider.");
  }

  const { login } = auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar a visibilidade da senha
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/home'); // Redireciona para a página inicial após o login
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <img src={Logo} alt="Logo" className="h-24 mb-4" />
        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <label htmlFor="email" className="block text-sm font-medium">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="block text-sm font-medium">
            Senha<span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Alterna entre texto e senha
              placeholder="Digite sua senha"
              className="w-full p-2 border rounded mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Alterna o estado de visibilidade
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex items-center justify-between text-sm mb-4">
            <label htmlFor="remember" className="flex items-center">
              <input id="remember" type="checkbox" className="mr-1" /> Salvar usuário
            </label>
            <a href="#" className="text-blue-600">Esqueceu sua senha?</a>
          </div>

          <button className="w-full bg-black text-white py-2 rounded cursor-pointer">
            Log in
          </button>
        </form>

        <hr className="w-full my-6 border-t" />

        <button
          onClick={() => navigate('/cadastro')}
          className="w-97 bg-black text-white py-2 rounded cursor-pointer"
        >
          Cadastrar
        </button>

        <p className="text-xs text-center mt-10">
          Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade da Furia
        </p>
      </div>

      <div
        className="w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${furiaLogin})` }}
      >
      </div>
    </div>
  );
}