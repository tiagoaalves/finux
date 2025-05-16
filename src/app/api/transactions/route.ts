import { NextResponse } from "next/server";
import { fetchTransactions } from "@/lib/googleSheets";

export async function GET() {
  try {
    const transactions = await fetchTransactions();
    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 },
    );
  }
}

// Similar routes for categories and labels
