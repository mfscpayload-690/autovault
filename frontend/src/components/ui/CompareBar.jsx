import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompare } from '../../context/CompareContext';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#111] border-t border-border-light dark:border-border-dark shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {compareList.map(car => (
              <div key={car.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg shrink-0">
                {car.image_url && (
                  <img src={car.image_url} alt="" className="w-10 h-7 object-cover rounded" />
                )}
                <span className="text-xs font-medium truncate max-w-[100px]">
                  {car.brand_name} {car.car_name}
                </span>
                <button onClick={() => removeFromCompare(car.id)} className="text-gray-400 hover:text-red-500">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={clearCompare} className="text-xs text-gray-500 hover:text-red-500">
              Clear
            </button>
            <button
              onClick={() => navigate('/compare')}
              disabled={compareList.length < 2}
              className="text-xs px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Compare Now ({compareList.length}/3)
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
