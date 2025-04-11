
import { regions, getStateRegion } from '@/data/cultural';
import { festivals } from '@/data/cultural/festivals';
import { heritageSites } from '@/data/cultural/heritageSites';
import { culturalData } from '@/data/culturalData';
import { stateData } from '@/data/stateData';
import { JourneyDetails, JourneyItineraryDay, StateInfo, COMMAND_PATTERNS } from './types';

// Common accommodation options by region
const accommodationByRegion: { [key: string]: string[] } = {
  'north-india': ['Heritage Haveli Stay', 'Mountain Resort', 'Luxury Palace Hotel', 'Boutique Guesthouse'],
  'south-india': ['Beachside Resort', 'Kerala Houseboat', 'Heritage Homestay', 'Plantation Retreat'],
  'east-india': ['Colonial Heritage Hotel', 'Riverside Resort', 'Eco-Friendly Lodge', 'Boutique Retreat'],
  'west-india': ['Desert Camp', 'Palace Hotel', 'Beachfront Resort', 'Heritage Homestay'],
  'central-india': ['Jungle Lodge', 'Heritage Hotel', 'Boutique Stay', 'Wildlife Resort'],
  'northeast-india': ['Mountain Retreat', 'Bamboo Hut Stay', 'Eco Resort', 'Riverside Lodge']
};

// Regional cuisine highlights
const cuisineByRegion: { [key: string]: string[] } = {
  'north-india': ['Butter Chicken & Naan', 'Kebabs & Biryanis', 'Chole Bhature', 'Rajasthani Thali'],
  'south-india': ['Masala Dosa & Idli', 'Kerala Fish Curry', 'Hyderabadi Biryani', 'Appam & Stew'],
  'east-india': ['Bengali Fish Curry', 'Litti Chokha', 'Momos & Thukpa', 'Rasgulla & Sweets'],
  'west-india': ['Gujarati Thali', 'Vada Pav & Street Food', 'Goan Fish Curry', 'Dal Baati Churma'],
  'central-india': ['Poha & Jalebi', 'Bhutte Ka Kees', 'Indori Chaat', 'Rogan Josh'],
  'northeast-india': ['Bamboo Shoot Dishes', 'Smoked Meat Specialties', 'Axone', 'Rice Beer']
};

// Travel tips
const travelTips: string[] = [
  'Carry a refillable water bottle to stay hydrated throughout your journey',
  'Respect local customs and dress modestly, especially when visiting religious sites',
  'Try local street food but ensure it\'s from hygienic and popular vendors',
  'Use ride-sharing apps or pre-paid taxis for convenient and safe transportation',
  'Learn a few basic phrases in the local language to connect with locals',
  'Keep a small medical kit with essential medications for emergencies',
  'Check the weather forecast before planning your daily activities',
  'Carry cash as many small establishments don\'t accept cards',
  'Consider hiring a local guide for authentic insights into the culture and history',
  'Pack light and comfortable clothing suitable for the region\'s climate'
];

// Helper functions
export const getStateDetails = (stateName: string): StateInfo => {
  // Clean and normalize the state name for better matching
  const normalizedName = stateName.toLowerCase().trim().replace(/\s+/g, '-');
  
  // First try to find an exact match by id
  let state = stateData.find(s => s.id.toLowerCase() === normalizedName);
  
  // If no exact match, try partial matches with name
  if (!state) {
    state = stateData.find(s => 
      s.name.toLowerCase() === stateName.toLowerCase().trim() ||
      s.name.toLowerCase().includes(stateName.toLowerCase().trim())
    );
  }
  
  // If still no match, just use what was provided
  if (!state) {
    const fallbackId = normalizedName || 'unknown-state';
    return {
      id: fallbackId,
      name: stateName || 'Unknown State',
      description: `Explore the beauty and culture of ${stateName || 'this region'}`,
      region: getStateRegion(fallbackId) || 'north-india'
    };
  }
  
  return {
    id: state.id,
    name: state.name,
    description: state.description || `Explore the beauty and culture of ${state.name}`,
    region: state.region || getStateRegion(state.id) || 'north-india'
  };
};

