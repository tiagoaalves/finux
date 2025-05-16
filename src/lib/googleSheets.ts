import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { Transaction } from "@/types/transaction";
import { Category } from "@/types/category";
import { Label } from "@/types/label";

// Cache the document instance
let doc: GoogleSpreadsheet | null = null;
let isDocLoaded = false;

// Initialize the Google Sheets document
const getDocument = async (): Promise<GoogleSpreadsheet> => {
  try {
    // If doc exists and info is loaded, return it
    if (doc && isDocLoaded) return doc;

    // Create a JWT auth client
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Initialize the sheet or use cached instance
    if (!doc) {
      doc = new GoogleSpreadsheet(
        process.env.GOOGLE_SPREADSHEET_ID!,
        serviceAccountAuth,
      );
    }

    // Load document properties if not already loaded
    if (!isDocLoaded) {
      await doc.loadInfo();
      isDocLoaded = true;
    }

    return doc;
  } catch (error) {
    console.error("Error initializing Google Sheets:", error);
    throw error;
  }
};

// Fetch all transactions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const doc = await getDocument();
    const sheet = doc.sheetsByTitle["My Transactions"]; // Adjust if your sheet name is different

    if (!sheet) {
      throw new Error("Transactions sheet not found");
    }

    // Load all rows
    const rows = await sheet.getRows();

    // Map to our Transaction interface
    return rows.map((row) => {
      // Handle the amount with Euro symbol
      const amountString = row.get("Amount") || "0";
      // Remove the Euro symbol (€) and any other non-numeric characters except for decimal point and minus
      const cleanedAmount = amountString.replace(/[^0-9.-]/g, "");
      const amount = parseFloat(cleanedAmount);

      return {
        date: row.get("Date"),
        description: row.get("Description"),
        amount: amount,
        account: row.get("Account"),
        category: row.get("Head Category"),
        subcategory: row.get("Subcategory") || undefined,
        label: row.get("Label") as "Need" | "Want" | "Saving",
        notes: row.get("Notes") || undefined,
        importedAt: row.get("Imported At"),
      };
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const doc = await getDocument();
    const sheet = doc.sheetsByTitle["Categories"]; // Adjust if your sheet name is different

    if (!sheet) {
      throw new Error("Categories sheet not found");
    }

    // Load all rows
    const rows = await sheet.getRows();

    // Process the categories and subcategories
    const categoryMap: Record<string, Category> = {};

    rows.forEach((row) => {
      const categoryName = row.get("Category");
      const subcategory = row.get("Subcategory");

      if (!categoryName) return;

      // Create category if it doesn't exist
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          name: categoryName,
          subcategories: [],
        };
      }

      // Add subcategory if it exists
      if (subcategory) {
        categoryMap[categoryName].subcategories!.push(subcategory);
      }
    });

    // Convert map to array
    return Object.values(categoryMap);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fetch all labels
export const fetchLabels = async (): Promise<Label[]> => {
  try {
    const doc = await getDocument();
    const sheet = doc.sheetsByTitle["Labels"]; // Adjust if your sheet name is different

    if (!sheet) {
      throw new Error("Labels sheet not found");
    }

    // Load all rows
    const rows = await sheet.getRows();

    // Map to our Label interface
    return rows.map((row) => ({
      name: row.get("Label") as "Need" | "Want" | "Saving",
    }));
  } catch (error) {
    console.error("Error fetching labels:", error);
    return [];
  }
};
