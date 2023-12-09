import { type Metadata } from "next";
import CreditSection from "./CreditSection";
import ExpensesAndIncomes from "./ExpensesAndIncomes";
import SavingSection from "./SavingSection";
import { type FirstDimensionContent } from "@/types/first-dimension-content";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Educación Financiera",
};

const getFirstDimensionContent = async () => {
  try {
    const firstDimensionContent = await fetch(
      `${process.env.NEXTAUTH_URL}/api/admin/first-dimension`,
    );
    const data = await firstDimensionContent.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};

export default async function FirstDimension() {
  const {
    savingContent,
    creditContent,
    expenseAndIncomeContent,
  }: FirstDimensionContent = await getFirstDimensionContent();

  return (
    <div className="py-20">
      <SavingSection savingContent={savingContent} />
      <CreditSection creditContent={creditContent} />
      <ExpensesAndIncomes expenseAndIncomeContent={expenseAndIncomeContent} />
    </div>
  );
}
