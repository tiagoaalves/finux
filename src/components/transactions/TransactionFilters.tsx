import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { Label } from "@/types/label";
import { Search, Filter, ChevronDown } from "lucide-react";

interface TransactionFiltersProps {
  categories: Category[];
  labels: Label[];
  onFilterChange: (filters: {
    search: string;
    category: string;
    label: string;
  }) => void;
  isLoading?: boolean;
}

export default function TransactionFilters({
  categories,
  labels,
  onFilterChange,
  isLoading = false,
}: TransactionFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [label, setLabel] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    // Check if any filters are applied
    setFiltersApplied(!!category || !!label);
  }, [category, label]);

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
    <div className="mb-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          className={`bg-[#222222] border border-[#333333] text-white text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 p-3 transition-all ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearchChange}
          disabled={isLoading}
        />
        <button
          className={`absolute inset-y-0 right-3 flex items-center justify-center w-8 h-8 my-auto rounded-lg ${
            filtersApplied ? "bg-indigo-600" : "hover:bg-[#333333]"
          } transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => !isLoading && setShowFilters(!showFilters)}
          aria-label="Toggle filters"
          disabled={isLoading}
        >
          <Filter
            size={16}
            className={filtersApplied ? "text-white" : "text-gray-500"}
          />
          {filtersApplied && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#222222]"></span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="rounded-xl bg-[#222222] border border-[#333333] p-4 space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-white">Filters</h3>
            {filtersApplied && (
              <button
                className={`text-xs text-indigo-400 hover:text-indigo-300 transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleClearFilters}
                disabled={isLoading}
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  className={`bg-[#333333] border-0 text-white text-sm rounded-lg focus:ring-indigo-500 block w-full p-3 appearance-none ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  value={category}
                  onChange={handleCategoryChange}
                  disabled={isLoading}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Label
              </label>
              <div className="relative">
                <select
                  className={`bg-[#333333] border-0 text-white text-sm rounded-lg focus:ring-indigo-500 block w-full p-3 appearance-none ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  value={label}
                  onChange={handleLabelChange}
                  disabled={isLoading}
                >
                  <option value="">All Labels</option>
                  {labels.map((lab) => (
                    <option key={lab.name} value={lab.name}>
                      {lab.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
