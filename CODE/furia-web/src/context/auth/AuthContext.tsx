import { createContext } from "react";
import { UserJWT } from "../../models/User";

type AuthContextType = {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    Telefone: string,
    password: string,
    data_nascimento: string,
    cpf:string,
  ) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  token: string | null;
  user: UserJWT | null;
  isActive: boolean;
  isFetchingUser: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);