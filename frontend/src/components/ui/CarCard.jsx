import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCompare } from '../../context/CompareContext';
import SpecBadge from './SpecBadge';

export default function CarCard({ car, badges = [] }) {
  const { addToCompare, compareList } = useCompare();
  const isInCompare = compareList.some(c => c.id === car.id);

  const priceLabel = car.price_min_lakh
    ? `₹${car.price_min_lakh}L${car.price_max_lakh ? ` – ₹${car.price_max_lakh}L` : ''}`
    : 'Price TBA';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden bg-white dark:bg-[#111] shadow-sm hover:shadow-md transition-shadow"
    >
      <Link to={`/cars/${car.id}`}>
        <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
          {car.image_url ? (
            <img src={car.image_url} alt={car.car_name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
          )}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {badges.slice(0, 2).map(badge => (
                <SpecBadge key={badge} badge={badge} />
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/cars/${car.id}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{car.brand_name}</p>
          <h3 className="font-medium text-sm mt-0.5 truncate">{car.car_name} {car.variant || ''}</h3>
          <p className="text-accent dark:text-accent-dark font-semibold text-sm mt-1">{priceLabel}</p>
        </Link>

        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{car.fuel_type}</span>
          <span>&middot;</span>
          <span>{car.body_type}</span>
          {car.transmission_type && (
            <>
              <span>&middot;</span>
              <span>{car.transmission_type}</span>
            </>
          )}
        </div>

        <button
          onClick={() => addToCompare(car)}
          disabled={isInCompare || compareList.length >= 3}
          className="mt-3 w-full text-xs py-1.5 rounded border border-accent dark:border-accent-dark text-accent dark:text-accent-dark hover:bg-accent/5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isInCompare ? 'Added to compare' : '+ Compare'}
        </button>
      </div>
    </motion.div>
  );
}
