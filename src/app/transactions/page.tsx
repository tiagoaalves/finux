"use client";
import { useState, useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useLabels } from "@/hooks/useLabels";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import { PlusCircle, ListFilter } from "lucide-react";

export default function TransactionsPage() {
  const { transactions, isLoading: isLoadingTransactions } = useTransactions();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { labels, isLoading: isLoadingLabels } = useLabels();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    label: "",
  });

  const filteredTransactions = useMemo(() => {
    if (!transactions.length) return [];
    return transactions.filter((transaction) => {
      const matchesSearch = filters.search
        ? transaction.description
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        : true;
      const matchesCategory = filters.category
        ? transaction.category === filters.category
        : true;
      const matchesLabel = filters.label
        ? transaction.label === filters.label
        : true;
      return matchesSearch && matchesCategory && matchesLabel;
    });
  }, [transactions, filters]);

  const isLoading =
    isLoadingTransactions || isLoadingCategories || isLoadingLabels;
  const filtersApplied = filters.search || filters.category || filters.label;

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <div className="flex flex-col mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Transactions
          </h1>
          <button
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 p-2.5 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
            aria-label="Add Transaction"
          >
            <PlusCircle size={20} />
          </button>
        </div>
        {filtersApplied && (
          <div className="flex items-center text-sm text-gray-400 mb-1">
            <ListFilter size={14} className="mr-1" />
            <span>
              {filteredTransactions.length} result
              {filteredTransactions.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      <TransactionFilters
        categories={categories}
        labels={labels}
        onFilterChange={setFilters}
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-20 bg-gray-800 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <TransactionList transactions={filteredTransactions} />
      )}
    </div>
  );
}
