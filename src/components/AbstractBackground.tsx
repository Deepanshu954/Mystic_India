
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AbstractBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const { width, height } = backgroundRef.current.getBoundingClientRect();
        const x = e.clientX / width - 0.5;
        const y = e.clientY / height - 0.5;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={backgroundRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        style={{
          backgroundImage: 'url(/lovable-uploads/c1dc2f7a-93ac-4953-8733-62cbf677a252.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5) contrast(1.2)',
          opacity: 0.4 // Reduced opacity to make video more visible
        }}
      />

      {/* 3D animated shapes */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          rotateX: mousePosition.y * 10,
          rotateY: mousePosition.x * -10,
        }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Blue glow waves */}
        <motion.div
          className="absolute -top-1/3 -left-1/3 w-full h-full bg-neo-blue/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Purple glow waves */}
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-neo-purple/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Center violet waves */}
        <motion.div
          className="absolute inset-0 m-auto w-1/2 h-1/2 bg-neo-violet/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Small floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>

      {/* Light grid overlay */}
      <div 
        className="absolute inset-0 bg-neo-grid opacity-20" 
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Overlay with subtle parallax */}
      <div 
        className="absolute inset-0 bg-gray-900/60" 
        style={{
          transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
          transition: 'transform 0.4s ease-out'
        }}
      />
    </div>
  );
};

export default AbstractBackground;
