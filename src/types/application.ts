export interface ApplicationFormData {
  licenseStartDate: string;
  licenseStartTime: string;
  applicationType: string;
  licenseType: string;
  bedCapacity: string;
}

export interface DocumentItem {
  id: string;
  eligibilityItem: string;
  documentName: string;
  dateReceived: string;
  comments: string;
  file?: File | null;
}

export interface SubmitApplicationPayload {
  formData: ApplicationFormData;
  documents: DocumentItem[];
}