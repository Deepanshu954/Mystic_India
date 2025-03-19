
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  location: string;
  rating: number;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Exploring Rajasthan was a dream come true. The vibrant colors, rich history, and warm hospitality made it an unforgettable journey.",
    author: "Sarah Johnson",
    location: "USA",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    quote: "Kerala's backwaters are truly magical. The serene beauty and authentic cultural experiences exceeded all my expectations.",
    author: "Michael Chen",
    location: "Canada",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    quote: "From the Himalayas to the beaches of Goa, India's diversity is astounding. Each state offers something unique and beautiful.",
    author: "Emma Parker",
    location: "UK",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const TestimonialCard: React.FC<TestimonialProps & { index: number }> = ({ quote, author, location, rating, image, index }) => {
  return (
    <motion.div
      className="neo-card p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      
      <p className="italic text-light-text dark:text-gray-300 mb-6">"{quote}"</p>
      
      <div className="flex items-center">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-light-text dark:text-white">{author}</h4>
          <p className="text-sm text-light-muted dark:text-gray-400">{location}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-white">Traveler Experiences</h2>
          <p className="text-light-muted dark:text-gray-300 max-w-2xl mx-auto">
            Hear what visitors from around the world have to say about their journey through incredible India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
