import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center text-xs text-black px-4 py-6">
      Ao enviar mensagens para o FURIA, você aceita nossos <a href="#" className="underline hover:text-gray-600">Termos</a> e declara ter lido nossa <a href="#" className="underline hover:text-gray-600">Política de Privacidade</a>.
    </footer>
  );
};

export default Footer;
