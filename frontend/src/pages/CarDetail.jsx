import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCompare } from '../context/CompareContext';
import CarLoader from '../components/ui/CarLoader';
import SpecBadge from '../components/ui/SpecBadge';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [features, setFeatures] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { addToCompare, compareList } = useCompare();

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const [carRes, featRes, badgeRes] = await Promise.all([
          axios.get(`/api/cars/${id}`),
          axios.get(`/api/cars/${id}/features`),
          axios.get('/api/cars/badges'),
        ]);
        setCar(carRes.data);
        setFeatures(featRes.data);
        setBadges(badgeRes.data[id] || []);

        // Save to recently viewed
        try {
          const recent = JSON.parse(sessionStorage.getItem('autovault-recent') || '[]');
          const filtered = recent.filter(c => c.id !== carRes.data.id);
          filtered.unshift(carRes.data);
          sessionStorage.setItem('autovault-recent', JSON.stringify(filtered.slice(0, 5)));
        } catch { /* empty */ }
      } catch {
        setCar(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <CarLoader />;
  if (!car) return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Car not found</div>;

  const isEV = car.is_electric;
  const tabs = isEV
    ? ['overview', 'battery', 'performance', 'dimensions', 'features']
    : ['overview', 'engine', 'performance', 'transmission', 'dimensions', 'features'];

  const tabLabels = {
    overview: 'Overview',
    engine: 'Engine',
    battery: 'Battery & Range',
    performance: 'Performance',
    transmission: 'Transmission',
    dimensions: 'Dimensions',
    features: 'Features',
  };

  const isInCompare = compareList.some(c => c.id === car.id);
  const priceLabel = car.price_min_lakh
    ? `₹${car.price_min_lakh}L${car.price_max_lakh ? ` – ₹${car.price_max_lakh}L` : ''}`
    : 'Price TBA';

  const specRow = (label, value, unit = '') => {
    if (value === null || value === undefined) return null;
    return (
      <div className="flex justify-between py-2 border-b border-border-light/50 dark:border-border-dark/50 even:bg-gray-50/50 dark:even:bg-gray-900/30 px-2">
        <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
        <span className="font-medium text-sm">{value}{unit}</span>
      </div>
    );
  };

  const featuresByCategory = features.reduce((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/2">
          <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {car.image_url ? (
              <img src={car.image_url} alt={car.car_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="flex items-center gap-2 mb-1">
            {car.brand_logo && (
              <img src={car.brand_logo} alt="" className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 object-contain p-0.5 border border-border-light dark:border-border-dark" />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{car.brand_name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{car.car_name}</h1>
          {car.variant && <p className="text-gray-500 dark:text-gray-400 mt-1">{car.variant}</p>}
          <p className="text-2xl font-bold text-accent dark:text-accent-dark mt-3">{priceLabel}</p>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {badges.map(b => <SpecBadge key={b} badge={b} />)}
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{car.fuel_type}</span>
            <span>&middot;</span>
            <span>{car.body_type}</span>
            {car.transmission_type && (<><span>&middot;</span><span>{car.transmission_type}</span></>)}
            {car.launch_year && (<><span>&middot;</span><span>{car.launch_year}</span></>)}
          </div>

          {car.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{car.description}</p>
          )}

          <button
            onClick={() => addToCompare(car)}
            disabled={isInCompare || compareList.length >= 3}
            className="mt-4 px-5 py-2 text-sm rounded-md border border-accent text-accent dark:border-accent-dark dark:text-accent-dark hover:bg-accent/5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isInCompare ? 'Added to compare' : '+ Add to compare'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-light dark:border-border-dark mb-6">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-accent text-accent dark:text-accent-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Power', value: car.max_power_bhp, unit: ' BHP' },
              { label: 'Torque', value: car.max_torque_nm, unit: ' Nm' },
              { label: 'Top Speed', value: car.top_speed_kmh, unit: ' km/h' },
              { label: '0-100 km/h', value: car.acceleration_0_100_sec, unit: 's' },
              isEV ? { label: 'Range', value: car.range_km, unit: ' km' }
                   : { label: 'Mileage', value: car.fuel_efficiency_kmpl, unit: ' km/l' },
              { label: 'Seating', value: car.seating_capacity, unit: ' seats' },
              { label: 'Boot Space', value: car.boot_space_litres, unit: 'L' },
              { label: 'Weight', value: car.kerb_weight_kg, unit: ' kg' },
            ].filter(s => s.value != null).map(s => (
              <div key={s.label} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{s.label}</p>
                <p className="text-lg font-bold mt-1">{s.value}{s.unit}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'engine' && !isEV && (
          <div className="max-w-md">
            {specRow('Engine Type', car.engine_type)}
            {specRow('Displacement', car.displacement_cc, ' cc')}
            {specRow('Cylinders', car.cylinders)}
            {specRow('Max Power', car.max_power_bhp, ' BHP')}
            {specRow('Max Torque', car.max_torque_nm, ' Nm')}
          </div>
        )}

        {activeTab === 'battery' && isEV && (
          <div className="max-w-md">
            {specRow('Battery Capacity', car.battery_kwh, ' kWh')}
            {specRow('Range', car.range_km, ' km')}
            {specRow('AC Charge Time', car.charge_time_ac_hrs, ' hrs')}
            {specRow('DC Fast Charge', car.charge_time_dc_mins, ' mins')}
            {specRow('Motor Type', car.engine_type)}
            {specRow('Max Power', car.max_power_bhp, ' BHP')}
            {specRow('Max Torque', car.max_torque_nm, ' Nm')}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="max-w-md">
            {specRow('Top Speed', car.top_speed_kmh, ' km/h')}
            {specRow('0-100 km/h', car.acceleration_0_100_sec, ' sec')}
            {!isEV && specRow('Fuel Efficiency', car.fuel_efficiency_kmpl, ' km/l')}
            {isEV && specRow('Range', car.range_km, ' km')}
          </div>
        )}

        {activeTab === 'transmission' && (
          <div className="max-w-md">
            {specRow('Transmission', car.transmission_type)}
            {specRow('Gears', car.num_gears)}
            {specRow('Drive Type', car.drive_type)}
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className="max-w-md">
            {specRow('Length', car.length_mm, ' mm')}
            {specRow('Width', car.width_mm, ' mm')}
            {specRow('Height', car.height_mm, ' mm')}
            {specRow('Wheelbase', car.wheelbase_mm, ' mm')}
            {specRow('Kerb Weight', car.kerb_weight_kg, ' kg')}
            {specRow('Boot Space', car.boot_space_litres, ' L')}
            {specRow('Seating Capacity', car.seating_capacity)}
            {specRow('Ground Clearance', car.ground_clearance_mm, ' mm')}
            {!isEV && specRow('Fuel Tank', car.fuel_tank_litres, ' L')}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            {Object.entries(featuresByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-semibold text-sm mb-2">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {items.map(f => (
                    <div key={f.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f.feature_name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {features.length === 0 && (
              <p className="text-gray-500 text-sm">No features listed for this car.</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
