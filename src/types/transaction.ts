export interface Transaction {
  id?: string;
  date: string;
  description: string;
  amount: number;
  account: string;
  category: string;
  subcategory?: string;
  type: "Need" | "Want" | "Saving";
  timestamp: string;
}
