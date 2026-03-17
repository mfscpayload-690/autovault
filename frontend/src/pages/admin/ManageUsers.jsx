import { useState, useEffect } from 'react';
import axios from 'axios';
import CarLoader from '../../components/ui/CarLoader';
import UserTable from '../../components/admin/UserTable';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/users', { withCredentials: true });
      setUsers(res.data);
    } catch { setUsers([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggle = async (id) => {
    try {
      await axios.patch(`/api/admin/users/${id}`, {}, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to toggle user');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      {loading ? <CarLoader /> : <UserTable users={users} onToggle={handleToggle} />}
    </div>
  );
}
