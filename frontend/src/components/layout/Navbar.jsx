import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/SearchBar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <svg className="w-8 h-8 text-accent dark:text-accent-dark" viewBox="0 0 32 32" fill="currentColor">
            <rect x="2" y="14" width="28" height="10" rx="3" />
            <circle cx="9" cy="26" r="3" />
            <circle cx="23" cy="26" r="3" />
            <path d="M6 14 L10 6 H22 L26 14" />
          </svg>
          <span className="text-xl font-semibold tracking-tight">AutoVault</span>
        </Link>

        {/* Search — hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-md">
          <SearchBar />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-sm px-3 py-1.5 rounded-md bg-accent text-white hover:bg-accent/90">
                  Admin
                </Link>
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">{user.name}</span>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-400">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="text-sm px-3 py-1.5 rounded-md border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-900">
                Login
              </Link>
              <Link to="/register" className="text-sm px-3 py-1.5 rounded-md bg-accent text-white hover:bg-accent/90">
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border-light dark:border-border-dark px-4 py-3 space-y-3 bg-white dark:bg-[#0F0F0F]">
          <SearchBar />
          {user ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.name}</p>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-sm text-accent">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="text-sm text-red-500">Logout</button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-accent">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm text-accent">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
