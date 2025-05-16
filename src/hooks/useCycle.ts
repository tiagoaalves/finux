import { useEffect, useState } from "react";
import {
  calculateCurrentCycle,
  isTransactionInCurrentCycle,
} from "@/lib/cycle";
import { useTransactions } from "./useTransactions";

export function useCycle(salaryDay: number = 1) {
  const [cycle, setCycle] = useState(calculateCurrentCycle(salaryDay));
  const { transactions } = useTransactions();

  // Recalculate cycle when salary day changes
  useEffect(() => {
    setCycle(calculateCurrentCycle(salaryDay));
  }, [salaryDay]);

  // Get transactions for current cycle
  const currentCycleTransactions = transactions.filter((transaction) =>
    isTransactionInCurrentCycle(transaction.date, cycle),
  );

  // Calculate totals
  const totalIncome = currentCycleTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentCycleTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return {
    cycle,
    currentCycleTransactions,
    totalIncome,
    totalExpenses,
    remaining: totalIncome - totalExpenses,
  };
}
