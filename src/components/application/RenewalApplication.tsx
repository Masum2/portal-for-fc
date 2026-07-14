// components/application/RenewalApplication.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dummyLicense } from '../../data/dummyData';
import DocumentUpload from './DocumentUpload';

interface FormData {
  renewalReason: string;
  facilityUpdates: string;
  capacityChange: string;
  additionalInfo: string;
  contactPerson: string;
  phoneNumber: string;
}

const RenewalApplication: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    renewalReason: '',
    facilityUpdates: '',
    capacityChange: '',
    additionalInfo: '',
    contactPerson: '',
    phoneNumber: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { id: 1, title: 'Renewal Info', icon: '🔄' },
    { id: 2, title: 'Documents', icon: '📄' },
    { id: 3, title: 'Review', icon: '📋' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setStep(1);
      setFormData({
        renewalReason: '',
        facilityUpdates: '',
        capacityChange: '',
        additionalInfo: '',
        contactPerson: '',
        phoneNumber: ''
      });
      setAgreed(false);
    }, 3000);
  };

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isStepComplete = () => {
    switch(step) {
      case 1:
        return formData.renewalReason && formData.facilityUpdates;
      case 2:
        return true;
      default:
        return true;
    }
  };

  // Check license status
  const isExpired = new Date(dummyLicense.expiryDate) < new Date();
  const daysUntilExpiry = Math.ceil(
    (new Date(dummyLicense.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  const getStatusInfo = () => {
    if (isExpired) {
      return {
        color: 'from-red-500 to-rose-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: '⚠️',
        title: 'License Expired',
        message: `Your license has expired on ${new Date(dummyLicense.expiryDate).toLocaleDateString()}. Please renew immediately!`
      };
    } else if (daysUntilExpiry <= 30) {
      return {
        color: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: '⏰',
        title: 'Renewal Due Soon',
        message: `Your license will expire in ${daysUntilExpiry} days. Please renew soon!`
      };
    } else {
      return {
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: '✅',
        title: 'License Active',
        message: `Your license is valid until ${new Date(dummyLicense.expiryDate).toLocaleDateString()} (${daysUntilExpiry} days remaining)`
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Renew Your Foster Care License
          </h1>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Complete the renewal process to keep your license active and valid.
          </p>
        </motion.div>
      </div>

      {/* License Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`${statusInfo.bgColor} border ${statusInfo.borderColor} rounded-2xl p-6 mb-8`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${statusInfo.color} flex items-center justify-center text-2xl text-white shadow-lg flex-shrink-0`}>
              {statusInfo.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{statusInfo.title}</h3>
              <p className={`text-sm ${
                isExpired ? 'text-red-600' : 
                daysUntilExpiry <= 30 ? 'text-orange-600' : 
                'text-green-600'
              }`}>
                {statusInfo.message}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm bg-white/50 px-4 py-2 rounded-xl">
            <div>
              <span className="text-gray-500">License #</span>
              <span className="font-bold text-gray-800 ml-1">{dummyLicense.licenseNumber}</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <span className="text-gray-500">Status</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                dummyLicense.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {dummyLicense.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modern Stepper */}
      <div className="mb-10">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((stepItem, index) => (
              <li
                key={stepItem.id}
                className={`relative flex items-center ${
                  index !== steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: step === stepItem.id ? 1.1 : 1 }}
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      step > stepItem.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                        : step === stepItem.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > stepItem.id ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xl">{stepItem.icon}</span>
                    )}
                    
                    {step === stepItem.id && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-30" />
                    )}
                  </motion.div>

                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      step >= stepItem.id ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      Step {stepItem.id}
                    </p>
                    <p className={`text-xs ${
                      step >= stepItem.id ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {stepItem.title}
                    </p>
                  </div>
                </div>

                {index !== steps.length - 1 && (
                  <div className="flex-1 ml-4">
                    <div className={`h-0.5 transition-all duration-500 ${
                      step > stepItem.id ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
                    }`} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Main Form Card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Renewal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
                    🔄
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Renewal Information</h3>
                    <p className="text-sm text-gray-500">Provide details about your renewal request</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reason for Renewal <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="renewalReason"
                      value={formData.renewalReason}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="">Select a reason</option>
                      <option value="Expired">License expired</option>
                      <option value="AboutToExpire">License about to expire</option>
                      <option value="UpdateInfo">Updating information</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Enter contact person name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="+880 1712 345678"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Facility Updates <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="facilityUpdates"
                      value={formData.facilityUpdates}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Describe any changes in your facility, staff, or services..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Change in Capacity?
                    </label>
                    <input
                      type="text"
                      name="capacityChange"
                      value={formData.capacityChange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., Increased from 5 to 8 children"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Any other information you'd like to share..."
                    />
                  </div>
                </div>

                {/* Requirements Box */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                      📋
                    </div>
                    <h4 className="font-bold text-yellow-800">Renewal Requirements</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700">Up-to-date training certificates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700">Valid health certificate (within 6 months)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700">Recent background check (within 1 year)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700">Proof of facility inspection</span>
                    </div>
                    <div className="flex items-center space-x-2 md:col-span-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700">Updated insurance information</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Document Upload */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-lg">
                    📄
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Updated Documents</h3>
                    <p className="text-sm text-gray-500">Upload the necessary documents for renewal</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    Please upload the following updated documents for your license renewal:
                  </p>
                  <DocumentUpload />
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 text-lg">
                    📋
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Review & Submit</h3>
                    <p className="text-sm text-gray-500">Double-check all information before submitting</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <span>📝</span>
                    <span>Renewal Application Summary</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-gray-500">License Number</span>
                      <p className="font-semibold text-gray-800">{dummyLicense.licenseNumber}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-gray-500">Current Expiry</span>
                      <p className="font-semibold text-gray-800">
                        {new Date(dummyLicense.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-gray-500">Renewal Reason</span>
                      <p className="font-semibold text-gray-800">
                        {formData.renewalReason || 'Not specified'}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-gray-500">Contact Person</span>
                      <p className="font-semibold text-gray-800">
                        {formData.contactPerson || 'Not specified'}
                      </p>
                    </div>
                    <div className="md:col-span-2 bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-gray-500">Facility Updates</span>
                      <p className="font-semibold text-gray-800">
                        {formData.facilityUpdates || 'None'}
                      </p>
                    </div>
                    {formData.capacityChange && (
                      <div className="md:col-span-2 bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-gray-500">Capacity Change</span>
                        <p className="font-semibold text-gray-800">{formData.capacityChange}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-blue-800">Important Notes</h4>
                      <ul className="mt-2 text-sm space-y-1 text-gray-700">
                        <li>• Renewal processing may take 5-7 business days</li>
                        <li>• You'll receive notification once approved</li>
                        <li>• Keep your license active by submitting before expiry</li>
                        <li>• You can track status in your dashboard</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className={`flex items-start space-x-3 p-4 rounded-xl transition ${
                  agreed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <input
                    type="checkbox"
                    id="agreed"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="agreed" className="text-sm text-gray-700 cursor-pointer">
                    I confirm that all information provided is accurate and complete. 
                    I understand that providing false information may result in rejection 
                    of my renewal application.
                  </label>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium transition ${
                  step === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ← Back
              </button>

              <div className="flex w-full sm:w-auto space-x-3">
                {step < steps.length && (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepComplete()}
                    className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-medium transition ${
                      isStepComplete()
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/30'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next Step →
                  </button>
                )}

                {step === steps.length && (
                  <button
                    type="submit"
                    disabled={isSubmitting || !agreed}
                    className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-medium text-white transition ${
                      isSubmitting || !agreed
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:shadow-green-600/30'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      'Submit Renewal'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-400">
                Step {step} of {steps.length} • {Math.round((step / steps.length) * 100)}% Complete
              </span>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Renewal Submitted! 🎉</h3>
                <p className="text-gray-500 mt-2">
                  Your renewal application has been successfully submitted. You will receive a confirmation email shortly.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RenewalApplication;