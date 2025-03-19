
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { getUniqueRegions } from '../utils/regionUtils';

const Regions = () => {
  const regions = getUniqueRegions();
  
  // Region images mapping
  const regionImages: Record<string, string> = {
    'North India': 'https://source.unsplash.com/random/800x600/?himalayas,mountains',
    'South India': 'https://source.unsplash.com/random/800x600/?kerala,backwaters',
    'East India': 'https://source.unsplash.com/random/800x600/?kolkata,bengal',
    'West India': 'https://source.unsplash.com/random/800x600/?gujarat,rajasthan',
    'Central India': 'https://source.unsplash.com/random/800x600/?madhya,pradesh',
    'Northeast India': 'https://source.unsplash.com/random/800x600/?assam,arunachal'
  };

  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <PageHeader 
        title="Explore India by Region" 
        description="Discover the geographical and cultural diversity across different regions of India" 
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region) => {
            const regionPath = region.replace(' India', '').toLowerCase().replace(/\s+/g, '-');
            const regionImage = regionImages[region] || 'https://source.unsplash.com/random/800x600/?india';
            
            return (
              <motion.div
                key={region}
                className="neo-card overflow-hidden group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/regions/${regionPath}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={regionImage}
                      alt={region}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{region.replace(' India', '')}</h3>
                      <div className="flex items-center text-white/70">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Explore Region</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm dark:text-gray-400 light:text-light-muted">
                        Discover unique culture & heritage
                      </span>
                      <motion.div
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5 dark:text-neo-violet light:text-saffron-500" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Regions;
