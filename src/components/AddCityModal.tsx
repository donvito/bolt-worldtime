import React, { useState, useEffect } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { cityList } from '../cityList';

interface AddCityModalProps {
  onClose: () => void;
  onAdd: (city: { name: string; timezone: string; image: string }) => void;
  existingCities: Array<{ name: string; timezone: string; image: string }>;
}

const AddCityModal: React.FC<AddCityModalProps> = ({ onClose, onAdd, existingCities }) => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<{ name: string; timezone: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filteredCities = search
    ? cityList.filter(city => 
        city.name.toLowerCase().includes(search.toLowerCase()) &&
        !existingCities.some(existing => existing.name === city.name)
      )
    : [];

  const handleCitySelect = (city: typeof cityList[0]) => {
    setSelectedCity(city);
    setSearch(city.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCity) {
      setError('Please select a city from the list');
      return;
    }

    setLoading(true);
    try {
      // Fetch a random city image from Unsplash
      const query = encodeURIComponent(selectedCity.name + ' city skyline');
      const imageUrl = `https://source.unsplash.com/featured/400x200/?${query}`;

      onAdd({
        name: selectedCity.name,
        timezone: selectedCity.timezone,
        image: imageUrl
      });
    } catch (err) {
      setError('Failed to add city. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-slate-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Add New City</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Search for a city..."
                autoComplete="off"
              />
            </div>

            {search && filteredCities.length > 0 && !selectedCity && (
              <div className="absolute z-10 mt-1 w-full bg-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-4 py-2 text-left hover:bg-slate-600 focus:bg-slate-600 focus:outline-none"
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading || !selectedCity}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add City'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCityModal;