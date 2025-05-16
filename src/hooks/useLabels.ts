import useSWR from "swr";
import { Label } from "@/types/label";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLabels() {
  const { data, error, isLoading } = useSWR<Label[]>("/api/labels", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    labels: data || [],
    isLoading,
    isError: error,
  };
}
