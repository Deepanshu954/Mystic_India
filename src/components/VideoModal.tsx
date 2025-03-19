
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
  startAt?: number;
  isBackground?: boolean;
}

const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoId = 'm8qf5bSmlQQ',
  startAt = 0,
  isBackground = false
}: VideoModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && !isBackground) {
      document.body.style.overflow = 'hidden';
      
      // Reset loading state when modal opens
      setIsLoading(true);
    } else if (!isBackground) {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isBackground) onClose();
    };

    if (!isBackground) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      if (!isBackground) {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose, isBackground]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Render background video differently
  if (isBackground) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <iframe
          className="absolute w-[300%] h-[300%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&start=${startAt}&enablejsapi=1`}
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-neo-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              className="absolute -top-14 right-0 p-2 text-neo-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
              <span className="absolute top-full right-0 px-2 py-1 text-xs bg-neo-dark/90 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Close (Esc)
              </span>
            </motion.button>
            
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-2xl neo-glass">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-neo-dark/50">
                  <div className="neo-spinner"></div>
                </div>
              )}
              
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&start=${startAt}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
              />
              
              <div className="absolute inset-0 pointer-events-none border border-neo-violet/30 rounded-xl"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
