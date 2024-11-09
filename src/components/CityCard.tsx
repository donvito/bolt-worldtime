import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';

interface CityCardProps {
  city: {
    name: string;
    timezone: string;
    image: string;
  };
  userTimezone: string;
  onRemove: (cityName: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, userTimezone, onRemove }) => {
  const [time, setTime] = useState(new Date());
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cityTime = new Date(time.toLocaleString('en-US', { timeZone: city.timezone }));
  const userTime = new Date(time.toLocaleString('en-US', { timeZone: userTimezone }));
  const timeDiff = Math.round((cityTime.getTime() - userTime.getTime()) / (1000 * 60 * 60));

  const fallbackImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400&h=200";

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-48">
      <img
        src={imageError ? fallbackImage : city.image}
        alt={city.name}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-3">
        <button
          onClick={() => onRemove(city.name)}
          className="absolute top-2 right-2 p-1 hover:bg-black/30 rounded-full transition-colors"
        >
          <X className="w-3 h-3 text-white/70 hover:text-white" />
        </button>
        
        <div className="absolute bottom-3 left-3 right-3">
          <h2 className="text-sm font-semibold text-white mb-1">{city.name}</h2>
          <div className="flex items-baseline gap-2 mb-1">
            <div className="text-2xl font-mono font-bold text-blue-300">
              {format(cityTime, 'hh:mm')}
              <span className="text-sm">{format(cityTime, ':ss')}</span>
            </div>
            <div className="text-sm font-medium text-blue-300/90">
              {format(cityTime, 'a')}
            </div>
          </div>
          <div className="text-xs text-white/70">
            <p>{format(cityTime, 'EEE, MMM d')}</p>
            <p>
              {Math.abs(timeDiff)} hour{Math.abs(timeDiff) !== 1 ? 's' : ''} {timeDiff >= 0 ? 'ahead' : 'behind'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;