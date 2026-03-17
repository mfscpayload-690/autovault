export default function UserTable({ users, onToggle }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-light dark:border-border-dark text-left text-gray-500 dark:text-gray-400">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Joined</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b border-border-light/50 dark:border-border-dark/50">
              <td className="p-2">{user.id}</td>
              <td className="p-2 font-medium">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="p-2">
                <span className={`text-xs ${user.is_active ? 'text-green-600' : 'text-red-500'}`}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-2 text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="p-2">
                <button
                  onClick={() => onToggle(user.id)}
                  className={`text-xs ${user.is_active ? 'text-red-500 hover:underline' : 'text-green-600 hover:underline'}`}
                >
                  {user.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
