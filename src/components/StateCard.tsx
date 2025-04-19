import React from 'react';
import useImageLazyLoad from '../hooks/useImageLazyLoad';

interface StateCardProps {
  state: {
    name: string;
    image: string;
  };
}

const StateCard: React.FC<StateCardProps> = ({ state }) => {
  const { imageSrc, setImageRef, isLoaded, onLoad, onError } = useImageLazyLoad(
    state.image,
    '/images/placeholder.jpg',
    {
      immediate: true,
      priority: true,
      threshold: 0.01,
      rootMargin: '500px'
    }
  );

  return (
    <div className="state-card">
      <div className="state-image-container">
        {!isLoaded ? (
          <div className="image-placeholder" />
        ) : (
          <img 
            ref={setImageRef}
            src={imageSrc} 
            alt={state.name} 
            className="state-image"
            loading="eager"
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
};

export default StateCard; 