import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';

export default function BrandForm({ brand, onSave, onCancel }) {
  const [form, setForm] = useState({ name: '', country: '', logo_url: '', founded_year: '' });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (brand) {
      setForm({
        name: brand.name || '',
        country: brand.country || '',
        logo_url: brand.logo_url || '',
        founded_year: brand.founded_year || '',
      });
    }
  }, [brand]);

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

      if (brand?.id) {
        await axios.put(`/api/admin/brands/${brand.id}`, data, config);
      } else {
        await axios.post('/api/admin/brands', data, config);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full px-2 py-1.5 text-sm rounded border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-accent/30';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="text-xs text-gray-500">Name *</label>
        <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} required className={inputCls} />
      </div>
      <div>
        <label className="text-xs text-gray-500">Country</label>
        <input value={form.country} onChange={e => setForm(prev => ({ ...prev, country: e.target.value }))} className={inputCls} />
      </div>
      <div>
        <label className="text-xs text-gray-500">Founded Year</label>
        <input type="number" value={form.founded_year} onChange={e => setForm(prev => ({ ...prev, founded_year: e.target.value }))} className={inputCls} />
      </div>

      <ImageUpload imageUrl={form.logo_url} onUrlChange={url => setForm(prev => ({ ...prev, logo_url: url }))} onFileChange={setImageFile} />

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-50">
          {saving ? 'Saving...' : (brand ? 'Update' : 'Create')}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-border-light dark:border-border-dark rounded-md">Cancel</button>
      </div>
    </form>
  );
}
