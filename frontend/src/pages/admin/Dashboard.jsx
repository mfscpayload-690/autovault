import { useState, useEffect } from 'react';
import axios from 'axios';
import CarLoader from '../../components/ui/CarLoader';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [carsRes, brandsRes, usersRes] = await Promise.all([
          axios.get('/api/cars?limit=1'),
          axios.get('/api/brands'),
          axios.get('/api/admin/users', { withCredentials: true }),
        ]);
        setStats({
          totalCars: carsRes.data.pagination?.total || 0,
          totalBrands: brandsRes.data.length,
          totalUsers: usersRes.data.length,
        });
      } catch {
        setStats({ totalCars: 0, totalBrands: 0, totalUsers: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <CarLoader />;

  const cards = [
    { label: 'Total Cars', value: stats.totalCars, color: 'text-accent' },
    { label: 'Brands', value: stats.totalBrands, color: 'text-green-600 dark:text-green-400' },
    { label: 'Users', value: stats.totalUsers, color: 'text-purple-600 dark:text-purple-400' },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(card => (
          <div key={card.label} className="border border-border-light dark:border-border-dark rounded-lg p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
