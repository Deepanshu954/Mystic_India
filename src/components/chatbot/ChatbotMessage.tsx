
import React from 'react';
import { Calendar, Clock, Sun, Moon, Info, Home, Utensils, Music, Camera, MapPin } from 'lucide-react';
import { Message, JourneyDetails } from './types';

interface ChatbotMessageProps {
  message: Message;
  theme: 'light' | 'dark';
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ message, theme }) => {
  if (message.sender === 'user') {
    return (
      <div className="text-right mb-6">
        <div className="inline-block p-3 rounded-lg bg-indigo-600 text-white max-w-[90%]">
          {message.text}
        </div>
      </div>
    );
  }
  
  if (message.type === 'info') {
    return (
      <div className="text-left mb-6">
        <div className="inline-block p-3 rounded-lg bg-amber-50/90 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 max-w-[90%]">
          {message.text}
        </div>
      </div>
    );
  }

  if (message.type === 'journey' && message.journeyDetails) {
    return (
      <div className="text-left mb-6">
        <div className="inline-block p-3 rounded-lg bg-gray-100/80 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 max-w-[90%]">
          {message.text}
          <JourneyContent journeyDetails={message.journeyDetails} theme={theme} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-left mb-6">
      <div className="inline-block p-3 rounded-lg bg-gray-100/80 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 max-w-[90%]">
        {message.text}
      </div>
    </div>
  );
};

const JourneyContent: React.FC<{ journeyDetails: JourneyDetails; theme: 'light' | 'dark' }> = ({ 
  journeyDetails, 
  theme 
}) => {
  return (
    <div className="mt-4 space-y-6">
      {/* Header Section */}
      <div className="bg-indigo-50/90 dark:bg-indigo-900/50 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h4 className="font-semibold">{journeyDetails.days} Days in {journeyDetails.state}</h4>
        </div>
      </div>

      {/* Itinerary */}
      {journeyDetails.itinerary.map((day) => (
        <div key={day.day} className="bg-white/80 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h4 className="font-semibold">Day {day.day}: {day.title}</h4>
          </div>
          <div className="relative h-32 sm:h-40 mb-3 rounded-lg overflow-hidden">
            <img 
              src={day.image} 
              alt={`Day ${day.day}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-xs text-white flex items-center">
              {day.timeOfDay === 'morning' ? (
                <Sun className="w-3 h-3 mr-1" />
              ) : day.timeOfDay === 'afternoon' ? (
                <Sun className="w-3 h-3 mr-1" />
              ) : (
                <Moon className="w-3 h-3 mr-1" />
              )}
              {day.timeOfDay || 'Full day'}
            </div>
          </div>
          <ul className="space-y-2">
            {day.activities.map((activity, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Accommodation */}
        <div className="bg-white/80 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5 text-indigo-600" />
            <h5 className="font-medium">Accommodation Options</h5>
          </div>
          <ul className="space-y-1 text-sm">
            {journeyDetails.accommodation?.map((place, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span>• {place}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cuisine */}
        <div className="bg-white/80 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Utensils className="w-5 h-5 text-indigo-600" />
            <h5 className="font-medium">Must-Try Cuisine</h5>
          </div>
          <ul className="space-y-1 text-sm">
            {journeyDetails.cuisine?.map((food, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span>• {food}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Festivals & Heritage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Festivals */}
        <div className="bg-white/80 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Music className="w-5 h-5 text-indigo-600" />
            <h5 className="font-medium">Festivals & Events</h5>
          </div>
          <ul className="space-y-1 text-sm">
            {journeyDetails.festivals?.map((festival, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span>• {festival}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Heritage Sites */}
        <div className="bg-white/80 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-5 h-5 text-indigo-600" />
            <h5 className="font-medium">Heritage Sites</h5>
          </div>
          <ul className="space-y-1 text-sm">
            {journeyDetails.heritageSites?.map((site, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span>• {site}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Travel Tips */}
      <div className="bg-white/80 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-indigo-600" />
          <h5 className="font-medium">Travel Tips</h5>
        </div>
        <ul className="space-y-1 text-sm">
          {journeyDetails.travelTips?.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span>• {tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatbotMessage;
