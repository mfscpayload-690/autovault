import { useState, useEffect } from 'react';
import axios from 'axios';
import CarLoader from '../../components/ui/CarLoader';
import BrandForm from '../../components/admin/BrandForm';
import Modal from '../../components/ui/Modal';

export default function ManageBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editBrand, setEditBrand] = useState(null);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/brands');
      setBrands(res.data);
    } catch { setBrands([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this brand?')) return;
    try {
      await axios.delete(`/api/admin/brands/${id}`, { withCredentials: true });
      fetchBrands();
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditBrand(null);
    fetchBrands();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Brands</h1>
        <button
          onClick={() => { setEditBrand(null); setShowForm(true); }}
          className="text-sm px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
        >
          + Add Brand
        </button>
      </div>

      {loading ? <CarLoader /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {brands.map(brand => (
            <div key={brand.id} className="flex items-center gap-3 border border-border-light dark:border-border-dark rounded-lg p-3">
              {brand.logo_url && (
                <img
                  src={brand.logo_url}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/favicon.svg';
                  }}
                  className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 object-contain p-1 border border-border-light dark:border-border-dark"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{brand.name}</p>
                <p className="text-xs text-gray-500">{brand.country} {brand.founded_year ? `· Est. ${brand.founded_year}` : ''}</p>
              </div>
              <div className="flex gap-2 text-xs shrink-0">
                <button onClick={() => { setEditBrand(brand); setShowForm(true); }} className="text-accent hover:underline">Edit</button>
                <button onClick={() => handleDelete(brand.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditBrand(null); }} title={editBrand ? 'Edit Brand' : 'Add Brand'}>
        <BrandForm brand={editBrand} onSave={handleSave} onCancel={() => { setShowForm(false); setEditBrand(null); }} />
      </Modal>
    </div>
  );
}
