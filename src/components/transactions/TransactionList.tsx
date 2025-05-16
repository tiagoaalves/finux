import { Transaction } from "@/types/transaction";
import TransactionItem from "./TransactionItem";
import { format } from "date-fns";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
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

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No transactions found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden dark:bg-gray-800">
      {sortedDates.map((dateKey) => (
        <div key={dateKey}>
          <div className="sticky top-0 px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">
              {format(new Date(dateKey), "EEEE, MMMM d, yyyy")}
            </h3>
          </div>
          {groupedTransactions[dateKey].map((transaction, index) => (
            <TransactionItem
              key={`${transaction.importedAt}-${index}`}
              transaction={transaction}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
