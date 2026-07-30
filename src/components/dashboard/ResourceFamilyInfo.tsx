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
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col justify-between h-full">
      <div>
        {/* Header - লোগোর ডার্ক ব্লু এবং গ্রে এর ব্যবহার */}
        <div className="bg-gradient-to-r from-[#1b2679] to-[#333333] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shadow-inner">
              🏠
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Resource Family</h3>
              <p className="text-gray-300 text-sm">Registered Information</p>
            </div>
          </div>

          <button className="px-4 py-2 rounded-xl bg-[#f58220] text-white text-sm font-semibold hover:bg-[#e0751d] transition shadow-md">
            Edit
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium">Name</span>
            <span className="font-bold text-[#1b2679]">{info.name}</span>
          </div>

          {/* Structure Type */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium">Structure Type</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1b2679]">{info.structureType}</span>
              <span className="px-3 py-1 rounded-full bg-[#ffc107] text-[#1b2679] text-xs font-bold shadow-xs">
                ✓ Verified
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex justify-between items-start">
            <span className="text-gray-500 text-sm font-medium">Address</span>
            <span className="font-semibold text-[#1b2679] text-right max-w-[220px]">
              {info.address}
            </span>
          </div>

          {/* County */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium">County</span>
            <span className="font-semibold text-[#1b2679]">{info.county}</span>
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="mx-6 mb-6 rounded-2xl bg-orange-50/50 border-l-4 border-[#f58220] p-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#f58220] animate-pulse"></div>
          <div>
            <p className="font-bold text-[#1b2679]">Information Verified</p>
            <p className="text-sm text-gray-600">
              All resource family information is verified and up to date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceFamilyInfo;