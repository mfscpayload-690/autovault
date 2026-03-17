const badgeStyles = {
  'Most Fuel Efficient': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Fastest 0–100': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  'Largest Boot': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Best EV Range': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

export default function SpecBadge({ badge }) {
  const style = badgeStyles[badge] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${style}`}>
      {badge}
    </span>
  );
}
