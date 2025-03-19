
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import StateCard from './StateCard';
import { getStatesByRegion, regionThemes } from '../utils/regionUtils';

type RegionTheme = {
  primary: string;
  secondary: string;
  accent: string;
};

const RegionPage = () => {
  const { region } = useParams<{ region: string }>();
  const navigate = useNavigate();
  const decodedRegion = region ? decodeURIComponent(region.replace(/-/g, ' ')) + ' India' : '';
  const states = getStatesByRegion(decodedRegion);
  
  // Get theme for the current region or fallback to default
  const theme = (regionThemes as Record<string, RegionTheme>)[decodedRegion] || {
    primary: 'from-saffron-500 to-orange-400',
    secondary: 'bg-saffron-100 text-saffron-800',
    accent: 'bg-saffron-500/10 border-saffron-500/30'
  };

  // Map text for region descriptions
  const regionDescriptions: Record<string, string> = {
    'North India': 'Explore the majestic Himalayas, ancient temples, and vibrant culture of Northern India.',
    'South India': 'Discover lush green landscapes, classical dance forms, and magnificent temples of Southern India.',
    'East India': 'Experience rich cultural heritage, beautiful coastlines, and historical sites of Eastern India.',
    'West India': 'Visit colorful deserts, historic forts, and diverse traditions of Western India.',
    'Central India': 'Uncover the heart of India with its wildlife sanctuaries, ancient monuments, and tribal culture.',
    'Northeast India': 'Journey through pristine forests, unique tribal cultures, and breathtaking landscapes of Northeastern India.'
  };

  const description = regionDescriptions[decodedRegion] || 'Explore the diverse states and union territories in this beautiful region of India.';

  // Handle "View All States" with region filter
  const handleViewAllStates = () => {
    navigate('/states', { state: { selectedRegion: decodedRegion } });
  };

  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div className={`bg-gradient-to-r ${theme.primary} py-12 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://source.unsplash.com/random/1000x600/?india,pattern')] bg-center bg-no-repeat bg-cover mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center">
            <Link to="/regions" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to All Regions
            </Link>
            <button 
              onClick={handleViewAllStates} 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
            >
              View All States with {decodedRegion.replace(' India', '')} Filter
            </button>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{decodedRegion.replace(' India', '')}</h1>
          <p className="text-white/80 max-w-2xl text-lg">{description}</p>
          
          <div className="flex items-center gap-2 mt-6">
            <MapPin className="w-5 h-5 text-white/80" />
            <span className="text-white/80">{states.length} States to explore</span>
          </div>
        </div>
      </div>

      {/* States Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {states.map((state) => (
            <StateCard
              key={state.name}
              name={state.name}
              image={state.image}
              description={state.description}
              tags={state.tags}
              path={state.path}
            />
          ))}
        </div>
        
        {states.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600 dark:text-gray-400">No states found in this region.</h3>
            <Link to="/states" className="mt-4 inline-block neo-button">View All States</Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RegionPage;
