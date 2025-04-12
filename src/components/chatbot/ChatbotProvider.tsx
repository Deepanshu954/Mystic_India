
import React, { createContext, useContext, useState } from 'react';
import Chatbot from './Chatbot';
import ChatbotButton from './ChatbotButton';

interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType>({
  isOpen: false,
  openChatbot: () => {},
  closeChatbot: () => {},
  toggleChatbot: () => {},
});

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);
  const toggleChatbot = () => setIsOpen(prev => !prev);

  return (
    <ChatbotContext.Provider value={{ isOpen, openChatbot, closeChatbot, toggleChatbot }}>
      {children}
      <ChatbotButton onClick={toggleChatbot} />
      <Chatbot isOpen={isOpen} onClose={closeChatbot} />
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
