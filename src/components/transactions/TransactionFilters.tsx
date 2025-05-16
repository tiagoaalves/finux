import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { Label } from "@/types/label";
import { Search, Filter, X, ChevronDown } from "lucide-react";

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
          className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 p-3 transition-all"
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearchChange}
        />
        <button
          className={`absolute inset-y-0 right-3 flex items-center justify-center w-8 h-8 my-auto rounded-lg ${
            filtersApplied ? "bg-indigo-600" : "hover:bg-gray-700"
          } transition-colors`}
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
        >
          <Filter
            size={16}
            className={filtersApplied ? "text-white" : "text-gray-500"}
          />
          {filtersApplied && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800"></span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="rounded-xl bg-gray-800 border border-gray-700 p-4 space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-white">Filters</h3>
            {filtersApplied && (
              <button
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                onClick={handleClearFilters}
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
                  className="bg-gray-700 border-0 text-white text-sm rounded-lg focus:ring-indigo-500 block w-full p-3 appearance-none"
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
                  className="bg-gray-700 border-0 text-white text-sm rounded-lg focus:ring-indigo-500 block w-full p-3 appearance-none"
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
