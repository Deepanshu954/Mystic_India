
export interface JourneyItineraryDay {
  day: number;
  title: string;
  activities: string[];
  image?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  places?: string[];
  cuisine?: string[];
  artForms?: string[];
  morningActivities?: string[];
  afternoonActivities?: string[];
  eveningActivities?: string[];
  nightActivities?: string[];
}

export interface JourneyDetails {
  days: number;
  state: string;
  itinerary: JourneyItineraryDay[];
  accommodation?: string[];
  cuisine?: string[];
  festivals?: string[];
  heritageSites?: string[];
  travelTips?: string[];
}

export interface Message {
  text: string;
  sender: 'user' | 'bot';
  type?: 'journey' | 'regular' | 'info';
  journeyDetails?: JourneyDetails;
}

export interface StateInfo {
  id: string;
  name: string;
  description?: string;
  region: string;
}

export const CHATBOT_BACKGROUNDS = {
  light: "https://r4.wallpaperflare.com/wallpaper/952/786/491/nature-landscape-forest-river-wallpaper-36399499392b36fdd6e46796616d6c0d.jpg",
  dark: "https://r4.wallpaperflare.com/wallpaper/684/422/438/abstract-3d-digital-art-stu-ballinger-wallpaper-2b965cfd43817fe9f584cbf97d1cfc40.jpg"
};

// Command patterns for the chatbot - enhanced for better recognition
export const COMMAND_PATTERNS = {
  // Main patterns for journey planning
  JOURNEY_PLAN: /(?:plan|create|make|prepare)(?:\s+a)?\s+(\d+)(?:-|\s+)?(?:day|days)(?:\s+(?:journey|trip|tour|travel))?\s+(?:to|in|for|around)\s+([A-Za-z\s]+)/i,
  DAYS_AND_STATE: /(\d+)(?:\s+|\-)?days?(?:\s+(?:in|to|for|at))?\s+([A-Za-z\s]+)/i,
  STATE_ONLY: /^(?:visit\s+)?([A-Za-z\s]+)$/i,
  JUST_DAYS: /^(\d+)(?:\s+|\-)?days?$/i,
  
  // Simple forms and variations
  SIMPLE_STATE: /^([A-Za-z\s]+)$/i,
  SIMPLE_DAYS_STATE: /^(\d+)\s+([A-Za-z\s]+)$/i,
  STATE_DAYS: /^([A-Za-z\s]+)\s+(\d+)(?:\s+days?)?$/i,
  
  // Query patterns
  FOOD_QUERY: /(?:food|eat|cuisine)(?:\s+in)?\s+([A-Za-z\s]+)?/i,
  FESTIVAL_QUERY: /(?:festival|celebrate)(?:\s+in)?\s+([A-Za-z\s]+)?/i,
  WEATHER_QUERY: /(?:weather|climate)(?:\s+in)?\s+([A-Za-z\s]+)?/i,
  TRANSPORT_QUERY: /(?:transport|travel|getting\s+around)(?:\s+in)?\s+([A-Za-z\s]+)?/i
};
