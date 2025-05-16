import { Transaction } from "@/types/transaction";
import { format } from "date-fns";
import { Tag } from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
}

const getLabelColor = (label: string) => {
  switch (label) {
    case "Need":
      return "bg-[#01BAEF] text-white";
    case "Want":
      return "bg-[#DC8BE0] text-white";
    case "Saving":
      return "bg-[#64E2B7] text-white";
    default:
      return "bg-[#333333] text-white";
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
    <div className="p-4 hover:bg-[#2a2a2a] transition-colors duration-200 border-b border-[#333333] last:border-0">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[#333333] text-xl">
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

          <div className="flex justify-between items-start mt-1 text-xs">
            <div>
              <span className="text-gray-400 block">
                {transaction.category}
                {transaction.subcategory && ` › ${transaction.subcategory}`}
              </span>
              <div className="mt-1 flex-shrink-0 w-fit">
                <span
                  className={`rounded-full py-0.5 px-2 ${getLabelColor(transaction.label)} flex items-center w-fit`}
                >
                  <Tag size={10} className="mr-1" />
                  <span>{transaction.label}</span>
                </span>
              </div>
            </div>
            <span className="text-gray-400 mt-1">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
