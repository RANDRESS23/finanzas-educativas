import type { FirstDimensionContent } from "@/types/first-dimension-content";
import CreditSection from "./CreditSection";
import ExpensesAndIncomes from "./ExpensesAndIncomes";
import SavingSection from "./SavingSection";

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
