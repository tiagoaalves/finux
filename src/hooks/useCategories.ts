import { useEffect, useState, useMemo } from "react";
import { Category } from "@/types/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);

        // Fetch categories from our API route
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error in useCategories:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load categories"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  return { categories, isLoading, error };
}

// Hook to create a category map for efficient lookups
export function useCategoryMap() {
  const { categories, isLoading, error } = useCategories();

  // Create a memoized Map for O(1) lookups
  const categoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    categories.forEach((category) => {
      map.set(category.name.toLowerCase(), category);
    });
    return map;
  }, [categories]);

  return { categories, categoryMap, isLoading, error };
}

// Helper hook to get category icons
export function useCategoryIcons() {
  const { categoryMap, isLoading, error } = useCategoryMap();

  const getCategoryIcon = (categoryName: string): string => {
    if (!categoryName) return "💳";

    const category = categoryMap.get(categoryName.toLowerCase());
    return category?.icon || "💳";
  };

  return { getCategoryIcon, isLoading, error };
}
