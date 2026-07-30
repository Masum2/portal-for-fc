// components/dashboard/Dashboard.tsx
import React from 'react';
import { dummyLicense } from '../../data/dummyData';
import CurrentLicense from './CurrentLicense';
import ResourceFamilyInfo from './ResourceFamilyInfo';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Resource Family Information
  const resourceFamilyInfo = {
    name: 'Ramsy',
    structureType: 'Married Couple',
    address: '123 Main Street, CA',
    county: 'Alameda County'
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - License Info */}
        <div className="space-y-6 flex flex-col">
          <CurrentLicense license={dummyLicense} />
          
          {/* Action Card: Apply for New License (সরাসরি স্ক্রিনের স্টাইল অনুযায়ী) */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 flex items-center justify-between transition hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#f58220]/10 border border-[#f58220]/20 flex items-center justify-center text-[#f58220]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Apply for New License</h4>
                <p className="text-xs text-gray-500 mt-0.5">Submit a fresh application form easily</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/apply/new')}
              className="px-5 py-2.5 rounded-xl bg-[#25386f] text-white font-semibold text-sm hover:bg-[#1b2679] transition shadow-md"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Right Column - Resource Family Information */}
        <div className="space-y-6">
          <ResourceFamilyInfo info={resourceFamilyInfo} />
        </div>
      </div>

      {/* Application Journey / Timeline Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 lg:p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Application Journey</h3>
        
        <div className="relative">
          {/* Horizontal Line */}
          <div className="absolute top-3 left-4 right-4 h-1 bg-gray-200 z-0"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-start bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#f58220] text-white flex items-center justify-center text-xs font-bold shadow">
                  ✓
                </div>
                <span className="text-xs font-bold text-[#25386f]">Nov 10, 2023</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">Initial Application Submitted</p>
            </div>

            <div className="flex flex-col items-start bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#f58220] text-white flex items-center justify-center text-xs font-bold shadow">
                  ✓
                </div>
                <span className="text-xs font-bold text-[#25386f]">Dec 5, 2023</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">Home Study Completed</p>
            </div>

            <div className="flex flex-col items-start bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#f58220] text-white flex items-center justify-center text-xs font-bold shadow">
                  ✓
                </div>
                <span className="text-xs font-bold text-[#25386f]">Jan 15, 2024</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">License Issued</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;