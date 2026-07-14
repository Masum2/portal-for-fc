// components/application/EligibilityChecklist.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

const EligibilityChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 'age', label: 'Age Requirement', description: 'Must be at least 21 years old', checked: false },
    { id: 'training', label: 'Training Program', description: 'Completed foster care training program', checked: false },
    { id: 'health', label: 'Health Certificate', description: 'Valid health certificate from authorized physician', checked: false },
    { id: 'background', label: 'Background Check', description: 'Clear criminal background check', checked: false },
    { id: 'experience', label: 'Experience', description: 'Minimum 1 year of childcare experience', checked: false },
    { id: 'home', label: 'Home Inspection', description: 'Passed home safety inspection', checked: false }
  ]);

  const toggleCheck = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const allChecked = items.every(item => item.checked);
  const progress = (items.filter(item => item.checked).length / items.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Eligibility Progress</span>
          <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className={`h-2.5 rounded-full transition ${
              progress === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => toggleCheck(item.id)}
            className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
              item.checked
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>
            <div className="ml-3">
              <label className={`text-sm font-medium cursor-pointer ${
                item.checked ? 'text-gray-800' : 'text-gray-600'
              }`}>
                {item.label}
              </label>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status Message */}
      {allChecked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            ✓
          </div>
          <div>
            <p className="font-medium text-green-800">All requirements met!</p>
            <p className="text-sm text-green-700">You are eligible to apply for a license.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EligibilityChecklist;