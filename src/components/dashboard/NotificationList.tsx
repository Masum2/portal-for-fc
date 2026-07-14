// components/dashboard/NotificationList.tsx
import React from 'react';
import type { Notification } from '../../types';

interface Props {
  notifications: Notification[];
}

const NotificationList: React.FC<Props> = ({ notifications }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    const icons = {
      Info: 'ℹ️',
      Success: '✅',
      Warning: '⚠️',
      Error: '❌'
    };
    return icons[type as keyof typeof icons] || 'ℹ️';
  };

  const getColor = (type: string) => {
    const colors = {
      Info: 'border-blue-500 bg-blue-50',
      Success: 'border-green-500 bg-green-50',
      Warning: 'border-yellow-500 bg-yellow-50',
      Error: 'border-red-500 bg-red-50'
    };
    return colors[type as keyof typeof colors] || 'border-gray-500 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        {unreadCount > 0 && (
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            {unreadCount} new
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-4xl block mb-2">🔔</span>
          <p className="text-gray-500">No new notifications</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border-l-4 transition hover:shadow-md ${getColor(notif.type)} ${
                notif.read ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-xl">{getIcon(notif.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notif.read && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;