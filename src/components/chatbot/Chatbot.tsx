
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize, Maximize, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { parseJourneyRequest, generateJourneyPlan, getResponseForQuery, generateNewSuggestions } from './ChatbotUtils';
import { JourneyDetails, Message, CHATBOT_BACKGROUNDS } from './types';
import { getStateDetails } from './ChatbotUtils';
import ChatbotMessagesContainer from './ChatbotMessagesContainer';
import ChatbotSuggestions from './ChatbotSuggestions';
import { useTheme } from '@/components/theme/ThemeProvider';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Namaste! 🙏 I'm your Mystic India Guide. Ask me about India's heritage, states, cuisines, or festivals, or let me help plan your journey.",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Plan a journey to Kerala",
    "Tell me about Indian cuisine",
    "What festivals are in Rajasthan?",
    "Top heritage sites in India"
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Process the message
    const journeyRequest = parseJourneyRequest(input);
    
    setTimeout(() => {
      if (journeyRequest) {
        // Generate journey plan
        const state = getStateDetails(journeyRequest.state);
        const journeyDetails = generateJourneyPlan(journeyRequest.days, state);
        
        // Create response with journey details
        const botResponse: Message = {
          text: `Here's your ${journeyRequest.days}-day journey to ${state.name}:`,
          sender: 'bot',
          type: 'journey',
          journeyDetails
        };
        
        setMessages(prev => [...prev, botResponse]);
        
        // Generate new suggestions based on the state
        setSuggestions(generateNewSuggestions(state.name, journeyRequest.days));
      } else {
        // Generate a regular response
        const responseText = getResponseForQuery(input);
        const botResponse: Message = {
          text: responseText,
          sender: 'bot',
          type: 'regular'
        };
        
        setMessages(prev => [...prev, botResponse]);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-4 right-4 z-50 flex flex-col"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {isMinimized ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg cursor-pointer flex items-center"
            onClick={toggleMinimize}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-2">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="text-sm font-medium mr-2">Mystic India Guide</span>
            <Maximize className="h-4 w-4 text-gray-500" />
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-80 sm:w-96 max-h-[600px] flex flex-col"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Header */}
            <div 
              className="p-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-700"
              style={{
                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
              }}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-2">
                  <span className="text-indigo-600 font-bold text-xs">AI</span>
                </div>
                <h3 className="text-white font-medium">Mystic India Guide</h3>
              </div>
              <div className="flex">
                <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-7 w-7 text-white hover:bg-white/10">
                  <Minimize className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 text-white hover:bg-white/10">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Messages Container */}
            <ChatbotMessagesContainer 
              messages={messages} 
              isLoading={isLoading}
              theme={theme}
            />
            
            {/* Suggestions */}
            <ChatbotSuggestions 
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              theme={theme}
            />
            
            {/* Input Box */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ask me anything about India..."
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="rounded-l-none bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;
