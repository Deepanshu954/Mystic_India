
import { MapPin, Utensils, Landmark, PartyPopper, ArrowRight, Globe, BookOpen, Image, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StateCard from '../components/StateCard';
import FeaturedSection from '../components/FeaturedSection';
import VideoModal from '../components/VideoModal';
import PageTransition from '../components/PageTransition';
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import UpcomingEvents from '../components/UpcomingEvents';
import { states } from '../data/states';

// Show only 3 featured states on the home page
const featuredStates = states.slice(0, 3);

// Group states by category for rendering
const categorizedStates = {
  north: states.filter(state => state.tags.includes('North India')),
  south: states.filter(state => state.tags.includes('South India')),
  east: states.filter(state => state.tags.includes('East India')),
  west: states.filter(state => state.tags.includes('West India')),
  central: states.filter(state => state.tags.includes('Central India')),
  northeast: states.filter(state => state.tags.includes('Northeast India')),
};

function Home() {
  return (
    <PageTransition>
      <div>
        {/* Hero Section with Background Video */}
        <div className="relative h-screen">
          {/* Background Video */}
          <VideoModal 
            isOpen={true} 
            onClose={() => {}}
            videoId="m8qf5bSmlQQ" 
            startAt={20}
            isBackground={true}
          />
          
          <div className="absolute inset-0 flex items-center justify-center text-center z-20">
            <div className="max-w-4xl px-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Mystic India
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-white mb-8 font-light tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Land of Diversity, Culture, and Timeless Traditions
              </motion.p>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-sm mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 13, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Experience India Section */}
        <div className="bg-light-bg dark:bg-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neo-gradient-text">Experience India</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: MapPin, title: 'States & Territories', count: '28 States & 8 UTs' },
                { icon: Utensils, title: 'Rich Cuisines', count: '100+ Traditional Dishes' },
                { icon: Landmark, title: 'Heritage Sites', count: '40 UNESCO Sites' },
                { icon: PartyPopper, title: 'Vibrant Festivals', count: '50+ Major Celebrations' },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white dark:bg-gray-700/50 rounded-xl p-8 text-center transform transition-all duration-300 group-hover:shadow-xl group-hover:shadow-violet-500/10 h-full">
                    <item.icon className="w-16 h-16 text-violet-600 dark:text-violet-400 mb-6 mx-auto" />
                    <h3 className="text-xl font-semibold mb-3 text-light-text dark:text-white">{item.title}</h3>
                    <p className="text-light-muted dark:text-gray-300">{item.count}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Visit India */}
        <section className="py-20 bg-gradient-to-b from-white to-violet-50 dark:from-gray-900 dark:to-violet-900/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-4 text-light-text dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Why Visit India
              </motion.h2>
              <motion.p 
                className="text-xl text-light-muted dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover the many reasons why India should be your next travel destination
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: Globe,
                  title: "Cultural Diversity",
                  description: "Experience a tapestry of cultures, languages, religions, and traditions that vary dramatically as you travel across different regions."
                },
                {
                  icon: Landmark,
                  title: "Historical Wonders",
                  description: "From ancient temples to magnificent forts and palaces, India's rich history spans thousands of years and numerous civilizations."
                },
                {
                  icon: Utensils,
                  title: "Culinary Journey",
                  description: "Embark on a gastronomic adventure with diverse cuisines that change every few hundred kilometers, offering unique flavors and techniques."
                },
                {
                  icon: Image,
                  title: "Scenic Landscapes",
                  description: "From the snow-capped Himalayas to lush backwaters, sun-kissed beaches to vast deserts - India's geographical diversity is unmatched."
                },
                {
                  icon: BookOpen,
                  title: "Spiritual Experiences",
                  description: "The birthplace of major religions offers countless opportunities for spiritual discovery, meditation, and yoga practices."
                },
                {
                  icon: Star,
                  title: "Warm Hospitality",
                  description: "'Atithi Devo Bhava' (The guest is God) - experience the legendary warmth and hospitality of the Indian people."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-light-card dark:shadow-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(124, 58, 237, 0.1)" }}
                >
                  <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg inline-block mb-4">
                    <item.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-light-text dark:text-white">{item.title}</h3>
                  <p className="text-light-muted dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <div className="bg-white dark:bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <FeaturedSection 
              title="Discover India's Treasures" 
              subtitle="Explore the diverse landscapes and rich cultural heritage of featured Indian States"
            >
              <div className="flex justify-end mb-8">
                <Link
                  to="/states"
                  className="flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors shadow-neo-button hover:shadow-neo"
                >
                  View All States
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredStates.map((state) => (
                  <StateCard
                    key={state.path}
                    name={state.name}
                    image={state.image}
                    description={state.description}
                    tags={state.tags}
                    path={state.path}
                  />
                ))}
              </div>
            </FeaturedSection>
          </div>
        </div>

        {/* Upcoming Events */}
        <UpcomingEvents />

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter */}
        <Newsletter />
      </div>
    </PageTransition>
  );
}

export default Home;
