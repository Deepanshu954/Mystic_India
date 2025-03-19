
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { foodData } from '../data/food';

function Food() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Indian Cuisine</h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Explore the diverse and flavorful world of Indian cuisine, from spicy curries to aromatic biryanis.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodData.map((dish) => (
              <motion.div
                key={dish.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{dish.name}</h3>
                  <p className="text-gray-300 mb-2">{dish.description}</p>
                  <p className="text-violet-400">Region: {dish.region}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Food;
