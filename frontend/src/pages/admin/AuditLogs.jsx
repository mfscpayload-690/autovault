import { useState, useEffect } from 'react';
import axios from 'axios';
import CarLoader from '../../components/ui/CarLoader';
import AuditLog from '../../components/admin/AuditLog';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1 });

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/admin/audit-log?page=${page}&limit=20`, { withCredentials: true });
        setLogs(res.data.logs);
        setPagination(res.data.pagination);
      } catch { setLogs([]); }
      finally { setLoading(false); }
    };
    fetchLogs();
  }, [page]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Audit Logs</h1>
      {loading ? <CarLoader /> : <AuditLog logs={logs} />}

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
  );
}
