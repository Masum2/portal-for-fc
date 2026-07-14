// components/dashboard/RecentActivity.tsx
import React from 'react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: 'Application Submitted',
      description: 'New License Application #APP-001 submitted successfully',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      title: 'Document Uploaded',
      description: 'Training Certificate uploaded for review',
      time: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      title: 'License Approved',
      description: 'Your license FCL-2024-001 has been approved',
      time: '2 days ago',
      status: 'success'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      success: 'bg-green-100 text-green-600 border-green-200',
      pending: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      error: 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
              {activity.status === 'success' ? '✅' : activity.status === 'pending' ? '⏳' : '❌'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{activity.title}</p>
              <p className="text-sm text-gray-500 truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;