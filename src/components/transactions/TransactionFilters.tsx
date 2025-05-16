import { useState } from "react";
import { Category } from "@/types/category";
import { Label } from "@/types/label";
import { Search, Filter, X } from "lucide-react";

interface TransactionFiltersProps {
  categories: Category[];
  labels: Label[];
  onFilterChange: (filters: {
    search: string;
    category: string;
    label: string;
  }) => void;
}

export default function TransactionFilters({
  categories,
  labels,
  onFilterChange,
}: TransactionFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [label, setLabel] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, category, label });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    onFilterChange({ search, category: e.target.value, label });
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLabel(e.target.value);
    onFilterChange({ search, category, label: e.target.value });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setLabel("");
    onFilterChange({ search: "", category: "", label: "" });
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearchChange}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} className="text-gray-400" />
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Label
            </label>
            <select
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={label}
              onChange={handleLabelChange}
            >
              <option value="">All Labels</option>
              {labels.map((lab) => (
                <option key={lab.name} value={lab.name}>
                  {lab.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={handleClearFilters}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
