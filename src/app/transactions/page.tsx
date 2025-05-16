"use client";

import { useState, useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useLabels } from "@/hooks/useLabels";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionFilters from "@/components/transactions/TransactionFilters";

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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <TransactionFilters
        categories={categories}
        labels={labels}
        onFilterChange={setFilters}
      />

      {isLoading ? (
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : (
        <TransactionList transactions={filteredTransactions} />
      )}
    </div>
  );
}
