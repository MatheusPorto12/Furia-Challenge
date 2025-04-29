import {API} from '../services/api/index'
import { handleError } from '../handlers/handleError';
import { User } from '../models/User';

export const loginApi = async (email: string, senha: string) => {
    try {
      const response = await API.post<User>("/auth/login", {
        email: email,
        senha: senha,
      });
  
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  
  export const registerApi = async (
    nome: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await API.post("/auth/register", {
        nome: nome,
        email: email,
        password: password,
      });
  
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };
  
  export const fetchUser = async (id: string) => {
    try {
      const response = await API.get(`/api/user/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };