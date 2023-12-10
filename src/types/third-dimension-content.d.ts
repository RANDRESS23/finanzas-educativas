export interface FinanceManagement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ThirdDimensionContent {
  id: string;
  financeManagement: FinanceManagement[];
  createdAt: Date;
  updatedAt: Date;
}
