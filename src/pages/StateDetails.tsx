
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Palette, LandPlot, Clock, Newspaper, ChevronDown, ChevronUp, MapPin, Home, ArrowRight } from 'lucide-react';
import { states } from '../data/states';

function StateDetails() {
  const { state: statePath } = useParams();
  const [data, setData] = useState<typeof states[0] | undefined>(undefined);
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [showAllCuisine, setShowAllCuisine] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find state data
    setLoading(true);
    setTimeout(() => {
      const stateData = states.find(s => s.path === statePath);
      setData(stateData);
      setLoading(false);
      // Reset view states when state changes
      setShowAllPlaces(false);
      setShowAllCuisine(false);
      setShowAllHistory(false);
    }, 300);
  }, [statePath]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-60 dark:bg-gray-700 light:bg-saffron-100 rounded mb-4"></div>
          <div className="h-4 w-96 dark:bg-gray-800 light:bg-saffron-50 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl dark:text-white light:text-light-text mb-4">State not found</h2>
          <Link 
            to="/states"
            className="neo-button inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" /> Return to States
          </Link>
        </div>
      </div>
    );
  }

  // Find region from tags
  const region = data.tags.find(tag => tag.includes('India')) || '';

  // Safely handle optional properties
  const places = data.places || [];
  const cuisine = data.cuisine || [];
  const displayedPlaces = showAllPlaces ? places : places.slice(0, 3);
  const displayedCuisine = showAllCuisine ? cuisine : cuisine.slice(0, 3);

  // Find related states (other states in the same region)
  const relatedStates = states
    .filter(s => s.path !== data.path && s.tags.includes(region))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-900 pt-24">
      {/* Breadcrumb Navigation */}
      <div className="dark:bg-gray-800/50 light:bg-white/50 backdrop-blur-sm py-3 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm dark:text-gray-400 light:text-light-muted">
            <Link to="/" className="dark:hover:text-violet-400 light:hover:text-saffron-500">Home</Link>
            <ArrowRight className="w-3 h-3 mx-2" />
            <Link to="/states" className="dark:hover:text-violet-400 light:hover:text-saffron-500">States</Link>
            <ArrowRight className="w-3 h-3 mx-2" />
            <span className="dark:text-white light:text-light-text">{data.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {region && (
            <div className="region-badge mb-4">
              <MapPin className="w-4 h-4" /> {region}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">{data.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <p className="text-xl text-gray-300 max-w-3xl">{data.description}</p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-semibold">Capital:</span>
              <span className="text-gray-200">{data.capital}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.tags?.filter(tag => !tag.includes('India')).map((tag, index) => (
              <span key={index} className="text-sm px-3 py-1 bg-gray-200/20 text-gray-100 rounded-full backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Facts */}
      <div className="dark:bg-gray-800 light:bg-white py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="dark:bg-violet-900/30 light:bg-saffron-100 p-3 rounded-lg">
                <Palette className="w-6 h-6 dark:text-violet-400 light:text-saffron-500" />
              </div>
              <div>
                <h3 className="text-sm dark:text-gray-400 light:text-light-muted">Famous For</h3>
                <p className="dark:text-white light:text-light-text font-medium">{data.famous}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="dark:bg-violet-900/30 light:bg-saffron-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 dark:text-violet-400 light:text-saffron-500" />
              </div>
              <div>
                <h3 className="text-sm dark:text-gray-400 light:text-light-muted">Region</h3>
                <p className="dark:text-white light:text-light-text font-medium">{region}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="dark:bg-violet-900/30 light:bg-saffron-100 p-3 rounded-lg">
                <LandPlot className="w-6 h-6 dark:text-violet-400 light:text-saffron-500" />
              </div>
              <div>
                <h3 className="text-sm dark:text-gray-400 light:text-light-muted">Places to Visit</h3>
                <p className="dark:text-white light:text-light-text font-medium">{places.length} Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Highlights */}
      {data.culture && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 dark:text-white light:text-light-text">
              <Palette className="w-10 h-10 dark:text-violet-400 light:text-saffron-500" />
              Cultural Heritage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="neo-card p-8">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white light:text-light-text">Art Forms</h3>
                <p className="dark:text-gray-300 light:text-light-muted">{data.culture.art}</p>
              </div>
              <div className="neo-card p-8">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white light:text-light-text">Dance</h3>
                <p className="dark:text-gray-300 light:text-light-muted">{data.culture.dance}</p>
              </div>
              <div className="neo-card p-8">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white light:text-light-text">Festivals</h3>
                <ul className="list-disc list-inside dark:text-gray-300 light:text-light-muted">
                  {data.culture.festivals.map((festival) => (
                    <li key={festival}>{festival}</li>
                  ))}
                </ul>
              </div>
              <div className="neo-card p-8">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white light:text-light-text">Handicrafts</h3>
                <ul className="list-disc list-inside dark:text-gray-300 light:text-light-muted">
                  {data.culture.handicrafts.map((craft) => (
                    <li key={craft}>{craft}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Places to Visit */}
      {places.length > 0 && (
        <div className="dark:bg-gray-800/50 light:bg-saffron-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 dark:text-white light:text-light-text">
                <LandPlot className="w-10 h-10 dark:text-violet-400 light:text-saffron-500" />
                Places to Visit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPlaces.map((place, index) => (
                  <motion.div 
                    key={place.name} 
                    className="neo-card group overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="h-64 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-3 dark:text-white light:text-light-text">{place.name}</h3>
                      <p className="dark:text-gray-300 light:text-light-muted">{place.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {places.length > 3 && (
                <button
                  onClick={() => setShowAllPlaces(!showAllPlaces)}
                  className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-800/30 dark:border-violet-800/30 light:bg-saffron-100 light:text-saffron-700 light:hover:bg-saffron-200 light:border-saffron-200 rounded-lg border transition-colors"
                >
                  {showAllPlaces ? (
                    <>Show Less <ChevronUp className="w-5 h-5" /></>
                  ) : (
                    <>View More Places <ChevronDown className="w-5 h-5" /></>
                  )}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Cuisine */}
      {cuisine.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 dark:text-white light:text-light-text">
              <Utensils className="w-10 h-10 dark:text-violet-400 light:text-saffron-500" />
              Traditional Cuisine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedCuisine.map((dish, index) => (
                <motion.div 
                  key={dish.name} 
                  className="neo-card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white light:text-light-text">{dish.name}</h3>
                    <p className="dark:text-gray-300 light:text-light-muted">{dish.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {cuisine.length > 3 && (
              <button
                onClick={() => setShowAllCuisine(!showAllCuisine)}
                className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-800/30 dark:border-violet-800/30 light:bg-saffron-100 light:text-saffron-700 light:hover:bg-saffron-200 light:border-saffron-200 rounded-lg border transition-colors"
              >
                {showAllCuisine ? (
                  <>Show Less <ChevronUp className="w-5 h-5" /></>
                ) : (
                  <>View More Dishes <ChevronDown className="w-5 h-5" /></>
                )}
              </button>
            )}
          </motion.div>
        </div>
      )}

      {/* History */}
      {data.history && (
        <div className="dark:bg-gray-800/50 light:bg-saffron-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 dark:text-white light:text-light-text">
                <Clock className="w-10 h-10 dark:text-violet-400 light:text-saffron-500" />
                History
              </h2>
              <div className="space-y-8">
                <div className="neo-card p-8">
                  <h3 className="text-2xl font-semibold mb-4 dark:text-violet-400 light:text-saffron-600">Ancient Period</h3>
                  <p className="dark:text-gray-300 light:text-light-muted leading-relaxed mb-6">{data.history.ancient}</p>
                  {!showAllHistory && (
                    <button
                      onClick={() => setShowAllHistory(true)}
                      className="dark:text-violet-400 dark:hover:text-violet-300 light:text-saffron-600 light:hover:text-saffron-700 flex items-center gap-2"
                    >
                      View Detailed Timeline <ChevronDown className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {showAllHistory && (
                  <>
                    <div className="space-y-6">
                      {data.history.details.map((detail, index) => (
                        <motion.div 
                          key={index} 
                          className="neo-card p-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="dark:bg-violet-900/30 dark:text-violet-400 light:bg-saffron-100 light:text-saffron-700 px-3 py-1 rounded-full text-sm">
                              {detail.year}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold mb-2 dark:text-white light:text-light-text">{detail.period} Period</h4>
                              <p className="dark:text-gray-300 light:text-light-muted">{detail.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAllHistory(false)}
                      className="dark:text-violet-400 dark:hover:text-violet-300 light:text-saffron-600 light:hover:text-saffron-700 flex items-center gap-2"
                    >
                      Show Less <ChevronUp className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Latest News */}
      {data.news && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 dark:text-white light:text-light-text">
              <Newspaper className="w-10 h-10 dark:text-violet-400 light:text-saffron-500" />
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.news.map((item, index) => (
                <motion.div 
                  key={item.title} 
                  className="neo-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-2 dark:text-white light:text-light-text">{item.title}</h3>
                  <p className="text-sm dark:text-violet-400 light:text-saffron-600 mb-4">{item.date}</p>
                  <p className="dark:text-gray-300 light:text-light-muted">{item.summary}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Explore More States */}
      {relatedStates.length > 0 && (
        <div className="dark:bg-gray-800/50 light:bg-saffron-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4 dark:text-white light:text-light-text">Explore More {region}</h2>
              <p className="dark:text-gray-300 light:text-light-muted mb-12">Discover other fascinating states in this region</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedStates.map((state, index) => (
                  <motion.div
                    key={state.path}
                    className="group card-3d"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Link to={`/states/${state.path}`}>
                      <div className="relative h-60 rounded-xl overflow-hidden shadow-light-card dark:shadow-none">
                        <img
                          src={state.image}
                          alt={state.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold mb-2 text-white">{state.name}</h3>
                          <p className="text-gray-300 line-clamp-2">{state.description}</p>
                        </div>
                        <div className="absolute inset-0 dark:bg-violet-600/20 light:bg-saffron-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link
                  to="/states"
                  className="neo-button inline-flex items-center gap-2"
                >
                  View All States <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StateDetails;
