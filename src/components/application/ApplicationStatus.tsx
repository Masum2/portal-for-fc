// components/application/ApplicationStatus.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { Application } from '../../types';

interface ApplicationStatusProps {
  application: Application;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ application }) => {
  const statusSteps = [
    { id: 'Draft', label: 'Draft', icon: '📝', description: 'Application in progress' },
    { id: 'Submitted', label: 'Submitted', icon: '📤', description: 'Submitted to Social Worker' },
    { id: 'SentToSW', label: 'With SW', icon: '👤', description: 'Social Worker reviewing' },
    { id: 'UnderReview', label: 'Under Review', icon: '🔍', description: 'FC Supervisor reviewing' },
    { id: 'Approved', label: 'Approved', icon: '✅', description: 'Application approved' }
  ];

  const getCurrentIndex = () => {
    const index = statusSteps.findIndex(s => s.id === application.status);
    return index !== -1 ? index : 0;
  };

  const currentIndex = getCurrentIndex();

  // Get status color
  const getStatusColor = () => {
    const colors = {
      Draft: 'bg-gray-400',
      Submitted: 'bg-blue-500',
      SentToSW: 'bg-purple-500',
      UnderReview: 'bg-orange-500',
      Approved: 'bg-green-500',
      Rejected: 'bg-red-500'
    };
    return colors[application.status as keyof typeof colors] || 'bg-gray-400';
  };

  const getStatusMessage = () => {
    const messages = {
      Draft: 'Complete all sections and submit your application.',
      Submitted: 'Your application is submitted. Waiting for Social Worker review.',
      SentToSW: 'Social Worker is reviewing your application. You will be notified of any updates.',
      UnderReview: 'FC Supervisor is reviewing your application. This may take 5-7 business days.',
      Approved: '🎉 Congratulations! Your application has been approved.',
      Rejected: '❌ Your application was rejected. Please check the reason and contact SW.'
    };
    return messages[application.status as keyof typeof messages] || '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Application Status
          </h3>
          <p className="text-sm text-gray-500">ID: {application.id}</p>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${getStatusColor()}`}>
          {application.status}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`w-full ${getStatusColor()}`}
          />
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isActive = index === currentIndex;

            return (
              <div key={step.id} className="flex items-start space-x-4">
                {/* Step Circle */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: isActive ? 1.2 : 1,
                      borderColor: isCompleted ? '#3b82f6' : '#d1d5db'
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}
                  >
                    {isCompleted && index < currentIndex ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.icon
                    )}
                  </motion.div>
                </div>

                {/* Step Info */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${
                        isCompleted ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                      >
                        Current
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-6 p-4 rounded-xl ${
          application.status === 'Approved'
            ? 'bg-green-50 border border-green-200'
            : application.status === 'Rejected'
            ? 'bg-red-50 border border-red-200'
            : 'bg-blue-50 border border-blue-200'
        }`}
      >
        <div className="flex items-start space-x-3">
          <span className="text-xl">
            {application.status === 'Approved' ? '🎉' : 
             application.status === 'Rejected' ? '❌' : 'ℹ️'}
          </span>
          <div>
            <p className={`text-sm ${
              application.status === 'Approved'
                ? 'text-green-800'
                : application.status === 'Rejected'
                ? 'text-red-800'
                : 'text-blue-800'
            }`}>
              {getStatusMessage()}
            </p>
            {application.rejectionReason && (
              <p className="text-sm text-red-600 mt-1">
                Reason: {application.rejectionReason}
              </p>
            )}
            {application.approvedBy && (
              <p className="text-xs text-gray-500 mt-1">
                Approved by: {application.approvedBy}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationStatus;