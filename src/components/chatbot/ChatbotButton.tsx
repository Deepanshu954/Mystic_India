
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40 p-4 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <MessageSquare className="w-6 h-6" />
      <span className="sr-only">Chat with Mystic India Guide</span>
    </motion.button>
  );
};

export default ChatbotButton;
