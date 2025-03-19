
import { ReactNode } from 'react';

interface FeaturedSectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const FeaturedSection = ({ title, subtitle, children }: FeaturedSectionProps) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default FeaturedSection;
