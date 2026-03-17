export default function CarLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative w-32 h-16">
        {/* Car body */}
        <svg className="car-loader-svg" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <path
            d="M20 40 L20 28 L35 15 L80 15 L95 28 L100 28 L100 40 Z"
            className="fill-accent dark:fill-accent-dark"
          />
          {/* Windows */}
          <path d="M38 17 L36 26 L55 26 L55 17 Z" className="fill-white/30" />
          <path d="M58 17 L58 26 L78 26 L70 17 Z" className="fill-white/30" />
          {/* Wheels */}
          <g className="animate-spin" style={{ transformOrigin: '32px 42px', animationDuration: '0.6s' }}>
            <circle cx="32" cy="42" r="7" className="fill-gray-800 dark:fill-gray-200" />
            <circle cx="32" cy="42" r="3" className="fill-gray-400 dark:fill-gray-500" />
          </g>
          <g className="animate-spin" style={{ transformOrigin: '85px 42px', animationDuration: '0.6s' }}>
            <circle cx="85" cy="42" r="7" className="fill-gray-800 dark:fill-gray-200" />
            <circle cx="85" cy="42" r="3" className="fill-gray-400 dark:fill-gray-500" />
          </g>
          {/* Exhaust puffs */}
          <circle cx="10" cy="38" r="3" className="fill-gray-300 dark:fill-gray-600 animate-pulse" />
          <circle cx="4" cy="36" r="2" className="fill-gray-200 dark:fill-gray-700 animate-pulse" style={{ animationDelay: '0.3s' }} />
        </svg>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Loading...</p>
      </div>

      <style>{`
        .car-loader-svg {
          animation: carDrive 1.2s ease-in-out infinite alternate;
        }
        @keyframes carDrive {
          0% { transform: translateX(-8px); }
          100% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
