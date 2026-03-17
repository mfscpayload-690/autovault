import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/ui/CarCard';
import FilterPanel from '../components/ui/FilterPanel';
import CarLoader from '../components/ui/CarLoader';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [badges, setBadges] = useState({});
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState({
    brand: '', fuel: '', body_type: '', transmission: '', minPrice: 0, maxPrice: 100,
  });
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('autovault-recent') || '[]');
      setRecentlyViewed(saved);
    } catch { /* empty */ }
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.brand) params.set('brand', filters.brand);
        if (filters.fuel) params.set('fuel', filters.fuel);
        if (filters.body_type) params.set('body_type', filters.body_type);
        if (filters.transmission) params.set('transmission', filters.transmission);
        if (filters.minPrice > 0) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice < 100) params.set('maxPrice', filters.maxPrice);
        params.set('page', pagination.page);
        params.set('limit', 12);

        const res = await axios.get(`/api/cars?${params.toString()}`);
        setCars(res.data.cars);
        setPagination(res.data.pagination);
      } catch {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters, pagination.page]);

  useEffect(() => {
    axios.get('/api/cars/badges').then(res => setBadges(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          India&apos;s Automobile Specs &amp; Comparison Portal
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Explore, compare, and find your perfect car with detailed specifications
        </p>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Recently viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map(car => (
              <div key={car.id} className="w-56 shrink-0">
                <CarCard car={car} badges={badges[car.id] || []} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main content */}
      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className="w-56 shrink-0 hidden lg:block">
          <FilterPanel filters={filters} onChange={setFilters} />
        </aside>

        {/* Car grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <CarLoader />
          ) : cars.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>No cars found matching your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map(car => (
                  <CarCard key={car.id} car={car} badges={badges[car.id] || []} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setPagination(prev => ({ ...prev, page }))}
                      className={`px-3 py-1 text-sm rounded ${
                        page === pagination.page
                          ? 'bg-accent text-white'
                          : 'border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
