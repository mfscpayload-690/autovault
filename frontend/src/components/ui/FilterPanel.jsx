import { useState, useEffect } from 'react';
import axios from 'axios';
import PriceSlider from './PriceSlider';

export default function FilterPanel({ filters, onChange }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get('/api/brands').then(res => setBrands(res.data)).catch(() => {});
  }, []);

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const bodyTypes = ['Hatchback', 'Sedan', 'SUV', 'Compact SUV', 'MPV', 'Coupe'];
  const transmissions = ['Manual', 'Automatic', 'CVT', 'DCT', 'AMT'];

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value === filters[key] ? '' : value });
  };

  return (
    <div className="space-y-5">
      {/* Brand filter */}
      <div>
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Brand</h4>
        <select
          value={filters.brand || ''}
          onChange={e => onChange({ ...filters, brand: e.target.value })}
          className="w-full text-sm px-3 py-2 rounded-md border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <option value="">All Brands</option>
          {brands.map(b => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Fuel type */}
      <div>
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Fuel Type</h4>
        <div className="flex flex-wrap gap-1.5">
          {fuelTypes.map(f => (
            <button
              key={f}
              onClick={() => handleChange('fuel', f)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.fuel === f
                  ? 'bg-accent text-white border-accent'
                  : 'border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Body type */}
      <div>
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Body Type</h4>
        <div className="flex flex-wrap gap-1.5">
          {bodyTypes.map(bt => (
            <button
              key={bt}
              onClick={() => handleChange('body_type', bt)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.body_type === bt
                  ? 'bg-accent text-white border-accent'
                  : 'border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Transmission</h4>
        <div className="flex flex-wrap gap-1.5">
          {transmissions.map(t => (
            <button
              key={t}
              onClick={() => handleChange('transmission', t)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.transmission === t
                  ? 'bg-accent text-white border-accent'
                  : 'border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Price slider */}
      <div>
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Price Range</h4>
        <PriceSlider
          min={filters.minPrice || 0}
          max={filters.maxPrice || 100}
          onChange={(minPrice, maxPrice) => onChange({ ...filters, minPrice, maxPrice })}
        />
      </div>

      {/* Clear all */}
      <button
        onClick={() => onChange({ brand: '', fuel: '', body_type: '', transmission: '', minPrice: 0, maxPrice: 100 })}
        className="text-xs text-red-500 hover:text-red-400"
      >
        Clear all filters
      </button>
    </div>
  );
}
