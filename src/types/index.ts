// types/index.ts
export interface User {
  id: string;
  fosterCaretakerId: string;
  loginId: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface License {
  id: string; 
  caregiverId: string;
  licenseNumber: string;
  status: 'Active' | 'Expired' | 'Pending' | 'Rejected';
  issueDate: string;
  expiryDate: string;
  type: 'New' | 'Renewal';
}

export interface Document {
  id: string;
  name: string;
  type: 'Identity' | 'Training' | 'Health' | 'Background';
  fileUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  uploadedAt: string;
}

export interface Application {
  id: string;
  caregiverId: string;
  type: 'New' | 'Renewal';
  status: 'Draft' | 'Submitted' | 'SentToSW' | 'UnderReview' | 'Approved' | 'Rejected';
  submittedAt?: string;
  reviewedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  documents: Document[];
  notes: Note[];
  facilityName?: string;
  address?: string;
  capacity?: number;
}

export interface Note {
  id: string;
  from: 'Caregiver' | 'SocialWorker';
  message: string;
  timestamp: string;
  applicationId: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'Info' | 'Success' | 'Warning' | 'Error';
  read: boolean;
  createdAt: string;
  applicationId?: string;
  action?: 'Approved' | 'Rejected' | 'Review' | 'Comment';
}