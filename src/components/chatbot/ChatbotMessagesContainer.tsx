
import React, { useRef, useEffect } from 'react';
import { Message } from './types';
import ChatbotMessage from './ChatbotMessage';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatbotMessagesContainerProps {
  messages: Message[];
  isLoading: boolean;
  theme: string;
}

const ChatbotMessagesContainer: React.FC<ChatbotMessagesContainerProps> = ({ 
  messages, 
  isLoading,
  theme 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[350px] overflow-y-auto p-3 scrollbar-hide">
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ChatbotMessage 
              message={message} 
              theme={theme as 'light' | 'dark'}
            />
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div 
            className="text-center text-gray-500 dark:text-gray-400 my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center gap-2">
              <motion.div 
                className="rounded-full h-5 w-5 border-b-2 border-indigo-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Planning your magical journey...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatbotMessagesContainer;
