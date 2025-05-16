import { Transaction } from "@/types/transaction";
import { format } from "date-fns";
import { Tag } from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
}

const getLabelColor = (label: string) => {
  switch (label) {
    case "Need":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Want":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Saving":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  // Format date from MM/DD/YYYY to a more readable format
  const date = new Date(transaction.date);
  const formattedDate = format(date, "MMM d");

  // Format amount (negative values are expenses)
  const amount = transaction.amount;
  const isExpense = amount < 0;
  const formattedAmount = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(Math.abs(amount));

  return (
    <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-800">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-800 mr-4">
        <span className="text-sm font-medium">{formattedDate}</span>
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {transaction.description}
        </h4>
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            {transaction.category}
            {transaction.subcategory && ` › ${transaction.subcategory}`}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full flex items-center ${getLabelColor(transaction.label)}`}
          >
            <Tag size={12} className="mr-1" />
            {transaction.label}
          </span>
        </div>
      </div>

      <div
        className={`font-medium ${isExpense ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
      >
        {isExpense ? "-" : "+"}
        {formattedAmount}
      </div>
    </div>
  );
}
