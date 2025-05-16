import { Transaction } from "@/types/transaction";
import TransactionItem from "./TransactionItem";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useCategoryMap } from "@/hooks/useCategories";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  const { isLoading: isCategoriesLoading } = useCategoryMap();

  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const dateKey = format(date, "yyyy-MM-dd");
    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = [];
    }
    groupedTransactions[dateKey].push(transaction);
  });

  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  if (isCategoriesLoading) {
    return (
      <div className="p-8 text-center text-gray-400 rounded-xl bg-[#222222] border border-[#333333]">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="animate-pulse w-16 h-16 rounded-full bg-[#333333] flex items-center justify-center mb-4"></div>
          <p className="text-lg font-medium mb-1">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 rounded-xl bg-[#222222] border border-[#333333]">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#333333] flex items-center justify-center mb-4">
            <Calendar size={24} className="text-indigo-500" />
          </div>
          <p className="text-lg font-medium mb-1">No transactions found</p>
          <p className="text-sm">
            Try adjusting your filters or adding new transactions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden divide-y divide-[#333333] rounded-xl bg-[#222222] border border-[#333333]">
      {sortedDates.map((dateKey) => (
        <div key={dateKey} className="animate-fadeIn">
          <div className="sticky top-0 px-4 py-3 backdrop-blur-md bg-[#222222]/90 border-b border-[#333333] z-10">
            <div className="flex items-center">
              <Calendar size={14} className="text-indigo-500 mr-2" />
              <h3 className="text-sm font-medium text-white">
                {format(new Date(dateKey), "EEEE, MMMM d, yyyy")}
              </h3>
            </div>
          </div>
          <div>
            {groupedTransactions[dateKey].map((transaction, index) => (
              <TransactionItem
                key={`${transaction.importedAt}-${index}`}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
