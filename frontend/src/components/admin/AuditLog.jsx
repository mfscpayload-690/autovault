export default function AuditLog({ logs }) {
  const actionColors = {
    CREATE: 'text-green-600 dark:text-green-400',
    UPDATE: 'text-yellow-600 dark:text-yellow-400',
    DELETE: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-light dark:border-border-dark text-left text-gray-500 dark:text-gray-400">
            <th className="p-2">Time</th>
            <th className="p-2">Admin</th>
            <th className="p-2">Action</th>
            <th className="p-2">Table</th>
            <th className="p-2">Record ID</th>
            <th className="p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className="border-b border-border-light/50 dark:border-border-dark/50">
              <td className="p-2 text-gray-500 whitespace-nowrap">
                {new Date(log.performed_at).toLocaleString()}
              </td>
              <td className="p-2">{log.admin_name}</td>
              <td className={`p-2 font-medium ${actionColors[log.action] || ''}`}>{log.action}</td>
              <td className="p-2">{log.table_affected}</td>
              <td className="p-2">{log.record_id}</td>
              <td className="p-2 text-xs text-gray-500 max-w-[200px] truncate">
                {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
              </td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">No audit logs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
