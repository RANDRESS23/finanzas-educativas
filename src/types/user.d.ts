export interface User {
  id: string;
  documentType: string;
  document: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}