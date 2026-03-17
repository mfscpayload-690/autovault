import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCompare } from '../context/CompareContext';
import CarLoader from '../components/ui/CarLoader';

const specFields = [
  { label: 'Brand', key: 'brand_name' },
  { label: 'Body Type', key: 'body_type' },
  { label: 'Fuel Type', key: 'fuel_type' },
  { label: 'Price (min)', key: 'price_min_lakh', unit: ' Lakh', format: v => `₹${v}` },
  { label: 'Price (max)', key: 'price_max_lakh', unit: ' Lakh', format: v => `₹${v}` },
  { label: 'Launch Year', key: 'launch_year' },
  { label: 'Engine Type', key: 'engine_type' },
  { label: 'Displacement', key: 'displacement_cc', unit: ' cc' },
  { label: 'Max Power', key: 'max_power_bhp', unit: ' BHP', compare: 'max' },
  { label: 'Max Torque', key: 'max_torque_nm', unit: ' Nm', compare: 'max' },
  { label: 'Battery', key: 'battery_kwh', unit: ' kWh' },
  { label: 'Range', key: 'range_km', unit: ' km', compare: 'max' },
  { label: 'Top Speed', key: 'top_speed_kmh', unit: ' km/h', compare: 'max' },
  { label: '0-100 km/h', key: 'acceleration_0_100_sec', unit: ' sec', compare: 'min' },
  { label: 'Fuel Efficiency', key: 'fuel_efficiency_kmpl', unit: ' km/l', compare: 'max' },
  { label: 'Transmission', key: 'transmission_type' },
  { label: 'Gears', key: 'num_gears' },
  { label: 'Drive Type', key: 'drive_type' },
  { label: 'Length', key: 'length_mm', unit: ' mm' },
  { label: 'Width', key: 'width_mm', unit: ' mm' },
  { label: 'Height', key: 'height_mm', unit: ' mm' },
  { label: 'Wheelbase', key: 'wheelbase_mm', unit: ' mm' },
  { label: 'Kerb Weight', key: 'kerb_weight_kg', unit: ' kg' },
  { label: 'Boot Space', key: 'boot_space_litres', unit: ' L', compare: 'max' },
  { label: 'Seating', key: 'seating_capacity' },
  { label: 'Ground Clearance', key: 'ground_clearance_mm', unit: ' mm', compare: 'max' },
  { label: 'Fuel Tank', key: 'fuel_tank_litres', unit: ' L' },
];

function getBestValue(cars, key, mode) {
  const values = cars.map(c => c[key]).filter(v => v != null);
  if (values.length === 0) return null;
  return mode === 'max' ? Math.max(...values) : Math.min(...values);
}

export default function Compare() {
  const { compareList } = useCompare();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (compareList.length < 2) {
      setLoading(false);
      return;
    }

    const ids = compareList.map(c => c.id).join(',');
    axios.get(`/api/compare?ids=${ids}`)
      .then(res => setCars(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, [compareList]);

  if (loading) return <CarLoader />;

  if (compareList.length < 2) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Compare Cars</h2>
        <p className="text-gray-500">Select at least 2 cars to compare. Go back and add cars using the "+ Compare" button.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Compare Cars</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Car header row */}
          <thead>
            <tr>
              <th className="text-left p-3 w-40 text-gray-500 dark:text-gray-400">Specification</th>
              {cars.map(car => (
                <th key={car.id} className="p-3 text-center min-w-[180px]">
                  <div className="flex flex-col items-center gap-2">
                    {car.image_url && (
                      <img src={car.image_url} alt="" className="w-32 h-20 object-cover rounded" />
                    )}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{car.brand_name}</p>
                      <p className="font-semibold">{car.car_name}</p>
                      <p className="text-xs text-gray-500">{car.variant}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {specFields.map(({ label, key, unit, compare, format }) => {
              const hasAnyValue = cars.some(c => c[key] != null);
              if (!hasAnyValue) return null;

              const bestVal = compare ? getBestValue(cars, key, compare) : null;

              return (
                <tr key={key} className="border-t border-border-light/50 dark:border-border-dark/50 even:bg-gray-50/50 dark:even:bg-gray-900/20">
                  <td className="p-3 text-gray-500 dark:text-gray-400 font-medium">{label}</td>
                  {cars.map(car => {
                    const val = car[key];
                    const isBest = compare && val != null && val === bestVal;
                    const displayVal = val != null ? (format ? format(val) : `${val}${unit || ''}`) : '—';

                    return (
                      <td key={car.id} className={`p-3 text-center ${isBest ? 'text-green-600 dark:text-green-400 font-bold' : ''}`}>
                        {displayVal}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
