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
  const hasPriceFilter = (filters.minPrice || 0) > 0 || (filters.maxPrice || 100) < 100;
  const activeCount = [filters.brand, filters.fuel, filters.body_type, filters.transmission]
    .filter(Boolean).length + (hasPriceFilter ? 1 : 0);

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value === filters[key] ? '' : value });
  };

  const clearAll = () => onChange({ brand: '', fuel: '', body_type: '', transmission: '', minPrice: 0, maxPrice: 100 });

  return (
    <div className="space-y-4 rounded-2xl border border-border-light dark:border-border-dark bg-white/70 dark:bg-[#111]/70 backdrop-blur-sm p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wide">Refine Search</h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">Narrow down by specs and budget</p>
        </div>
        <span className="text-[11px] px-2 py-1 rounded-full bg-accent/10 text-accent dark:text-accent-dark font-medium">
          {activeCount} active
        </span>
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filters.brand && (
            <button onClick={() => onChange({ ...filters, brand: '' })} className="text-[11px] px-2 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent dark:text-accent-dark">
              Brand: {filters.brand} ×
            </button>
          )}
          {filters.fuel && (
            <button onClick={() => onChange({ ...filters, fuel: '' })} className="text-[11px] px-2 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent dark:text-accent-dark">
              Fuel: {filters.fuel} ×
            </button>
          )}
          {filters.body_type && (
            <button onClick={() => onChange({ ...filters, body_type: '' })} className="text-[11px] px-2 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent dark:text-accent-dark">
              Body: {filters.body_type} ×
            </button>
          )}
          {filters.transmission && (
            <button onClick={() => onChange({ ...filters, transmission: '' })} className="text-[11px] px-2 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent dark:text-accent-dark">
              Gearbox: {filters.transmission} ×
            </button>
          )}
          {hasPriceFilter && (
            <button onClick={() => onChange({ ...filters, minPrice: 0, maxPrice: 100 })} className="text-[11px] px-2 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent dark:text-accent-dark">
              Price: ₹{filters.minPrice || 0}L-₹{filters.maxPrice || 100}L ×
            </button>
          )}
        </div>
      )}

      {/* Brand filter */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-gray-50/70 dark:bg-gray-900/40 p-3">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Brand</h4>
        <select
          value={filters.brand || ''}
          onChange={e => onChange({ ...filters, brand: e.target.value })}
          className="w-full text-sm px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          <option value="">All Brands</option>
          {brands.map(b => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Fuel type */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-gray-50/70 dark:bg-gray-900/40 p-3">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Fuel Type</h4>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map(f => (
            <button
              key={f}
              onClick={() => handleChange('fuel', f)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                filters.fuel === f
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'border-border-light dark:border-border-dark bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Body type */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-gray-50/70 dark:bg-gray-900/40 p-3">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Body Type</h4>
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map(bt => (
            <button
              key={bt}
              onClick={() => handleChange('body_type', bt)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                filters.body_type === bt
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'border-border-light dark:border-border-dark bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-gray-50/70 dark:bg-gray-900/40 p-3">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Transmission</h4>
        <div className="flex flex-wrap gap-2">
          {transmissions.map(t => (
            <button
              key={t}
              onClick={() => handleChange('transmission', t)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                filters.transmission === t
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'border-border-light dark:border-border-dark bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Price slider */}
      <div className="rounded-xl border border-border-light dark:border-border-dark bg-gray-50/70 dark:bg-gray-900/40 p-3">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Price Range</h4>
        <PriceSlider
          min={filters.minPrice || 0}
          max={filters.maxPrice || 100}
          onChange={(minPrice, maxPrice) => onChange({ ...filters, minPrice, maxPrice })}
        />
      </div>

      {/* Clear all */}
      <button
        onClick={clearAll}
        disabled={activeCount === 0}
        className="w-full text-xs font-medium py-2 rounded-lg border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Clear all filters
      </button>
    </div>
  );
}
