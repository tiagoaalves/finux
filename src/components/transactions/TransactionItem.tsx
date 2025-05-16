import { Transaction } from "@/types/transaction";
import { format } from "date-fns";
import { Tag } from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
}

const getLabelColor = (label: string) => {
  switch (label) {
    case "Need":
      return "bg-[#1e3a8a]/20 text-[#93c5fd]";
    case "Want":
      return "bg-[#581c87]/20 text-[#d8b4fe]";
    case "Saving":
      return "bg-[#166534]/20 text-[#86efac]";
    default:
      return "bg-[#27272a]/50 text-[#a1a1aa]";
  }
};

const getCategoryIcon = (category: string) => {
  // You could add more category icons here
  switch (category.toLowerCase()) {
    case "groceries":
      return "🛒";
    case "dining":
      return "🍽️";
    case "transport":
      return "🚗";
    case "entertainment":
      return "🎬";
    case "utilities":
      return "💡";
    case "housing":
      return "🏠";
    case "health":
      return "🏥";
    case "shopping":
      return "🛍️";
    case "travel":
      return "✈️";
    case "income":
      return "💰";
    default:
      return "💳";
  }
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  // Format date from MM/DD/YYYY to a more readable format
  const date = new Date(transaction.date);
  const formattedDate = format(date, "d MMM");

  // Format amount (only positive values are highlighted)
  const amount = transaction.amount;
  const isIncome = amount > 0;
  const formattedAmount = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(Math.abs(amount));

  return (
    <div className="p-4 hover:bg-gray-700 transition-colors duration-200 border-b border-gray-700 last:border-0">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-700 text-xl">
          {getCategoryIcon(transaction.category)}
        </div>

        <div className="ml-4 flex-1 min-w-0">
          <div className="flex justify-between">
            <h4 className="text-white font-medium truncate">
              {transaction.description}
            </h4>
            <span
              className={`font-medium ml-2 tabular-nums ${
                isIncome ? "text-green-400" : "text-white"
              }`}
            >
              {isIncome ? "+" : ""}
              {formattedAmount}
            </span>
          </div>

          <div className="flex items-center mt-1 text-xs">
            <span className="text-gray-400 truncate">
              {transaction.category}
              {transaction.subcategory && ` › ${transaction.subcategory}`}
            </span>

            <div className="flex items-center ml-auto">
              <span className="text-gray-400 mr-2">{formattedDate}</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLabelColor(transaction.label)}`}
              >
                <Tag size={10} className="mr-1" />
                {transaction.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
