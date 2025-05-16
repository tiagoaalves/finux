import useSWR from "swr";
import { Transaction } from "@/types/transaction";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTransactions() {
  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(
    "/api/transactions",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    transactions: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Similar hooks for categories and labels
