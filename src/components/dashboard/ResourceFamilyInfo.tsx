// components/dashboard/ResourceFamilyInfo.tsx
import React from 'react';

interface ResourceFamilyInfoProps {
  info: {
    name: string;
    structureType: string;
    address: string;
    county: string;
  };
}

const ResourceFamilyInfo: React.FC<ResourceFamilyInfoProps> = ({ info }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <span className="text-2xl">🏠</span>
          <span>Resource Family Information</span>
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Edit
        </button>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-sm text-gray-500">Resource Family Care Name</span>
          <span className="text-sm font-semibold text-gray-800">{info.name}</span>
        </div>

        {/* Structure Type */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-sm text-gray-500">Structure Type</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-800">{info.structureType}</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
              Verified
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-sm text-gray-500">Address</span>
          <span className="text-sm font-semibold text-gray-800 text-right max-w-[200px]">
            {info.address}
          </span>
        </div>

        {/* County */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-500">County</span>
          <span className="text-sm font-semibold text-gray-800">{info.county}</span>
        </div>
      </div>



      {/* Status Indicator */}
      <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center space-x-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm text-green-700">
          All information is verified and up to date
        </span>
      </div>
    </div>
  );
};

export default ResourceFamilyInfo;