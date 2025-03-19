
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const NeoBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Track mouse position for 3D effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced 3D Particle system
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      color: string;
      opacity: number;
      depth: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000; // 3D depth
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.speedZ = Math.random() * 1 + 0.2; // Movement in z-axis
        this.opacity = Math.random() * 0.6 + 0.2;
        this.depth = 0;
        
        // Colors in the violet/purple/blue range for futuristic look
        const colors = [
          'rgba(139, 92, 246, 1)', // neo-violet
          'rgba(99, 102, 241, 1)',  // neo-indigo
          'rgba(14, 165, 233, 1)',  // neo-blue
          'rgba(168, 85, 247, 1)',  // neo-purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number) {
        // Update 3D position
        this.x += this.speedX + mouseX * 0.5;
        this.y += this.speedY + mouseY * 0.5;
        this.z -= this.speedZ; // Moving toward viewer

        // Reset particle when it passes the screen
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * (canvas?.width || window.innerWidth);
          this.y = Math.random() * (canvas?.height || window.innerHeight);
        }

        // Calculate depth for 3D perspective
        this.depth = 1 - this.z / 1000; // 0 is far, 1 is close
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Perspective calculation
        const perspective = 500;
        const scale = perspective / (perspective + this.z);
        const screenX = this.x * scale + canvas!.width / 2;
        const screenY = this.y * scale + canvas!.height / 2;
        const screenSize = this.size * scale * 3;

        // Drawing with glow effect
        const alpha = this.opacity * this.depth * this.depth; // Fade out distant particles
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15 * this.depth;
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    // Connect particles with lines if they are close enough
    function connectParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          // 3D distance calculation
          const perspective = 500;
          const scaleA = perspective / (perspective + particles[i].z);
          const scaleB = perspective / (perspective + particles[j].z);
          
          const screenXA = particles[i].x * scaleA + canvas!.width / 2;
          const screenYA = particles[i].y * scaleA + canvas!.height / 2;
          const screenXB = particles[j].x * scaleB + canvas!.width / 2;
          const screenYB = particles[j].y * scaleB + canvas!.height / 2;
          
          const dx = screenXA - screenXB;
          const dy = screenYA - screenYB;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Adjust connection based on depth
            const averageDepth = (particles[i].depth + particles[j].depth) / 2;
            const opacity = (1 - distance / maxDistance) * averageDepth * 0.5;
            
            // Use a color gradient based on the particles' colors
            const gradient = ctx.createLinearGradient(screenXA, screenYA, screenXB, screenYB);
            gradient.addColorStop(0, particles[i].color.replace('1)', `${opacity})`));
            gradient.addColorStop(1, particles[j].color.replace('1)', `${opacity})`));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 * averageDepth;
            ctx.beginPath();
            ctx.moveTo(screenXA, screenYA);
            ctx.lineTo(screenXB, screenYB);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = 'rgba(10, 10, 15, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create a central glow effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gradient = ctx.createRadialGradient(
        centerX + mousePosition.x * 50, 
        centerY + mousePosition.y * 50, 
        0, 
        centerX, 
        centerY, 
        canvas.width
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');  // Purple center
      gradient.addColorStop(0.4, 'rgba(14, 165, 233, 0.05)');  // Blue mid
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');  // Transparent edge
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles with 3D effect
      particles.forEach(particle => {
        particle.update(mousePosition.x * 3, mousePosition.y * 3);
        particle.draw(ctx);
      });

      // Connect particles
      connectParticles(ctx, particles);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          pointerEvents: 'none',
          transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * -2}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Additional overlay effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-blue-900/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );
};

export default NeoBackground;
