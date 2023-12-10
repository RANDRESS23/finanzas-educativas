export interface SavingFeature {
  id: string;
  title: string;
  description: string;
}

export interface SavingContent {
  savingMeaning: string;
  savingFeatures: SavingFeature[];
}

export interface CreditType {
  id: string;
  title: string;
  description: string;
}

export interface CreditContent {
  creditMeaning: string;
  creditTypes: CreditType[];
}

export interface ExpenseAndIncomeContent {
  id: string;
  expenseMeaning: string;
  incomeMeaning: string;
}

export interface FirstDimensionContent {
  id: string;
  savingContent: SavingContent;
  creditContent: CreditContent;
  expenseAndIncomeContent: ExpenseAndIncomeContent;
  createdAt: Date;
  updatedAt: Date;
}
