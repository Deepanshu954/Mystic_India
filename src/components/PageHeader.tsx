
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, subtitle, description, image, children }: PageHeaderProps) => {
  const titleWords = title.split(' ');
  
  return (
    <div className="mb-16 relative">
      <div className="text-center mb-8 relative">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {titleWords.map((word, i) => (
            <motion.span 
              key={i} 
              className="inline-block mr-4 last:mr-0 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-xl text-neo-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p 
            className="text-lg text-neo-gray-400 max-w-3xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {description}
          </motion.p>
        )}
        
        {image && (
          <motion.div
            className="mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto rounded-xl shadow-neo-card object-cover"
            />
          </motion.div>
        )}
      </div>
      
      {/* Subtle animated decorative elements */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-neo-violet/10 blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 transform -translate-x-1/2 w-32 h-32 rounded-full bg-neo-blue/10 blur-2xl opacity-20 animate-float" />
      
      {children}
    </div>
  );
};

export default PageHeader;
