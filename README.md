# Furia-Challenge

Desafio técnico para a vaga de assistente de engenharia de software.

## Resumo

Esta aplicação é um **chat-bot** desenvolvido com integração ao **Vertex AI**. Além disso, possui funcionalidades de **login** e **registro** de usuários. O chat-bot permite que os usuários interajam com uma IA para obter respostas em tempo real, enquanto o sistema de autenticação garante que apenas usuários registrados possam acessar o chat.

## Funcionalidades

- **Chat-bot com Vertex AI**: Permite que os usuários enviem mensagens e recebam respostas da IA.
- **Autenticação**: Sistema de login e registro de usuários.
- **Interface responsiva**: Layout moderno e adaptável para diferentes dispositivos.
- **SideBar dinâmica**: Exibe informações do usuário logado e permite alternar entre estados aberto e fechado.

---

## Como rodar o projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Backend** configurado para a API (exemplo: `http://localhost:8080`)

### Passos para rodar o projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/MatheusPorto12/Furia-Challenge.git
   cd Furia-Challenge
   ```

2. **Instale as dependências**:
   Com `npm`:
   ```bash
   npm install
   ```
   Ou com `yarn`:
   ```bash
   yarn install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e configure a URL da API:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```

4. **Inicie o servidor de desenvolvimento**:
   Com `npm`:
   ```bash
   npm start
   ```
   Ou com `yarn`:
   ```bash
   yarn start
   ```

5. **Acesse a aplicação**:
   Abra o navegador e acesse:
   ```
   http://localhost:3000
   ```

---

## Estrutura do projeto

- **`src/components`**: Contém os componentes reutilizáveis, como `NavBar` e `SideBar`.
- **`src/pages`**: Contém as páginas principais, como `Home`, `Login` e `Register`.
- **`src/context`**: Gerencia o estado global da aplicação, como autenticação.
- **`src/services`**: Contém as funções para comunicação com a API.

---

## Tecnologias utilizadas

- **React**: Biblioteca para construção da interface do usuário.
- **Tailwind CSS**: Framework para estilização.
- **Vertex AI**: Integração com IA para o chat-bot.
- **React Router**: Gerenciamento de rotas.
- **Context API**: Gerenciamento de estado global.
- **Java com SpringBoot**: para o backend.

---

## Contato

Caso tenha dúvidas ou sugestões, entre em contato:

- **Email**: matheus5299porto@hotmail.com
- **LinkedIn**: https://www.linkedin.com/in/matheus-porto12/