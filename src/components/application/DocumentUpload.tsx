// components/application/DocumentUpload.tsx
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface DocumentFile {
  id: string;
  name: string;
  description: string;
  file: File | null;
  uploaded: boolean;
}

const DocumentUpload: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>([
    { id: '1', name: 'National ID / Passport', description: 'Clear copy of your national ID or passport', file: null, uploaded: false },
    { id: '2', name: 'Training Certificate', description: 'Foster care training completion certificate', file: null, uploaded: false },
    { id: '3', name: 'Health Certificate', description: 'Medical fitness certificate from registered physician', file: null, uploaded: false },
    { id: '4', name: 'Background Check Report', description: 'Police clearance certificate (within 6 months)', file: null, uploaded: false },
    { id: '5', name: 'Home Inspection Report', description: 'Recent home safety inspection report', file: null, uploaded: false }
  ]);

  const [isDragging, setIsDragging] = useState<string | null>(null);

  const handleFileChange = (id: string, file: File | null) => {
    if (file) {
      setDocuments(docs =>
        docs.map(doc =>
          doc.id === id ? { ...doc, file, uploaded: true } : doc
        )
      );
    }
  };

  const handleRemoveFile = (id: string) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, file: null, uploaded: false } : doc
      )
    );
  };

  const handleDrop = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    setIsDragging(null);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(id, files[0]);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const uploadedCount = documents.filter(d => d.uploaded).length;

  return (
    <div className="space-y-6">
      {/* Upload Progress */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Documents Uploaded</span>
          <span className="text-sm font-bold text-purple-600">{uploadedCount} / {documents.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(uploadedCount / documents.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border-2 transition ${
              doc.uploaded
                ? 'border-green-200 bg-green-50'
                : 'border-dashed border-gray-300 bg-gray-50 hover:border-purple-300'
            }`}
            onDrop={(e) => handleDrop(e, doc.id)}
            onDragOver={handleDragOver}
            onDragEnter={() => setIsDragging(doc.id)}
            onDragLeave={() => setIsDragging(null)}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {doc.uploaded ? '✅' : '📄'}
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{doc.name}</h4>
                    <p className="text-xs text-gray-500">{doc.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                {doc.uploaded ? (
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                      {doc.file?.name || 'Uploaded'}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(doc.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex-1 sm:flex-none">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <span className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl transition cursor-pointer w-full sm:w-auto ${
                      isDragging === doc.id
                        ? 'bg-purple-100 text-purple-700 border-2 border-purple-400'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}>
                      {isDragging === doc.id ? 'Drop here' : 'Choose File'}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-start space-x-3">
        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-800">Supported Formats</p>
          <p className="text-sm text-blue-700">Upload PDF, JPG, PNG, DOC, or DOCX files (Max size: 5MB per file)</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;