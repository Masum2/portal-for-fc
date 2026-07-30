// components/application/NewApplication.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplication } from '../../hooks/useApplication';
import type { ApplicationFormData, DocumentItem } from '../../types/application';

// Eligibility Items for Dropdown
const ELIGIBILITY_ITEMS = [
  'Live Scan Background Check (get from rangers)',
  'Driver License',
  'Car Insurance',
  'Home Evaluation',
  'CPR/First Aid',
  'References - two for each person',
  'Water Safety Agreement',
  'Weapon Safety Agreement',
  'RFA Written Report',
  'Foster Care Training',
  'CA Mandated Reporter Training'
];

// Reusable Custom Dropdown Component for Ultra-Modern UI
interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Header/Trigger Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border rounded-xl flex items-center justify-between cursor-pointer transition shadow-xs ${
          isOpen ? 'border-[#f58220] ring-2 ring-[#f58220]/20' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <span className={`text-sm truncate ${value ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
          {value || placeholder}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-[#1b2679] flex-shrink-0 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </div>

      {/* Modern Popover Options List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto py-2 divide-y divide-gray-50/50 focus:outline-none"
          >
            {/* Optional Default Empty/Placeholder Option */}
            <div
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="px-4 py-2.5 text-xs text-gray-400 hover:bg-gray-50 cursor-pointer transition italic"
            >
              -- Clear Selection --
            </div>

            {options.map((option) => {
              const isSelected = value === option;
              return (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1b2679]/10 text-[#1b2679] font-bold'
                      : 'text-gray-700 hover:bg-[#1b2679]/5 hover:text-[#1b2679]'
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && (
                    <span className="text-[#1b2679] text-xs font-bold bg-white px-2 py-0.5 rounded-md shadow-xs">
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NewApplication: React.FC = () => {
  const { submitApplication, isLoading, error } = useApplication();

  const [formData, setFormData] = useState<ApplicationFormData>({
    licenseStartDate: '',
    licenseStartTime: '',
    applicationType: '',
    licenseType: '',
    bedCapacity: ''
  });

  const [isFormSaved, setIsFormSaved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: '1',
      eligibilityItem: '',
      documentName: '',
      dateReceived: '',
      comments: '',
      file: null
    }
  ]);

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i % 12 || 12;
      const minute = j.toString().padStart(2, '0');
      const ampm = i < 12 ? 'AM' : 'PM';
      timeOptions.push(`${hour}:${minute} ${ampm}`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomSelectChange = (name: keyof ApplicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (id: string, field: keyof DocumentItem, value: any) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, [field]: value } : doc
      )
    );
  };

  const handleFileUpload = (id: string, file: File | null) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, file } : doc
      )
    );
  };

  const addDocumentForm = () => {
    const newId = (documents.length + 1).toString();
    setDocuments([
      ...documents,
      {
        id: newId,
        eligibilityItem: '',
        documentName: '',
        dateReceived: '',
        comments: '',
        file: null
      }
    ]);
  };

  const removeDocumentForm = (id: string) => {
    if (documents.length > 1) {
      setDocuments(docs => docs.filter(doc => doc.id !== id));
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.licenseStartDate || !formData.licenseStartTime || 
        !formData.applicationType || !formData.licenseType || !formData.bedCapacity) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsFormSaved(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitApplication({
      formData,
      documents
    });

    if (result.success) {
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setIsFormSaved(false);
        setFormData({
          licenseStartDate: '',
          licenseStartTime: '',
          applicationType: '',
          licenseType: '',
          bedCapacity: ''
        });
        setDocuments([
          {
            id: '1',
            eligibilityItem: '',
            documentName: '',
            dateReceived: '',
            comments: '',
            file: null
          }
        ]);
      }, 3000);
    } else {
      alert(`Error: ${result.error || 'Failed to submit application'}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Main Form */}
      {!isFormSaved ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl mx-auto"
        >
          <div className="p-6 md:p-8">
            <form onSubmit={handleSaveForm}>
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1b2679] to-[#333333] flex items-center justify-center text-white text-xl shadow-md">
                    📋
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1b2679]">License Information</h3>
                    <p className="text-sm text-gray-500">Fill in the basic license details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Start Date <span className="text-[#a51c30]">*</span>
                    </label>
                    <input
                      type="date"
                      name="licenseStartDate"
                      value={formData.licenseStartDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f58220] focus:border-[#f58220] outline-none transition shadow-xs text-gray-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Start Time <span className="text-[#a51c30]">*</span>
                    </label>
                    <CustomDropdown
                      value={formData.licenseStartTime}
                      onChange={(val) => handleCustomSelectChange('licenseStartTime', val)}
                      options={timeOptions}
                      placeholder="Select Time"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Application Type <span className="text-[#a51c30]">*</span>
                    </label>
                    <CustomDropdown
                      value={formData.applicationType}
                      onChange={(val) => handleCustomSelectChange('applicationType', val)}
                      options={['New', 'Renewal']}
                      placeholder="Select Application Type"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Type <span className="text-[#a51c30]">*</span>
                    </label>
                    <CustomDropdown
                      value={formData.licenseType}
                      onChange={(val) => handleCustomSelectChange('licenseType', val)}
                      options={['FC (Foster Care)', 'Kinship', 'Provisional', 'Therapeutic']}
                      placeholder="Select License Type"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bed Capacity of Children <span className="text-[#a51c30]">*</span>
                    </label>
                    <input
                      type="number"
                      name="bedCapacity"
                      value={formData.bedCapacity}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f58220] focus:border-[#f58220] outline-none transition shadow-xs text-gray-700"
                      placeholder="Enter number of beds available"
                      required
                    />
                  </div>
                </div>

                <div className="bg-[#1b2679]/5 rounded-2xl p-4 border border-[#1b2679]/20 flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#1b2679] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-[#1b2679]">Information</p>
                    <p className="text-sm text-[#1b2679]/80">After saving this information, you will be able to complete the eligibility checklist and upload documents.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#1b2679] to-[#333333] text-white rounded-xl font-bold shadow-lg shadow-[#1b2679]/20 hover:shadow-xl hover:shadow-[#1b2679]/30 transition transform active:scale-[0.99]"
                >
                  Save & Continue →
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : (
        // ========== AFTER SAVE - ELIGIBILITY INFORMATION ==========
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Success Banner */}
          <div className="bg-[#1b2679]/5 border border-[#1b2679]/20 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1b2679] rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-[#1b2679]">Form Saved Successfully!</h4>
                <p className="text-sm text-[#1b2679]/80">Complete the eligibility information and upload documents.</p>
              </div>
            </div>
            <button
              onClick={() => setIsFormSaved(false)}
              className="text-sm px-4 py-2 bg-white border border-[#1b2679]/20 text-[#1b2679] hover:bg-[#1b2679]/10 rounded-xl font-bold transition shadow-xs"
            >
              Edit Info
            </button>
          </div>

          {/* Single Section - Eligibility Information */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200 bg-gradient-to-r from-[#1b2679] to-[#333333] px-6 py-5">
              <div className="flex items-center space-x-3">
                <span className="text-white text-xl">📋</span>
                <div>
                  <h3 className="text-lg font-bold text-white">Eligibility Information</h3>
                  <p className="text-gray-200 text-sm">Complete the checklist and upload required documents</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* ===== ELIGIBILITY DOCUMENTS ===== */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-md font-bold text-[#1b2679]">Eligibility Documents</h4>
                    <p className="text-sm text-gray-500">Upload required documents for eligibility</p>
                  </div>
                  <button
                    type="button"
                    onClick={addDocumentForm}
                    className="px-4 py-2.5 bg-[#1b2679] hover:bg-[#1b2679]/90 text-white text-sm font-bold rounded-xl transition shadow-md flex items-center space-x-2"
                  >
                    <span className="text-lg">+</span>
                    <span>Add Document</span>
                  </button>
                </div>

                {/* Document Forms */}
                <div className="space-y-6">
                  {documents.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 relative shadow-xs"
                    >
                      {/* Remove Button */}
                      {documents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDocumentForm(doc.id)}
                          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-50 text-[#a51c30] hover:bg-red-100 flex items-center justify-center transition"
                          title="Remove Document"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}

                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-2.5 py-1 bg-[#1b2679]/10 text-[#1b2679] font-bold text-xs rounded-lg">
                          Document #{index + 1}
                        </span>
                        <span className="text-xs text-gray-400">- Fill in the details below</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Eligibility Item - Custom Dropdown */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Eligibility Item <span className="text-[#a51c30]">*</span>
                          </label>
                          <CustomDropdown
                            value={doc.eligibilityItem}
                            onChange={(val) => handleDocumentChange(doc.id, 'eligibilityItem', val)}
                            options={ELIGIBILITY_ITEMS}
                            placeholder="Select Eligibility Item"
                          />
                        </div>

                        {/* Document Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Document Name <span className="text-[#a51c30]">*</span>
                          </label>
                          <input
                            type="text"
                            value={doc.documentName}
                            onChange={(e) => handleDocumentChange(doc.id, 'documentName', e.target.value)}
                            placeholder="e.g., Background_Check.pdf"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f58220] focus:border-[#f58220] outline-none transition shadow-xs text-gray-700"
                            required
                          />
                        </div>

                        {/* Document Upload */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Document <span className="text-[#a51c30]">*</span>
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="file"
                              onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#1b2679]/10 file:text-[#1b2679] hover:file:bg-[#1b2679]/20 cursor-pointer"
                              required
                            />
                            {doc.file && (
                              <span className="text-xs text-[#1b2679] font-bold whitespace-nowrap bg-blue-50 px-2 py-1 rounded-md">
                                ✓ {doc.file.name}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Date Received */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date Received <span className="text-[#a51c30]">*</span>
                          </label>
                          <input
                            type="date"
                            value={doc.dateReceived}
                            onChange={(e) => handleDocumentChange(doc.id, 'dateReceived', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f58220] focus:border-[#f58220] outline-none transition shadow-xs text-gray-700"
                            required
                          />
                        </div>

                        {/* Comments - Full Width */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Comments
                          </label>
                          <input
                            type="text"
                            value={doc.comments}
                            onChange={(e) => handleDocumentChange(doc.id, 'comments', e.target.value)}
                            placeholder="Add any additional comments..."
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f58220] focus:border-[#f58220] outline-none transition shadow-xs text-gray-700"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 bg-[#f58220]/10 border border-[#f58220]/20 rounded-2xl p-4 flex items-start space-x-3">
                  <span className="text-lg">📌</span>
                  <div>
                    <p className="text-sm font-bold text-[#f58220]">Note</p>
                    <p className="text-sm text-[#f58220]/80">All fields marked with <span className="text-[#a51c30]">*</span> are required.</p>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[#a51c30] text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-white transition shadow-lg ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-[#1b2679] to-[#333333] hover:shadow-xl hover:shadow-[#1b2679]/30 transform active:scale-[0.99]'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting Application...</span>
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
            <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#1b2679] to-[#333333] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1b2679]/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1b2679]">Application Submitted! 🎉</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Your application has been successfully processed and submitted.
              </p>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="mt-6 w-full px-6 py-3.5 bg-gradient-to-r from-[#1b2679] to-[#333333] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewApplication;