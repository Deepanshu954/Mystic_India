
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface StateCardProps {
  name: string;
  image: string;
  description: string;
  tags?: string[];
  path: string;
}

const StateCard = ({ name, image, description, tags = [], path }: StateCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Extract region from tags if present
  const region = tags.find(tag => tag.includes('India'));
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate mouse position relative to card (from -0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div 
      className="neo-card relative group card-3d"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        transform: hovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)` 
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.2s ease-out"
      }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 dark:bg-gradient-to-br dark:from-neo-violet/50 dark:to-neo-blue/50 light:bg-gradient-to-br light:from-saffron-500/50 light:to-orange-400/50"
        style={{
          filter: "blur(8px)",
          zIndex: -1,
        }}
        animate={{ opacity: hovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Content - Using 3D transforms */}
      <div className="h-56 overflow-hidden relative card-3d-content">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            transform: hovered ? `scale(1.1) translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)` : "scale(1)",
            transition: "transform 0.3s ease-out"
          }}
          loading="lazy"
        />
        
        <div 
          className="absolute inset-0 bg-gradient-to-t from-neo-black/90 to-transparent dark:from-neo-black/90 light:from-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(30px)" }}
        />
        
        {/* Region badge if available */}
        {region && (
          <div 
            className="absolute top-3 left-3 region-badge z-10"
            style={{ transform: "translateZ(40px)" }}
          >
            {region}
          </div>
        )}
        
        {/* Dynamic light reflection effect */}
        <div 
          className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 bg-shimmer"
          style={{
            transform: `translateX(${mousePosition.x * 100}px) translateY(${mousePosition.y * 100}px)`,
            transition: "transform 0.1s ease-out"
          }}
        />
      </div>
      
      <div className="p-6 relative card-3d-content">
        {/* Animated underline for heading with 3D effect */}
        <h3 className="text-2xl font-semibold mb-3 relative inline-block">
          {name}
          <motion.span 
            className="absolute bottom-0 left-0 h-0.5 dark:bg-neo-violet light:bg-saffron-500"
            initial={{ width: "0%" }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </h3>
        
        <p className="dark:text-neo-gray-300 light:text-light-muted mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.filter(tag => !tag.includes('India')).map((tag, index) => (
            <motion.span 
              key={index}
              className="text-sm px-3 py-1 dark:bg-neo-violet/10 dark:text-neo-violet light:bg-saffron-500/10 light:text-saffron-700 rounded-full transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -2, 
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)" 
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <Link 
          to={`/states/${path}`}
          className="dark:text-neo-violet light:text-saffron-600 font-semibold flex items-center gap-2 group/link relative"
        >
          <span className="relative">
            Explore More
            <motion.span 
              className="absolute bottom-0 left-0 h-0.5 dark:bg-neo-violet light:bg-saffron-500"
              initial={{ width: "0%" }}
              animate={{ width: hovered ? "100%" : "0%" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </span>
          <motion.div
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default StateCard;
