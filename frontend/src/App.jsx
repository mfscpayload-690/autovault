import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import Compare from './pages/Compare';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import ManageCars from './pages/admin/ManageCars';
import ManageBrands from './pages/admin/ManageBrands';
import ManageUsers from './pages/admin/ManageUsers';
import AuditLogs from './pages/admin/AuditLogs';
import CompareBar from './components/ui/CompareBar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cars" element={<ManageCars />} />
            <Route path="brands" element={<ManageBrands />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="audit-logs" element={<AuditLogs />} />
          </Route>
        </Routes>
      </main>
      <CompareBar />
      <Footer />
    </div>
  );
}
