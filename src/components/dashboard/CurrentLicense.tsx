// components/dashboard/CurrentLicense.tsx
import React from 'react';
import type { License } from '../../types';

interface Props {
  license: License;
}

const CurrentLicense: React.FC<Props> = ({ license }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      Active: 'bg-green-100 text-green-800 border-green-200',
      Expired: 'bg-red-100 text-red-800 border-red-200',
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Rejected: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      Active: '✅',
      Expired: '❌',
      Pending: '⏳',
      Rejected: '🚫'
    };
    return icons[status as keyof typeof icons] || '❓';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Current License Information</h3>
        <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(license.status)}`}>
          {getStatusIcon(license.status)} {license.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">License Number</p>
            <p className="text-lg font-bold text-gray-800 font-mono">{license.licenseNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">License Type</p>
            <p className="text-lg font-semibold text-gray-800">{license.type}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Issue Date</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(license.issueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Expiry Date</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(license.expiryDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className={`p-4 rounded-xl ${
          license.status === 'Active' ? 'bg-green-50 text-green-800' :
          license.status === 'Expired' ? 'bg-red-50 text-red-800' :
          'bg-yellow-50 text-yellow-800'
        }`}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {license.status === 'Active' ? '🎉' :
               license.status === 'Expired' ? '⚠️' : '⏳'}
            </span>
            <div>
              <p className="font-medium">
                {license.status === 'Active' && `Your license is active until ${new Date(license.expiryDate).toLocaleDateString()}`}
                {license.status === 'Expired' && 'Your license has expired. Please renew immediately!'}
                {license.status === 'Pending' && 'Your application is being reviewed by the social worker.'}
                {license.status === 'Rejected' && 'Your application was rejected. Please contact social worker.'}
              </p>
              <p className="text-sm opacity-75">
                {license.status === 'Active' && `✅ ${Math.ceil((new Date(license.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days remaining`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentLicense;