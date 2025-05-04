import { useState, useEffect, useCallback, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { fetchUser, loginApi, registerApi } from "../../services/AuthService";
import { UserJWT } from "../../models/User";

type Props = {
  children: ReactNode;
};

type DecodedJWT = {
  iss: string;
  sub: string;
  id: string;
  nome: string;
  role: string;
  iat: number;
  exp: number;
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserJWT | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginApi(email, password); // Chamada para a API de login
      if (response?.data) {
        const jwt = response.data.token;
        if (!jwt) throw new Error("Token ausente na resposta da API");
  
        setToken(jwt);
        localStorage.setItem("token", jwt);
        setIsLoggedIn(true);
  
        // Decodifica o token JWT
        const decoded: DecodedJWT = jwtDecode(jwt);
  
        // Busca os dados do usuário
        const userResponse = await fetchUser(decoded.id);
        if (userResponse?.data) {
          setUser(userResponse.data);
          setIsActive(userResponse.data.ativo || false); // Verifica se 'ativo' existe
        } else {
          throw new Error("Dados do usuário ausentes na resposta da API");
        }
  
        return true;
      } else {
        throw new Error("Resposta da API de login inválida");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoggedIn(false);
      setToken(null);
      setUser(null);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    data_nascimento: string,
    cpf: string,
    telefone: string
  ) => {
    try {
      const response = await registerApi(name, email, password, data_nascimento, cpf, telefone);
      const jwt = response.token;
  
      if (!jwt) throw new Error("Token missing");
  
      setToken(jwt);
      localStorage.setItem("token", jwt);
      setIsLoggedIn(true);
      scheduleTokenExpiration(jwt);
  
      const decoded: DecodedJWT = jwtDecode(jwt);
      await fetchUserData(decoded.id);
    } catch (error) {
      console.error("Signup error:", error);
      logout();
      throw error;
    }
  };

  const fetchUserData = useCallback(
    async (id: string) => {
      if (!token) return;

      try {
        setIsFetchingUser(true);
        const response = await fetchUser(id);
      } catch (error) {
        console.error("Fetch user error:", error);
      } finally {
        setIsFetchingUser(false);
      }
    },
    [token]
  );

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setIsActive(false);
    localStorage.removeItem("ativo");
    localStorage.removeItem("token");
  };

  const scheduleTokenExpiration = useCallback((jwt: string) => {
    const decoded: DecodedJWT = jwtDecode(jwt);
    const expirationTime = decoded.exp * 1000;
    const timeout = expirationTime - Date.now();

    if (timeout > 0) {
      setTimeout(() => {
        alert("Sua sessão expirou. Por favor, faça login novamente.");
        logout();
      }, timeout);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decoded: DecodedJWT = jwtDecode(token);
      const id = decoded.id;
      setUser({
        id,
        email: decoded.sub,
        nome: decoded.nome,
        role: decoded.role,
      });
      fetchUserData(id);
    }
  }, [token, fetchUserData]);

  useEffect(() => {
    if (token) {
      scheduleTokenExpiration(token);
    }
  }, [token, scheduleTokenExpiration]);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        isLoggedIn,
        token,
        user,
        isActive,
        isFetchingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};