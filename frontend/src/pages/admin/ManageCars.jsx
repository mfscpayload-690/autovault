import { useState, useEffect } from 'react';
import axios from 'axios';
import CarLoader from '../../components/ui/CarLoader';
import CarForm from '../../components/admin/CarForm';
import Modal from '../../components/ui/Modal';

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1 });

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/cars?page=${page}&limit=10`);
      setCars(res.data.cars);
      setPagination(res.data.pagination);
    } catch { setCars([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCars(); }, [page]);

  const handleDelete = async (id) => {
    if (!confirm('Deactivate this car?')) return;
    try {
      await axios.delete(`/api/admin/cars/${id}`, { withCredentials: true });
      fetchCars();
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditCar(null);
    fetchCars();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Cars</h1>
        <button
          onClick={() => { setEditCar(null); setShowForm(true); }}
          className="text-sm px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
        >
          + Add Car
        </button>
      </div>

      {loading ? <CarLoader /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light dark:border-border-dark text-left text-gray-500 dark:text-gray-400">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Brand</th>
                <th className="p-2">Fuel</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.id} className="border-b border-border-light/50 dark:border-border-dark/50">
                  <td className="p-2">{car.id}</td>
                  <td className="p-2 font-medium">{car.car_name} {car.variant || ''}</td>
                  <td className="p-2">{car.brand_name}</td>
                  <td className="p-2">{car.fuel_type}</td>
                  <td className="p-2">{car.price_min_lakh ? `₹${car.price_min_lakh}L` : 'TBA'}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => { setEditCar(car); setShowForm(true); }}
                      className="text-accent hover:underline"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(car.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 text-xs rounded ${p === page ? 'bg-accent text-white' : 'border border-border-light dark:border-border-dark'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditCar(null); }} title={editCar ? 'Edit Car' : 'Add Car'}>
        <CarForm car={editCar} onSave={handleSave} onCancel={() => { setShowForm(false); setEditCar(null); }} />
      </Modal>
    </div>
  );
}
