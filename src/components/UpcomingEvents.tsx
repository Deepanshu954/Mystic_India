
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface EventProps {
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
  description: string;
}

const events: EventProps[] = [
  {
    title: "Diwali Festival Celebration",
    location: "New Delhi",
    date: "November 12, 2023",
    time: "6:00 PM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1604604789578-88f301bad7f0",
    description: "Experience the festival of lights with traditional ceremonies, performances, and spectacular fireworks."
  },
  {
    title: "Kerala Boat Race",
    location: "Alleppey, Kerala",
    date: "August 8, 2023",
    time: "10:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
    description: "Watch the thrilling snake boat races with teams competing in Kerala's famous backwaters."
  },
  {
    title: "Holi Color Festival",
    location: "Mathura & Vrindavan",
    date: "March 25, 2024",
    time: "9:00 AM - 2:00 PM",
    image: "https://images.unsplash.com/photo-1576401142555-5596ffd1d3ba",
    description: "Join the vibrant celebration of colors and music at one of India's most famous spring festivals."
  }
];

const EventCard: React.FC<EventProps> = ({ title, location, date, time, image, description }) => {
  return (
    <motion.div 
      className="neo-card overflow-hidden flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-white">{title}</h3>
        <p className="text-light-muted dark:text-gray-300 mb-4">{description}</p>
        <div className="mt-auto space-y-2">
          <div className="flex items-center text-light-muted dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-light-muted dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center text-light-muted dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-20 bg-violet-50/50 dark:bg-violet-900/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-white">Upcoming Cultural Events</h2>
            <p className="text-light-muted dark:text-gray-300 max-w-2xl mx-auto">
              Plan your visit around these spectacular cultural celebrations across India
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
