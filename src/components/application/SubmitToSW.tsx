// components/application/SubmitToSW.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubmitToSWProps {
  applicationId: string;
  onSuccess?: () => void;
  isSubmitting?: boolean;
}

const SubmitToSW: React.FC<SubmitToSWProps> = ({ 
  applicationId, 
  onSuccess,
  isSubmitting: externalIsSubmitting 
}) => {
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [progress, setProgress] = useState(0);

  const isSubmitting = externalIsSubmitting || internalIsSubmitting;

  const handleSubmit = async () => {
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setInternalIsSubmitting(true);
    setShowConfirm(false);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    try {
      // Simulate API call to existing system
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      clearInterval(interval);
      setProgress(100);
      
      // Notify parent
      setTimeout(() => {
        onSuccess?.();
        setProgress(0);
        setInternalIsSubmitting(false);
      }, 500);
      
    } catch (error) {
      clearInterval(interval);
      setInternalIsSubmitting(false);
      setProgress(0);
      alert('Error sending application. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0">
              📤
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Submit for Approval</h4>
              <p className="text-sm text-gray-600 mt-1 max-w-md">
                Send your application to Social Worker (SW) for final review and approval.
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-500">Application ID:</span>
                <span className="text-xs font-mono font-bold bg-white px-2 py-1 rounded">
                  {applicationId}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-xl font-medium text-white transition whitespace-nowrap ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Sending...</span>
              </span>
            ) : (
              'Send to Social Worker'
            )}
          </button>
        </div>

        {/* Progress Bar */}
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Submitting to Existing System...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
              />
            </div>
          </motion.div>
        )}

        {/* Info Box */}
        <div className="mt-4 p-3 bg-white/60 rounded-xl border border-purple-100">
          <div className="flex items-start space-x-2">
            <span className="text-sm">⚡</span>
            <p className="text-xs text-gray-600">
              <span className="font-medium">Note:</span> The FC Supervisor will review and approve/reject 
              your application in the Existing System. You will receive notifications for updates.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Confirm Submission</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Are you sure you want to submit this application to the Social Worker?
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Application #{applicationId} will be sent to Existing System for approval.
                </p>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition"
                >
                  Confirm Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubmitToSW;