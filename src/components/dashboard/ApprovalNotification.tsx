// components/dashboard/ApprovalNotification.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ApprovalNotificationProps {
  applicationId: string;
  status: 'Approved' | 'Rejected';
  message?: string;
  approvedBy?: string;
  onViewApplication?: () => void;
}

const ApprovalNotification: React.FC<ApprovalNotificationProps> = ({
  applicationId,
  status,
  message,
  approvedBy,
  onViewApplication
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-2xl p-6 border ${
        status === 'Approved'
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
          : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
          status === 'Approved'
            ? 'bg-green-200'
            : 'bg-red-200'
        }`}>
          {status === 'Approved' ? '✅' : '❌'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <h4 className={`font-bold ${
              status === 'Approved' ? 'text-green-800' : 'text-red-800'
            }`}>
              {status === 'Approved' ? 'Application Approved!' : 'Application Rejected'}
            </h4>
            <span className="text-xs bg-white/70 px-2 py-0.5 rounded font-mono">
              #{applicationId}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {status === 'Approved' 
              ? 'Your application has been approved by the FC Supervisor.'
              : 'Your application has been rejected by the FC Supervisor.'
            }
          </p>
          {message && (
            <p className="text-sm mt-1 text-gray-500 bg-white/50 px-3 py-1 rounded-lg">
              <span className="font-medium">Reason:</span> {message}
            </p>
          )}
          {approvedBy && (
            <p className="text-xs text-gray-400 mt-1">
              Reviewed by: {approvedBy}
            </p>
          )}
        </div>

        {onViewApplication && (
          <button
            onClick={onViewApplication}
            className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200 whitespace-nowrap"
          >
            View Application
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ApprovalNotification;