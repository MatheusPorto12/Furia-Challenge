import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Logo from "../../assets/images/furia_logo.png";

const Home = () => {
  const [inputMessage, setInputMessage] = useState(""); 
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]); 

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; 
    setMessages((prevMessages) => [...prevMessages, { sender: "Você", text: inputMessage }]);

    try {
      const response = await fetch(`http://localhost:8080/api/chatbot/chat?query=${encodeURIComponent(inputMessage)}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao se comunicar com a API");
      }

      const data = await response.text(); 

      
      setMessages((prevMessages) => [...prevMessages, { sender: "IA", text: data }]);
      setInputMessage(""); 
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: "Erro", text: "Erro ao se comunicar com a IA." }]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 flex flex-col px-4">
          <img src={Logo} alt="Logo FURIA" className="w-52 h-52 mb-4 self-center" />

          
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "Você" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`${
                    msg.sender === "Você" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  } rounded-lg p-3 max-w-lg`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          
          <div className="w-full flex items-center bg-white py-2 px-4 border-t border-gray-300 sticky bottom-0">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 border border-black rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Enviar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;