import { google } from "googleapis";

// Set up Google Sheets API client
export const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

// Fetch transactions from Google Sheet
export const fetchTransactions = async () => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "Transactions!A2:H", // Adjust based on your actual sheet structure
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Transform rows into transaction objects
    return rows.map((row) => ({
      date: row[0],
      description: row[1],
      amount: parseFloat(row[2]),
      account: row[3],
      category: row[4],
      subcategory: row[5] || undefined,
      type: row[6],
      timestamp: row[7],
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Similar functions for categories and labels
export const fetchCategories = async () => {
  // Implementation similar to fetchTransactions
};

export const fetchLabels = async () => {
  // Implementation similar to fetchTransactions
};
