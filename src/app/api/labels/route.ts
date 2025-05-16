import { NextResponse } from "next/server";
import { fetchLabels } from "@/lib/googleSheets";

export async function GET() {
  try {
    const labels = await fetchLabels();
    return NextResponse.json(labels);
  } catch (error) {
    console.error("Error fetching labels:", error);
    return NextResponse.json(
      { error: "Failed to fetch labels" },
      { status: 500 },
    );
  }
}
