import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CarLoader from '../../components/ui/CarLoader';

const categories = ['Safety', 'Comfort', 'Technology', 'Infotainment', 'Exterior', 'Interior'];

export default function ManageFeatures() {
  const [features, setFeatures] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);

  const [featureName, setFeatureName] = useState('');
  const [category, setCategory] = useState('Safety');

  const [loading, setLoading] = useState(true);
  const [savingFeature, setSavingFeature] = useState(false);
  const [savingCarFeatures, setSavingCarFeatures] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const groupedFeatures = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = features.filter(f => f.category === cat);
      return acc;
    }, {});
  }, [features]);

  const fetchBase = async () => {
    setLoading(true);
    setError('');
    try {
      const [featuresRes, carsRes] = await Promise.all([
        axios.get('/api/admin/features', { withCredentials: true }),
        axios.get('/api/cars?limit=1000'),
      ]);
      setFeatures(featuresRes.data);
      setCars(carsRes.data.cars || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load features and cars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBase();
  }, []);

  useEffect(() => {
    const fetchCarFeatures = async () => {
      if (!selectedCarId) {
        setSelectedFeatureIds([]);
        return;
      }

      try {
        const res = await axios.get(`/api/cars/${selectedCarId}/features`);
        setSelectedFeatureIds(res.data.map(f => f.id));
      } catch {
        setSelectedFeatureIds([]);
      }
    };

    fetchCarFeatures();
  }, [selectedCarId]);

  const handleCreateFeature = async (e) => {
    e.preventDefault();
    setSavingFeature(true);
    setError('');
    setSuccess('');

    try {
      await axios.post(
        '/api/admin/features',
        {
          feature_name: featureName.trim(),
          category,
        },
        { withCredentials: true }
      );

      setFeatureName('');
      setCategory('Safety');
      setSuccess('Feature created successfully');
      await fetchBase();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Failed to create feature');
    } finally {
      setSavingFeature(false);
    }
  };

  const handleDeleteFeature = async (id) => {
    if (!confirm('Delete this feature?')) return;

    setError('');
    setSuccess('');

    try {
      await axios.delete(`/api/admin/features/${id}`, { withCredentials: true });
      setSuccess('Feature deleted successfully');
      await fetchBase();
      setSelectedFeatureIds(prev => prev.filter(fid => fid !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete feature');
    }
  };

  const toggleFeatureForCar = (featureId) => {
    setSelectedFeatureIds(prev => (
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    ));
  };

  const handleSaveCarFeatures = async () => {
    if (!selectedCarId) return;

    setSavingCarFeatures(true);
    setError('');
    setSuccess('');

    try {
      await axios.patch(
        `/api/admin/cars/${selectedCarId}/features`,
        { feature_ids: selectedFeatureIds },
        { withCredentials: true }
      );
      setSuccess('Car features updated successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update car features');
    } finally {
      setSavingCarFeatures(false);
    }
  };

  if (loading) return <CarLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Manage Features</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Create feature master data and assign features to individual cars.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-2 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-4 py-2 rounded-md">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="border border-border-light dark:border-border-dark rounded-lg p-4 space-y-4">
          <h2 className="font-semibold">Create Feature</h2>
          <form onSubmit={handleCreateFeature} className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Feature Name</label>
              <input
                value={featureName}
                onChange={(e) => setFeatureName(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm rounded border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="e.g., 360-degree Camera"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={savingFeature}
              className="px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-50"
            >
              {savingFeature ? 'Creating...' : '+ Add Feature'}
            </button>
          </form>

          <div>
            <h3 className="font-medium text-sm mb-2">Existing Features</h3>
            <div className="max-h-80 overflow-y-auto border border-border-light dark:border-border-dark rounded-md">
              {features.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No features found.</p>
              ) : (
                <ul className="divide-y divide-border-light dark:divide-border-dark">
                  {features.map((f) => (
                    <li key={f.id} className="p-3 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{f.feature_name}</p>
                        <p className="text-xs text-gray-500">{f.category}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteFeature(f.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className="border border-border-light dark:border-border-dark rounded-lg p-4 space-y-4">
          <h2 className="font-semibold">Assign Features to Car</h2>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Select Car</label>
            <select
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">Choose a car</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand_name} {car.car_name} {car.variant || ''}
                </option>
              ))}
            </select>
          </div>

          {!selectedCarId ? (
            <p className="text-sm text-gray-500">Select a car to edit its feature set.</p>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto border border-border-light dark:border-border-dark rounded-md p-3 space-y-4">
                {categories.map((cat) => (
                  <div key={cat}>
                    <h4 className="text-sm font-semibold mb-2">{cat}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(groupedFeatures[cat] || []).map((f) => (
                        <label key={f.id} className="text-sm flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={selectedFeatureIds.includes(f.id)}
                            onChange={() => toggleFeatureForCar(f.id)}
                            className="mt-0.5"
                          />
                          <span>{f.feature_name}</span>
                        </label>
                      ))}
                      {(groupedFeatures[cat] || []).length === 0 && (
                        <p className="text-xs text-gray-500">No features in this category.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveCarFeatures}
                disabled={savingCarFeatures}
                className="px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-50"
              >
                {savingCarFeatures ? 'Saving...' : 'Save Car Features'}
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
