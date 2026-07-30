// components/dashboard/CurrentLicense.tsx
import React from 'react';
import type { License } from '../../types';

interface Props {
  license: License;
}

const CurrentLicense: React.FC<Props> = ({ license }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          bg: 'bg-[#25386f] text-white',
          icon: '✓',
          text: 'ACTIVE',
          border: 'border-[#f58220]'
        };
      case 'Expired':
        return {
          bg: 'bg-[#a51c30] text-white',
          icon: '✕',
          text: 'EXPIRED',
          border: 'border-red-300'
        };
      case 'Pending':
        return {
          bg: 'bg-[#ffc107] text-gray-900',
          icon: '⏳',
          text: 'PENDING',
          border: 'border-yellow-300'
        };
      default:
        return {
          bg: 'bg-gray-800 text-white',
          icon: '•',
          text: status.toUpperCase(),
          border: 'border-gray-300'
        };
    }
  };

  const statusStyle = getStatusBadge(license.status);
  const remainingDays = Math.ceil((new Date(license.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className={`bg-white rounded-3xl border-2 ${statusStyle.border} shadow-xl overflow-hidden flex flex-col justify-between`}>
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">LICENSE STATUS</h3>
      </div>

      {/* Body Content with Central Stamp */}
      <div className="px-6 py-4 flex flex-col items-center justify-center">
        {/* Active Stamp Circular Badge */}
        <div className={`w-32 h-32 rounded-full ${statusStyle.bg} flex flex-col items-center justify-center shadow-inner border-4 border-white my-2`}>
          <span className="text-3xl mb-1">{statusStyle.icon}</span>
          <span className="text-sm font-black tracking-widest">{statusStyle.text}</span>
        </div>
      </div>

      {/* Details Footer Box */}
      <div className="bg-gray-50/80 border-t border-gray-100 p-5 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">License No:</span>
          <span className="font-bold text-gray-800">{license.licenseNumber}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Expiry Date:</span>
          <span className="font-bold text-[#a51c30]">
            {new Date(license.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
          <div className="bg-[#f58220] h-full rounded-full" style={{ width: '75%' }}></div>
        </div>

        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-gray-600 font-medium">Status: <strong className="text-gray-800">Approved</strong></span>
          <span className="text-xs font-bold text-[#f58220]">{remainingDays > 0 ? `${remainingDays} Days Left` : 'Expired'}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentLicense;