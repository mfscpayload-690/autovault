import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
        setResults(res.data);
        setOpen(true);
        setActiveIndex(-1);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (id) => {
    setOpen(false);
    setQuery('');
    navigate(`/cars/${id}`);
  };

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex].id);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder="Search cars..."
          className="w-full pl-10 pr-8 py-2 text-sm rounded-lg border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setOpen(false); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((car, idx) => (
            <button
              key={car.id}
              onMouseDown={() => handleSelect(car.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 ${
                idx === activeIndex ? 'bg-gray-50 dark:bg-gray-800' : ''
              }`}
            >
              {car.image_url && (
                <img src={car.image_url} alt="" className="w-12 h-8 object-cover rounded" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{car.brand_name} {car.car_name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{car.body_type} &middot; {car.fuel_type}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
