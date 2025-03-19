
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { culturalData } from '../data/culture';
import { states } from '../data/states';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, MapPin } from 'lucide-react';

function Culture() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Enhanced cultural data with state associations
  const enhancedCulturalData = culturalData.map(item => {
    // Find states that might feature this cultural element
    const relatedStates = states.filter(state => 
      state.culture.art.toLowerCase().includes(item.title.toLowerCase()) ||
      state.culture.dance.toLowerCase().includes(item.title.toLowerCase()) ||
      state.culture.festivals.some(f => f.toLowerCase().includes(item.title.toLowerCase())) ||
      state.culture.handicrafts.some(h => h.toLowerCase().includes(item.title.toLowerCase()))
    ).slice(0, 3);
    
    return {
      ...item,
      relatedStates
    };
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-600">
              Discover Indian Cultural Heritage
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              India's cultural tapestry spans millennia, weaving together art, dance, music, and traditions 
              that reflect the soul of this ancient civilization.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {enhancedCulturalData.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                className="group bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700/50 relative"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Floating state badges */}
                  {item.relatedStates.length > 0 && (
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {item.relatedStates.map((state, idx) => (
                        <Link 
                          key={idx} 
                          to={`/states/${state.path}`}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-violet-600/30 hover:bg-violet-600/50 text-white flex items-center gap-1 transition-colors duration-300"
                        >
                          <MapPin className="w-3 h-3" />
                          {state.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-3">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    {/* View details button */}
                    {item.relatedStates.length > 0 ? (
                      <Link 
                        to={`/culture/${item.id}/${item.relatedStates[0].path}`}
                        className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors duration-300 group/btn"
                      >
                        <span>Explore Details</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    ) : (
                      <span className="text-gray-500">No state details available</span>
                    )}
                    
                    {/* View count - decorative */}
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 900) + 100}</span>
                    </div>
                  </div>
                </div>
                
                {/* Glowing border on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: "0 0 15px 2px rgba(139, 92, 246, 0.5)",
                    zIndex: -1
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Culture;
