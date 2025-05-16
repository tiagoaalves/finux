import useSWR from "swr";
import { Category } from "@/types/category";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    "/api/categories",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
  };
}