export const getStateImage = (stateId: string): string => {
  // Try to get the banner image from stateData first
  const state = stateData.find(s => s.id.toLowerCase() === stateId.toLowerCase());
  if (state && state.bannerImage) {
    return state.bannerImage;
  }
  
  // Fallback to predefined images
  const images: {[key: string]: string} = {
    'rajasthan': 'https://images.unsplash.com/photo-1582972236019-e3d10dae4d3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'kerala': 'https://images.unsplash.com/photo-1589394815804-964a0f200d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'uttar-pradesh': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'default': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  };
  
  return images[stateId.toLowerCase()] || images['default'];
};

export const getStateFestivals = (stateId: string): string[] => {
  const stateFestivals = festivals
    .filter(festival => festival.stateId === stateId)
    .slice(0, 3)
    .map(festival => `${festival.name} (${festival.timing})`);
  
  if (stateFestivals.length > 0) {
    return stateFestivals;
  }
  
  // Fallback to defaults if no state-specific festivals found
  return ['Diwali (October/November)', 'Holi (March)', 'Local Cultural Celebrations (Year-round)'];
};

export const getStateHeritageSites = (stateId: string): string[] => {
  const stateSites = heritageSites
    .filter(site => site.stateId === stateId)
    .slice(0, 3)
    .map(site => site.name);
  
  if (stateSites.length > 0) {
    return stateSites;
  }
  
  // Fallback to some generic heritage sites if none found
  return ['Historical Monuments', 'Ancient Temples', 'Local Heritage Sites'];
};

export const getRandomState = (excludeState: string): string => {
  const popularStates = stateData
    .filter(state => state.id.toLowerCase() !== excludeState.toLowerCase())
    .map(state => state.name);
  
  if (popularStates.length === 0) {
    return 'Rajasthan'; // Fallback
  }
  
  return popularStates[Math.floor(Math.random() * popularStates.length)];
};

export const extractNumbers = (text: string): number[] => {
  const matches = text.match(/\d+/g);
  return matches ? matches.map(match => parseInt(match, 10)) : [];
};

export const extractFirstNumber = (text: string): number | null => {
  const numbers = extractNumbers(text);
  return numbers.length > 0 ? numbers[0] : null;
};

export const parseJourneyRequest = (text: string): { days: number; state: string } | null => {
  // The most common pattern: "plan a X-day journey to Y"
  const journeyMatch = text.match(COMMAND_PATTERNS.JOURNEY_PLAN);
  if (journeyMatch) {
    return {
      days: parseInt(journeyMatch[1]),
      state: journeyMatch[2].trim()
    };
  }
  
  // Simple pattern: "X days in Y"
  const daysStateMatch = text.match(COMMAND_PATTERNS.DAYS_AND_STATE);
  if (daysStateMatch) {
    return {
      days: parseInt(daysStateMatch[1]),
      state: daysStateMatch[2].trim()
    };
  }
  
  // Just a state name, default to 3 days
  const stateOnlyMatch = text.match(COMMAND_PATTERNS.STATE_ONLY);
  if (stateOnlyMatch) {
    const potentialState = stateOnlyMatch[1].trim();
    // Verify this is actually a state name
    const isValidState = stateData.some(s => 
      s.name.toLowerCase().includes(potentialState.toLowerCase()) ||
      s.id.toLowerCase().includes(potentialState.toLowerCase().replace(/\s+/g, '-'))
    );
    
    if (isValidState) {
      return {
        days: 3, // Default to 3 days
        state: potentialState
      };
    }
  }
  
  // Just days mentioned, assume the user wants to specify the state later
  const justDaysMatch = text.match(COMMAND_PATTERNS.JUST_DAYS);
  if (justDaysMatch) {
    return {
      days: parseInt(justDaysMatch[1]),
      state: 'Rajasthan' // Default to a popular state
    };
  }
  
  // Last resort: Try to find any number and any state name
  const days = extractFirstNumber(text) || 3;
  
  // Try to extract a state name by checking if any state name is contained in the text
  for (const state of stateData) {
    if (text.toLowerCase().includes(state.name.toLowerCase()) ||
        text.toLowerCase().includes(state.id.toLowerCase())) {
      return {
        days,
        state: state.name
      };
    }
  }
  
  return null;
};

export const generateJourneyPlan = (days: number, state: StateInfo): JourneyDetails => {
  const stateId = state.id;
  const regionId = state.region || 'north-india';
  
  // Create itinerary based on number of days
  let itinerary: JourneyItineraryDay[] = [];
  const dayTitles = [
    "Arrival & Cultural Immersion",
    "Historical Exploration",
    "Nature & Adventure",
    "Local Culture & Cuisine",
    "Art & Crafts Discovery",
    "Spiritual Journey",
    "Leisure & Relaxation",
    "Wildlife & Natural Beauty",
    "Urban Exploration",
    "Shopping & Souvenirs",
    "Village Life Experience",
    "Festival & Celebrations",
    "Departure Day"
  ];
  
  const morningActivities = [
    "Sunrise visit to famous viewpoint",
    "Morning heritage walk through old town",
    "Visit to local temples/religious sites",
    "Breakfast at a famous local eatery",
    "Early wildlife safari/nature walk",
    "Visit to museums and art galleries",
    "Morning yoga/meditation session"
  ];
  
  const afternoonActivities = [
    "Explore historical monuments/forts",
    "Lunch featuring local delicacies",
    "Shopping for local handicrafts",
    "Visit to cultural village/tribal area",
    "Boating/river cruise experience",
    "Cooking class with local chef",
    "Visit to spice/tea plantations"
  ];
  
  const eveningActivities = [
    "Attend cultural performance/folk dance",
    "Sunset boat ride/viewpoint visit",
    "Food tour of street delicacies",
    "Evening aarti/religious ceremony",
    "Relaxing spa treatment with local herbs",
    "Bonfire with local music and stories",
    "Stargazing in remote locations"
  ];
  
  // Add special city-specific activities
  const specialActivities: {[key: string]: string[]} = {
    'delhi': [
      "Visit the iconic Red Fort",
      "Explore the bustling markets of Chandni Chowk",
      "Tour the Qutub Minar complex",
      "Visit India Gate and Rashtrapati Bhavan",
      "Experience the light and sound show at Purana Qila"
    ],
    'rajasthan': [
      "Desert camel safari with sunset views",
      "Visit the majestic Mehrangarh Fort",
      "Explore the blue city of Jodhpur",
      "Shop for traditional textiles in Jaipur",
      "Take a boat ride on Lake Pichola in Udaipur"
    ],
    'kerala': [
      "Backwater houseboat experience",
      "Ayurvedic spa treatment",
      "Visit tea plantations in Munnar",
      "Explore the spice markets of Kochi",
      "Witness Kathakali dance performance"
    ],
    'goa': [
      "Beach time with water sports",
      "Visit the historic Basilica of Bom Jesus",
      "Enjoy a sunset cruise on the Mandovi River",
      "Explore the spice plantations",
      "Experience the vibrant nightlife"
    ],
    'tamil-nadu': [
      "Visit the magnificent Meenakshi Temple in Madurai",
      "Explore the shore temples of Mahabalipuram",
      "Tour the Thanjavur Brihadeeswarar Temple",
      "Experience Chettinad cuisine and architecture",
      "Visit hill stations like Ooty or Kodaikanal"
    ],
    'himachal-pradesh': [
      "Trek through the stunning mountain trails",
      "Visit the Dalai Lama's residence in McLeod Ganj",
      "Enjoy paragliding in Bir Billing",
      "Experience the local Himachali cuisine",
      "Explore the ancient temples in the hills"
    ],
    'uttar-pradesh': [
      "Visit the iconic Taj Mahal in Agra",
      "Experience the spiritual rituals in Varanasi",
      "Explore the historic Fatehpur Sikri",
      "Attend the evening Ganga Aarti in Varanasi",
      "Tour the architectural wonders of Lucknow"
    ]
  };
  
  for (let i = 0; i < days; i++) {
    const dayNum = i + 1;
    const isFirstDay = dayNum === 1;
    const isLastDay = dayNum === days;
    
    let title = dayTitles[i % dayTitles.length];
    if (isFirstDay) title = "Arrival & Cultural Immersion";
    if (isLastDay) title = "Concluding Experiences & Departure";
    
    const dayActivities = [];
    
    if (isFirstDay) {
      dayActivities.push("Arrive in " + state.name);
      dayActivities.push("Check-in at your accommodation");
      dayActivities.push("Orientation walk to get familiar with surroundings");
    } else if (isLastDay) {
      dayActivities.push("Last-minute souvenir shopping");
      dayActivities.push("Farewell meal at a renowned local restaurant");
      dayActivities.push("Departure and transfer to airport/station");
    } else {
      const morning = morningActivities[Math.floor(Math.random() * morningActivities.length)];
      const afternoon = afternoonActivities[Math.floor(Math.random() * afternoonActivities.length)];
      const evening = eveningActivities[Math.floor(Math.random() * eveningActivities.length)];
      
      dayActivities.push("Morning: " + morning);
      dayActivities.push("Afternoon: " + afternoon);
      dayActivities.push("Evening: " + evening);
    }
    
    // Add one more state-specific activity
    if (!isLastDay) {
      const stateSpecifics = specialActivities[stateId.toLowerCase()] || 
                            ["Special: Visit to a hidden local gem"];
      
      dayActivities.push("Special: " + 
        stateSpecifics[Math.floor(Math.random() * stateSpecifics.length)]);
    }
    
    itinerary.push({
      day: dayNum,
      title: title,
      activities: dayActivities,
      image: getStateImage(stateId),
      timeOfDay: isFirstDay ? 'afternoon' : isLastDay ? 'morning' : undefined
    });
  }
  
  // Get region-specific accommodations and cuisine
  const accommodations = accommodationByRegion[regionId] || accommodationByRegion['north-india'];
  const cuisines = cuisineByRegion[regionId] || cuisineByRegion['north-india'];
  
  // Get state-specific festivals and heritage sites
  const stateFestivals = getStateFestivals(stateId);
  const stateHeritageSites = getStateHeritageSites(stateId);
  
  // Select random travel tips
  const randomTips = [...travelTips]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return {
    days,
    state: state.name,
    itinerary,
    accommodation: accommodations,
    cuisine: cuisines,
    festivals: stateFestivals,
    heritageSites: stateHeritageSites,
    travelTips: randomTips
  };
};

export const getResponseForQuery = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Food/cuisine query with optional state
  const foodMatch = query.match(COMMAND_PATTERNS.FOOD_QUERY);
  if (foodMatch) {
    const stateName = foodMatch[1];
    if (stateName) {
      const state = getStateDetails(stateName);
      const regionId = state.region || 'north-india';
      const cuisines = cuisineByRegion[regionId] || cuisineByRegion['north-india'];
      
      return `In ${state.name}, you must try ${cuisines.join(', ')}. The local cuisine reflects the region's culture and traditions. Ask me to plan a full journey to ${state.name} to experience more!`;
    }
    
    return "Indian cuisine is diverse and varies by region. North India is known for its rich curries and breads, South India for rice-based dishes and dosas, East India for sweets and fish curries, and West India for its vegetarian dishes and street food. I can help you plan a journey with culinary experiences - just ask me to plan a trip to a specific state!";
  }
  
  // Festival query with optional state
  const festivalMatch = query.match(COMMAND_PATTERNS.FESTIVAL_QUERY);
  if (festivalMatch) {
    const stateName = festivalMatch[1];
    if (stateName) {
      const state = getStateDetails(stateName);
      const festivals = getStateFestivals(state.id);
      
      return `${state.name} celebrates wonderful festivals including ${festivals.join(', ')}. Ask me to plan a full journey to ${state.name} to experience the local culture!`;
    }
    
    return "India celebrates numerous festivals throughout the year. Some major ones include Diwali (Festival of Lights), Holi (Festival of Colors), Durga Puja, Ganesh Chaturthi, and many regional celebrations. I can include festival information when planning your journey to a specific state!";
  }
  
  // Weather query with optional state
  const weatherMatch = query.match(COMMAND_PATTERNS.WEATHER_QUERY);
  if (weatherMatch) {
    const stateName = weatherMatch[1];
    if (stateName) {
      const state = getStateDetails(stateName);
      
      // Very basic weather info by region
      const weatherByRegion: {[key: string]: string} = {
        'north-india': `${state.name} typically has hot summers (April-June), cold winters (November-February), and pleasant weather in between. The best time to visit is October-March.`,
        'south-india': `${state.name} has a tropical climate with warm weather year-round. The best months to visit are November to February when it's cooler and less humid.`,
        'east-india': `${state.name} experiences hot summers, moderate winters, and heavy rainfall during monsoon (June-September). October to March is ideal for visiting.`,
        'west-india': `${state.name} has hot summers, mild winters, and receives rainfall during monsoon season. The best time to visit is between October and March.`,
        'central-india': `${state.name} has hot summers and mild winters. Avoid the summer months (April-June) and plan your visit between October and March.`,
        'northeast-india': `${state.name} has moderate climate with rainfall throughout the year. October to April offers the most pleasant weather for visitors.`
      };
      
      return weatherByRegion[state.region] || `${state.name} has varied climate throughout the year. Generally, October to March offers the most pleasant weather for travelers.`;
    }
    
    return "India's climate varies greatly: North India has hot summers (April-June) and cold winters (November-February); South India stays warm year-round with monsoons from June-September; The mountains are cool in summer and snowy in winter; The best time to visit most regions is October-March when the weather is pleasant.";
  }
  
  if (lowerQuery.includes('pack') || lowerQuery.includes('bring')) {
    return "For your Indian journey, pack light, breathable clothes, modest attire for religious sites, comfortable walking shoes, a hat, sunscreen, insect repellent, basic medications, and a universal adapter. Seasonal adjustments are needed - light clothes for summer, layers for winter in the north, and rain gear during monsoon season.";
  }
  
  // Transport query with optional state
  const transportMatch = query.match(COMMAND_PATTERNS.TRANSPORT_QUERY);
  if (transportMatch) {
    const stateName = transportMatch[1];
    if (stateName) {
      const state = getStateDetails(stateName);
      
      return `In ${state.name}, you can get around using local buses, taxis, auto-rickshaws, and ride-sharing apps. Major cities might have metro systems or special tourist buses. For a local experience, try cycle rickshaws in old city areas. Hiring a private car with driver is also popular for comfortable sightseeing.`;
    }
    
    return "India offers diverse transportation options: flights connect major cities; extensive railway network is economical for long distances; buses reach remote areas; taxis, auto-rickshaws, and ride-sharing apps work well within cities; metro systems operate in Delhi, Mumbai, Bangalore, and other major cities. For a local experience, try cycle rickshaws in old city areas.";
  }
  
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('namaste')) {
    return "Namaste! 🙏 I'm your Mystic India Journey Planner. How can I help plan your perfect Indian adventure today?";
  }
  
  return "I can help you plan a customized journey through India! Try asking something specific like 'Plan a 5-day journey to Rajasthan' or 'Create a 3-day trip to Delhi.' I'll create an itinerary with activities, accommodations, and local experiences.";
};

export const generateNewSuggestions = (state: string, days: number): string[] => {
  return [
    `What are the best foods to try in ${state}?`,
    `What should I pack for ${state}?`,
    `Tell me about festivals in ${state}`,
    `Plan a ${days+2}-day journey to ${getRandomState(state)}`
  ];
};
