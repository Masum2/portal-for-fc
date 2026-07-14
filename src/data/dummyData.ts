// data/dummyData.ts
import type { User, License, Application, Notification, Note } from '../types';

export const currentUser: User = {
  id: '1',
  fosterCaretakerId: 'FC-001',
  loginId: 'caregiver_john',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+8801712345678',
  email: 'john.doe@example.com'
};

export const dummyLicense: License = {
  id: 'LIC-001',
  caregiverId: '1',
  licenseNumber: 'FCL-2024-001',
  status: 'Active',
  issueDate: '2024-01-15',
  expiryDate: '2025-01-15',
  type: 'New'
};

export const dummyApplications: Application[] = [
  {
    id: 'APP-001',
    caregiverId: '1',
    type: 'New',
    status: 'SentToSW', // Changed from 'UnderReview' to 'SentToSW'
    submittedAt: '2024-12-01T10:00:00Z',
    facilityName: 'Sunshine Foster Home',
    address: '123 Main Street, Dhaka',
    capacity: 10,
    documents: [
      {
        id: 'DOC-001',
        name: 'National ID',
        type: 'Identity',
        status: 'Approved',
        uploadedAt: '2024-11-28T08:00:00Z'
      },
      {
        id: 'DOC-002',
        name: 'Training Certificate',
        type: 'Training',
        status: 'Pending',
        uploadedAt: '2024-11-29T09:00:00Z'
      }
    ],
    notes: [
      {
        id: 'NOTE-001',
        from: 'SocialWorker',
        message: 'Please upload your health certificate.',
        timestamp: '2024-12-02T14:30:00Z',
        applicationId: 'APP-001'
      },
      {
        id: 'NOTE-002',
        from: 'SocialWorker',
        message: 'Your application has been sent to FC Supervisor for final approval.',
        timestamp: '2024-12-03T09:00:00Z',
        applicationId: 'APP-001'
      }
    ]
  },
  {
    id: 'APP-002',
    caregiverId: '1',
    type: 'Renewal',
    status: 'Draft',
    documents: [],
    notes: [],
    facilityName: 'Sunshine Foster Home',
    address: '123 Main Street, Dhaka',
    capacity: 10
  },
  {
    id: 'APP-003',
    caregiverId: '1',
    type: 'New',
    status: 'Approved', // Approved application
    submittedAt: '2024-11-15T10:00:00Z',
    reviewedAt: '2024-11-20T14:30:00Z',
    approvedBy: 'FC Supervisor - Sarah',
    documents: [],
    notes: [],
    facilityName: 'Happy Home',
    address: '456 Park Avenue, Dhaka',
    capacity: 8
  }
];

export const dummyNotifications: Notification[] = [
  {
    id: 'NOT-001',
    userId: '1',
    message: 'Your application APP-001 has been sent to Social Worker for review.',
    type: 'Info',
    read: false,
    createdAt: '2024-12-01T11:00:00Z',
    applicationId: 'APP-001'
  },
  {
    id: 'NOT-002',
    userId: '1',
    message: 'Document "Training Certificate" is pending approval.',
    type: 'Warning',
    read: false,
    createdAt: '2024-12-02T10:00:00Z',
    applicationId: 'APP-001'
  },
  {
    id: 'NOT-003',
    userId: '1',
    message: '✅ Your application APP-003 has been approved by FC Supervisor!',
    type: 'Success',
    read: false,
    createdAt: '2024-11-20T15:00:00Z',
    applicationId: 'APP-003',
    action: 'Approved'
  }
];