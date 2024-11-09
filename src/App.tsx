import React, { useState } from 'react';
import { Clock as ClockIcon, Plus, Heart, Search } from 'lucide-react';
import { defaultCities } from './cities';
import CityCard from './components/CityCard';
import AddCityModal from './components/AddCityModal';
import TimeZoneSelector from './components/TimeZoneSelector';

function App() {
  const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);
  const [cities, setCities] = useState(defaultCities);
  const [searchQuery, setSearchQuery] = useState('');

  const addCity = (city: typeof defaultCities[0]) => {
    setCities([...cities, city]);
    setShowAddCity(false);
  };

  const removeCity = (cityName: string) => {
    setCities(cities.filter(city => city.name !== cityName));
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold">World Time</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddCity(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add City
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              Settings
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg shadow-xl">
            <TimeZoneSelector
              selectedTimezone={userTimezone}
              onTimezoneChange={setUserTimezone}
            />
          </div>
        )}

        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cities..."
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredCities.map((city) => (
            <CityCard
              key={city.name}
              city={city}
              userTimezone={userTimezone}
              onRemove={removeCity}
            />
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <p>No cities found matching your search.</p>
          </div>
        )}

        {showAddCity && (
          <AddCityModal
            onClose={() => setShowAddCity(false)}
            onAdd={addCity}
            existingCities={cities}
          />
        )}

        <footer className="mt-8 text-center text-sm text-slate-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> by{' '}
            <a 
              href="https://donvitocodes.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              DonvitoCodes
            </a>
            {' • '}
            <a 
              href="https://github.com/donvito" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              GitHub
            </a>
            {' • '}
            <a 
              href="https://x.com/donvito" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              X
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;