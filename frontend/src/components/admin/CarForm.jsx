import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';

export default function CarForm({ car, onSave, onCancel }) {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({
    brand_id: '', body_type_id: '', fuel_type_id: '', name: '', variant: '',
    launch_year: '', price_min_lakh: '', price_max_lakh: '', image_url: '', description: '',
    displacement_cc: '', cylinders: '', max_power_bhp: '', max_torque_nm: '',
    compression_ratio: '', engine_type: '', battery_kwh: '', charge_time_ac_hrs: '', charge_time_dc_mins: '',
    top_speed_kmh: '', acceleration_0_100_sec: '', fuel_efficiency_kmpl: '', range_km: '',
    transmission_type: '', num_gears: '', drive_type: '',
    length_mm: '', width_mm: '', height_mm: '', wheelbase_mm: '', kerb_weight_kg: '',
    boot_space_litres: '', seating_capacity: '', ground_clearance_mm: '', fuel_tank_litres: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/brands').then(res => setBrands(res.data)).catch(() => {});
  }, []);

  // Reset form when adding a new car
  useEffect(() => {
    if (!car) {
      setForm({
        brand_id: '', body_type_id: '', fuel_type_id: '', name: '', variant: '',
        launch_year: '', price_min_lakh: '', price_max_lakh: '', image_url: '', description: '',
        displacement_cc: '', cylinders: '', max_power_bhp: '', max_torque_nm: '',
        compression_ratio: '', engine_type: '', battery_kwh: '', charge_time_ac_hrs: '', charge_time_dc_mins: '',
        top_speed_kmh: '', acceleration_0_100_sec: '', fuel_efficiency_kmpl: '', range_km: '',
        transmission_type: '', num_gears: '', drive_type: '',
        length_mm: '', width_mm: '', height_mm: '', wheelbase_mm: '', kerb_weight_kg: '',
        boot_space_litres: '', seating_capacity: '', ground_clearance_mm: '', fuel_tank_litres: '',
      });
      setImageFile(null);
    }
  }, [car]);

  useEffect(() => {
    if (car) {
      const mapped = {};
      for (const key of Object.keys(form)) {
        mapped[key] = car[key] ?? car[key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] ?? '';
      }
      
      // Map view column names to form fields
      if (car.car_name) mapped.name = car.car_name;
      
      // Map brand_name to brand_id
      if (car.brand_name) {
        const brand = brands.find(b => b.name === car.brand_name);
        if (brand) mapped.brand_id = brand.id;
      }
      
      // Map body_type string to body_type_id number
      if (car.body_type) {
        const bodyTypeMap = {
          'Hatchback': 1, 'Sedan': 2, 'SUV': 3, 'Compact SUV': 4, 'MPV': 5,
          'Coupe': 6, 'Convertible': 7, 'Pickup Truck': 8, 'EV Hatchback': 9,
          'EV SUV': 10, 'EV Sedan': 11,
        };
        mapped.body_type_id = bodyTypeMap[car.body_type] || '';
      }
      
      // Map fuel_type string to fuel_type_id number
      if (car.fuel_type) {
        const fuelTypeMap = {
          'Petrol': 1, 'Diesel': 2, 'CNG': 3, 'Hybrid': 4, 'Electric': 5,
        };
        mapped.fuel_type_id = fuelTypeMap[car.fuel_type] || '';
      }
      
      setForm(prev => ({ ...prev, ...mapped }));
    }
  }, [car, brands]);

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const data = imageFile ? new FormData() : {};

      if (imageFile) {
        Object.entries(form).forEach(([k, v]) => { if (v !== '') data.append(k, v); });
        data.append('image', imageFile);
      } else {
        Object.entries(form).forEach(([k, v]) => { if (v !== '') data[k] = v; });
      }

      const config = { withCredentials: true };
      if (imageFile) config.headers = { 'Content-Type': 'multipart/form-data' };

      if (car?.id) {
        await axios.put(`/api/admin/cars/${car.id}`, data, config);
      } else {
        await axios.post('/api/admin/cars', data, config);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full px-2 py-1.5 text-sm rounded border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-accent/30';

  const bodyTypes = [
    { id: 1, name: 'Hatchback' }, { id: 2, name: 'Sedan' }, { id: 3, name: 'SUV' },
    { id: 4, name: 'Compact SUV' }, { id: 5, name: 'MPV' }, { id: 6, name: 'Coupe' },
    { id: 7, name: 'Convertible' }, { id: 8, name: 'Pickup Truck' },
    { id: 9, name: 'EV Hatchback' }, { id: 10, name: 'EV SUV' }, { id: 11, name: 'EV Sedan' },
  ];
  const fuelTypes = [
    { id: 1, name: 'Petrol' }, { id: 2, name: 'Diesel' }, { id: 3, name: 'CNG' },
    { id: 4, name: 'Hybrid' }, { id: 5, name: 'Electric' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500">Brand *</label>
          <select value={form.brand_id} onChange={e => handleChange('brand_id', e.target.value)} required className={inputCls}>
            <option value="">Select</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500">Body Type *</label>
          <select value={form.body_type_id} onChange={e => handleChange('body_type_id', e.target.value)} required className={inputCls}>
            <option value="">Select</option>
            {bodyTypes.map(bt => <option key={bt.id} value={bt.id}>{bt.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500">Fuel Type *</label>
          <select value={form.fuel_type_id} onChange={e => handleChange('fuel_type_id', e.target.value)} required className={inputCls}>
            <option value="">Select</option>
            {fuelTypes.map(ft => <option key={ft.id} value={ft.id}>{ft.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500">Name *</label>
          <input value={form.name} onChange={e => handleChange('name', e.target.value)} required className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-gray-500">Variant</label>
          <input value={form.variant} onChange={e => handleChange('variant', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-gray-500">Launch Year</label>
          <input type="number" value={form.launch_year} onChange={e => handleChange('launch_year', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-gray-500">Price Min (Lakh)</label>
          <input type="number" step="0.01" value={form.price_min_lakh} onChange={e => handleChange('price_min_lakh', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-gray-500">Price Max (Lakh)</label>
          <input type="number" step="0.01" value={form.price_max_lakh} onChange={e => handleChange('price_max_lakh', e.target.value)} className={inputCls} />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500">Description</label>
        <textarea value={form.description} onChange={e => handleChange('description', e.target.value)} rows={2} className={inputCls} />
      </div>

      <ImageUpload imageUrl={form.image_url} onUrlChange={url => handleChange('image_url', url)} onFileChange={setImageFile} />

      <h4 className="font-semibold text-sm pt-2 border-t border-border-light dark:border-border-dark">Engine</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          ['engine_type', 'Engine Type', 'text'],
          ['displacement_cc', 'Displacement (cc)', 'number'],
          ['cylinders', 'Cylinders', 'number'],
          ['max_power_bhp', 'Max Power (BHP)', 'number'],
          ['max_torque_nm', 'Max Torque (Nm)', 'number'],
          ['compression_ratio', 'Compression Ratio', 'text'],
          ['battery_kwh', 'Battery (kWh)', 'number'],
          ['charge_time_ac_hrs', 'AC Charge (hrs)', 'number'],
          ['charge_time_dc_mins', 'DC Charge (mins)', 'number'],
        ].map(([key, label, type]) => (
          <div key={key}>
            <label className="text-xs text-gray-500">{label}</label>
            <input type={type} step="0.01" value={form[key]} onChange={e => handleChange(key, e.target.value)} className={inputCls} />
          </div>
        ))}
      </div>

      <h4 className="font-semibold text-sm pt-2 border-t border-border-light dark:border-border-dark">Performance</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          ['top_speed_kmh', 'Top Speed (km/h)', 'number'],
          ['acceleration_0_100_sec', '0-100 (sec)', 'number'],
          ['fuel_efficiency_kmpl', 'Mileage (km/l)', 'number'],
          ['range_km', 'Range (km)', 'number'],
        ].map(([key, label, type]) => (
          <div key={key}>
            <label className="text-xs text-gray-500">{label}</label>
            <input type={type} step="0.01" value={form[key]} onChange={e => handleChange(key, e.target.value)} className={inputCls} />
          </div>
        ))}
      </div>

      <h4 className="font-semibold text-sm pt-2 border-t border-border-light dark:border-border-dark">Transmission</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          ['transmission_type', 'Transmission', 'text'],
          ['num_gears', 'Gears', 'number'],
          ['drive_type', 'Drive Type', 'text'],
        ].map(([key, label, type]) => (
          <div key={key}>
            <label className="text-xs text-gray-500">{label}</label>
            <input type={type} value={form[key]} onChange={e => handleChange(key, e.target.value)} className={inputCls} />
          </div>
        ))}
      </div>

      <h4 className="font-semibold text-sm pt-2 border-t border-border-light dark:border-border-dark">Dimensions</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          ['length_mm', 'Length (mm)'], ['width_mm', 'Width (mm)'], ['height_mm', 'Height (mm)'],
          ['wheelbase_mm', 'Wheelbase (mm)'], ['kerb_weight_kg', 'Weight (kg)'], ['boot_space_litres', 'Boot (L)'],
          ['seating_capacity', 'Seats'], ['ground_clearance_mm', 'Clearance (mm)'], ['fuel_tank_litres', 'Fuel Tank (L)'],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="text-xs text-gray-500">{label}</label>
            <input type="number" value={form[key]} onChange={e => handleChange(key, e.target.value)} className={inputCls} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-3 border-t border-border-light dark:border-border-dark">
        <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-50">
          {saving ? 'Saving...' : (car ? 'Update' : 'Create')}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-border-light dark:border-border-dark rounded-md">
          Cancel
        </button>
      </div>
    </form>
  );
}
