// components/application/NewApplication.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  licenseStartDate: string;
  licenseStartTime: string;
  applicationType: string;
  licenseType: string;
  bedCapacity: string;
}

interface EligibilityItem {
  id: string;
  description: string;
  completed: boolean;
  comments: string;
}

interface DocumentItem {
  id: string;
  eligibilityItem: string;
  documentName: string;
  dateReceived: string;
  comments: string;
  file: File | null;
}

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

const NewApplication: React.FC = () => {
  // Main Form State
  const [formData, setFormData] = useState<FormData>({
    licenseStartDate: '',
    licenseStartTime: '',
    applicationType: '',
    licenseType: '',
    bedCapacity: ''
  });

  // Tab State
  const [activeTab, setActiveTab] = useState<'eligibility' | 'documents'>('eligibility');
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Eligibility Checklist State
  const [eligibilityItems, setEligibilityItems] = useState<EligibilityItem[]>([
    { id: '1', description: 'Live Scan Background Check (get from rangers)', completed: false, comments: '' },
    { id: '2', description: 'Driver License', completed: false, comments: '' },
    { id: '3', description: 'Car Insurance', completed: false, comments: '' },
    { id: '4', description: 'Home Evaluation', completed: false, comments: '' },
    { id: '5', description: 'CPR/First Aid', completed: false, comments: '' },
    { id: '6', description: 'References - two for each person', completed: false, comments: '' },
    { id: '7', description: 'Water Safety Agreement', completed: false, comments: '' },
    { id: '8', description: 'Weapon Safety Agreement', completed: false, comments: '' },
    { id: '9', description: 'RFA Written Report', completed: false, comments: '' },
    { id: '10', description: 'Foster Care Training', completed: false, comments: '' },
    { id: '11', description: 'CA Mandated Reporter Training', completed: false, comments: '' }
  ]);

  // Documents State - Single form
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

  // Time options for dropdown
  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i % 12 || 12;
      const minute = j.toString().padStart(2, '0');
      const ampm = i < 12 ? 'AM' : 'PM';
      timeOptions.push(`${hour}:${minute} ${ampm}`);
    }
  }

  // Handle main form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle eligibility checkbox change
  const handleEligibilityChange = (id: string, field: 'completed' | 'comments', value: any) => {
    setEligibilityItems(items =>
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle document change
  const handleDocumentChange = (id: string, field: keyof DocumentItem, value: any) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, [field]: value } : doc
      )
    );
  };

  // Handle file upload
  const handleFileUpload = (id: string, file: File | null) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, file } : doc
      )
    );
  };

  // Add new document form
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

  // Remove document form
  const removeDocumentForm = (id: string) => {
    if (documents.length > 1) {
      setDocuments(docs => docs.filter(doc => doc.id !== id));
    }
  };

  // Save main form and show tabs
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.licenseStartDate || !formData.licenseStartTime || 
        !formData.applicationType || !formData.licenseType || !formData.bedCapacity) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsFormSaved(true);
  };

  // Submit entire application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setIsFormSaved(false);
      setActiveTab('eligibility');
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
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      {/* <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Apply for Foster Care License
          </h1>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Complete the form below to start your license application process.
          </p>
        </motion.div>
      </div> */}

      {/* Main Form */}
      {!isFormSaved ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl mx-auto"
        >
          <div className="p-6 md:p-8">
            <form onSubmit={handleSaveForm}>
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
                    📋
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">License Information</h3>
                    <p className="text-sm text-gray-500">Fill in the basic license details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="licenseStartDate"
                      value={formData.licenseStartDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Start Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="licenseStartTime"
                      value={formData.licenseStartTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="">Select Time</option>
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Application Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="applicationType"
                      value={formData.applicationType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="">Select Application Type</option>
                      <option value="New">New</option>
                      <option value="Renewal">Renewal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="licenseType"
                      value={formData.licenseType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="">Select License Type</option>
                      <option value="FC">FC (Foster Care)</option>
                      <option value="Kinship">Kinship</option>
                      <option value="Provisional">Provisional</option>
                      <option value="Therapeutic">Therapeutic</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bed Capacity of Children <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="bedCapacity"
                      value={formData.bedCapacity}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Enter number of beds available"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Information</p>
                    <p className="text-sm text-blue-700">After saving this information, you will be able to complete the eligibility checklist and upload documents.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-600/30 transition"
                >
                  Save & Continue →
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : (
        // ========== AFTER SAVE - TAB SECTION ==========
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Success Banner */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Form Saved Successfully!</h4>
                <p className="text-sm text-green-700">Complete the eligibility checklist and upload documents.</p>
              </div>
            </div>
            <button
              onClick={() => setIsFormSaved(false)}
              className="text-sm text-green-700 hover:text-green-900 font-medium"
            >
              Edit Info
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('eligibility')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                    activeTab === 'eligibility'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>✅</span>
                    <span>Eligibility Checklist</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                    activeTab === 'documents'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>📄</span>
                    <span>Eligibility Documents</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* ===== TAB 1: ELIGIBILITY CHECKLIST ===== */}
              {activeTab === 'eligibility' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Eligibility Checklist</h3>
                      <p className="text-sm text-gray-500">Complete the requirements (select any one or more)</p>
                    </div>
             
                  </div>

             

                  {/* Table */}
                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            Completed
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                            Comments
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {eligibilityItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={(e) => handleEligibilityChange(item.id, 'completed', e.target.checked)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {item.description}
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={item.comments}
                                onChange={(e) => handleEligibilityChange(item.id, 'comments', e.target.value)}
                                placeholder="Add comments..."
                                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3">
                    <span className="text-lg">💡</span>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Note</p>
                      <p className="text-sm text-yellow-700">You can select any one or more items. All items are optional.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===== TAB 2: ELIGIBILITY DOCUMENTS - FORM LAYOUT ===== */}
              {activeTab === 'documents' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Eligibility Documents</h3>
                      <p className="text-sm text-gray-500">Upload required documents for eligibility</p>
                    </div>
                    <button
                      onClick={addDocumentForm}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition flex items-center space-x-2"
                    >
                      <span>+</span>
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
                        className="border border-gray-200 rounded-xl p-6 bg-gray-50 relative"
                      >
                        {/* Remove Button */}
                        {documents.length > 1 && (
                          <button
                            onClick={() => removeDocumentForm(doc.id)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}

                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-sm font-medium text-gray-500">Document #{index + 1}</span>
                          <span className="text-xs text-gray-400">- Fill in the details below</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Eligibility Item - Dropdown */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Eligibility Item <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={doc.eligibilityItem}
                              onChange={(e) => handleDocumentChange(doc.id, 'eligibilityItem', e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                              required
                            >
                              <option value="">Select Eligibility Item</option>
                              {ELIGIBILITY_ITEMS.map((item) => (
                                <option key={item} value={item}>{item}</option>
                              ))}
                            </select>
                          </div>

                          {/* Document Name */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Document Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={doc.documentName}
                              onChange={(e) => handleDocumentChange(doc.id, 'documentName', e.target.value)}
                              placeholder="e.g., Background_Check.pdf"
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                              required
                            />
                          </div>

                          {/* Document Upload */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Document <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center space-x-3">
                              <input
                                type="file"
                                onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                                className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                required
                              />
                              {doc.file && (
                                <span className="text-xs text-green-600 whitespace-nowrap">
                                  ✓ {doc.file.name}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Date Received */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Date Received <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              value={doc.dateReceived}
                              onChange={(e) => handleDocumentChange(doc.id, 'dateReceived', e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3">
                    <span className="text-lg">📌</span>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Note</p>
                      <p className="text-sm text-yellow-700">All fields marked with <span className="text-red-500">*</span> are required.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-medium text-white transition ${
                    isSubmitting
                      ? 'bg-gray-300 cursor-not-allowed'
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
            <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Application Submitted! 🎉</h3>
                <p className="text-gray-500 mt-2">
                  Your application has been successfully submitted. You will receive a confirmation email shortly.
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

export default NewApplication;