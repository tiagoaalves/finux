"use client";
import { useState, useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategoryMap } from "@/hooks/useCategories";
import { useLabels } from "@/hooks/useLabels";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import { ListFilter } from "lucide-react";

export default function TransactionsPage() {
  const { transactions, isLoading: isLoadingTransactions } = useTransactions();
  const { categoryMap, isLoading: isLoadingCategories } = useCategoryMap();
  const { labels, isLoading: isLoadingLabels } = useLabels();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    label: "",
  });

  // Convert categoryMap to array for filters
  const categories = useMemo(() => {
    return Array.from(categoryMap.values());
  }, [categoryMap]);

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
        {filtersApplied && !isLoading && (
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
        isLoading={isLoading}
      />

      {isLoadingTransactions ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-20 bg-[#222222] animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <TransactionList transactions={filteredTransactions} />
      )}
    </div>
  );
}
