export type User = {
    id: number;
    nome: string;
    email: string;
    password: string;
    telefone: string;
    ativo: boolean;
    cpf: string;
    data_cadastro:string;
    data_nascimento:string;
    role:string;
    token?:string
  };
  
  export type UserJWT = {
    id: string;
    email: string;
    nome: string;
    role: string;
  };