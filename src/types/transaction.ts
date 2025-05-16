export interface Transaction {
  date: string;
  description: string;
  amount: number;
  account: string;
  category: string;
  subcategory?: string;
  label: "Need" | "Want" | "Saving";
  notes?: string;
  importedAt: string;
}
