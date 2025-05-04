import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../services/AuthService';
import logo from "../../assets/images/furia_logo.png";
import logoEscrita from "../../assets/images/furia_logo_escrita.png";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            const response = await registerApi(nome, email, password,data_nascimento,cpf,telefone);
            console.log('Cadastro realizado com sucesso:', response);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white">
            <div className="w-full h-12 bg-black flex items-center">
                <img src={logoEscrita} alt="Logo" className="h-8 ml-4" />
            </div>

            <div className="flex flex-col items-center p-10 w-full">
                <div className="flex items-center justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-30" />
                </div>

                <h1 className="text-xl font-semibold mb-6">Cadastro</h1>

                <form className="grid grid-cols-2 gap-4 max-w-3xl w-full" onSubmit={handleRegister}>
                    <div className="col-span-2">
                        <label htmlFor="nome" className="block text-sm font-medium">
                            Nome<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Digite seu nome"
                            className="w-full p-2 border rounded mb-2"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu email"
                            className="w-full p-2 border rounded mb-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="telefone" className="block text-sm font-medium">
                            Telefone<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="telefone"
                            type="tel"
                            placeholder="Digite seu telefone"
                            className="w-full p-2 border rounded mb-2"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="data_nascimento" className="block text-sm font-medium">
                            Data de nascimento<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="data_nascimento"
                            type="date"
                            className="w-full p-2 border rounded mb-2"
                            value={data_nascimento}
                            onChange={(e) => setData_nascimento(e.target.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="cpf" className="block text-sm font-medium">
                            CPF<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="cpf"
                            type="text"
                            placeholder="Digite seu CPF"
                            className="w-full p-2 border rounded mb-2"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Senha<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full p-2 border rounded mb-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium">
                            Confirme a senha<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirme sua senha"
                            className="w-full p-2 border rounded mb-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col items-center gap-3 mt-6">
                        <button type="submit" className="bg-black text-white py-2 px-8 rounded w-1/3">
                            Cadastrar
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="bg-black text-white py-2 px-8 rounded w-1/3"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="text-xs text-center mt-10">
                    Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade da Furia
                </p>
            </div>
        </div>
    );
}