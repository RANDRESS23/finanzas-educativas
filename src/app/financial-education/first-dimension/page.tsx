import { type Metadata } from "next";
import CreditSection from "./CreditSection";
import ExpensesAndIncomes from "./ExpensesAndIncomes";
import SavingSection from "./SavingSection";

export const metadata: Metadata = {
  title: "Finanzas Educativas | Educación Financiera",
};

export default function FirstDimension() {
  return (
    <div className="py-20">
      <SavingSection />
      <CreditSection />
      <ExpensesAndIncomes />
    </div>
  );
}
