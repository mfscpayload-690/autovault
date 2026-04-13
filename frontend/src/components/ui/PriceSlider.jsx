import { useEffect, useState } from 'react';

const brackets = [
  { min: 5, max: 10, label: 'Budget' },
  { min: 10, max: 20, label: 'Mid' },
  { min: 20, max: 50, label: 'Premium' },
  { min: 50, max: 100, label: 'Luxury' },
];

function formatPrice(val) {
  if (val >= 100) return '₹1Cr';
  return `₹${val}L`;
}

export default function PriceSlider({ min, max, onChange }) {
  const [localMin, setLocalMin] = useState(min || 0);
  const [localMax, setLocalMax] = useState(max || 100);

  useEffect(() => {
    setLocalMin(min || 0);
  }, [min]);

  useEffect(() => {
    setLocalMax(max || 100);
  }, [max]);

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), localMax - 1);
    setLocalMin(val);
    onChange(val, localMax);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), localMin + 1);
    setLocalMax(val);
    onChange(localMin, val);
  };

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>{formatPrice(localMin)}</span>
        <span>{formatPrice(localMax)}</span>
      </div>
      <div className="relative h-6">
        <input
          type="range"
          min={0}
          max={100}
          value={localMin}
          onChange={handleMinChange}
          className="absolute inset-0 w-full pointer-events-auto z-10"
          style={{ background: 'transparent' }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={localMax}
          onChange={handleMaxChange}
          className="absolute inset-0 w-full pointer-events-auto z-20"
          style={{ background: 'transparent' }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {brackets.map(b => (
          <span key={b.label} className="text-[10px] text-gray-400 dark:text-gray-500">{b.label}</span>
        ))}
      </div>
    </div>
  );
}
