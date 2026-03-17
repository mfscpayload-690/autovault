import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CarLoader from '../ui/CarLoader';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/cars', label: 'Cars' },
  { to: '/admin/brands', label: 'Brands' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/audit-logs', label: 'Audit Logs' },
];

export default function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) return <CarLoader />;
  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Sidebar */}
      <aside className="w-48 shrink-0 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <nav className="space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
