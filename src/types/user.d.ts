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

export interface UserMoreInfo {
  id: string;
  userId: string;
  gender: string;
  age: string[];
  civilStatus: string;
  educationLevel: string;
  residenceArea: string;
  typeOfHousing: string;
  houseServices: string[];
  socioeconomicLevel: number;
  numberPeopleContributing: number;
  incomeComeFrom: string;
  isInAPensionFund: boolean;
  healthSystemAffiliation: string;
  numberPeopleDependFinancially: number;
  financialProducts: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMoreInfoForm extends UserMoreInfo {
  documentSession: string;
  emailSession: string;
}
