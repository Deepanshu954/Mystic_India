
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getUniqueRegions } from '../utils/regionUtils';
import { ArrowRight } from 'lucide-react';

const RegionSection = () => {
  const regions = getUniqueRegions();
  
  return (
    <section className="py-16 dark:bg-gray-800/50 light:bg-saffron-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white light:text-light-text">
            Explore India By Region
          </h2>
          <p className="text-xl dark:text-gray-300 light:text-light-muted max-w-3xl mx-auto">
            Discover the geographical and cultural diversity across different regions of India
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {regions.map((region, index) => {
            const regionPath = region.replace(' India', '').toLowerCase().replace(/\s+/g, '-');
            
            return (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={`/regions/${regionPath}`}
                  className="block neo-card p-4 h-full hover:shadow-md transition-shadow dark:hover:bg-gray-700/50 light:hover:bg-white/80"
                >
                  <h3 className="text-lg font-medium flex items-center justify-between dark:text-white light:text-light-text">
                    <span>{region.replace(' India', '')}</span>
                    <ArrowRight className="w-4 h-4 dark:text-neo-violet light:text-saffron-500" />
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/regions" 
            className="neo-button inline-flex items-center gap-2"
          >
            View All Regions <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegionSection;
