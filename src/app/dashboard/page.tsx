"use client";

import { useState } from "react";
import { useCycle } from "@/hooks/useCycle";
import { format } from "date-fns";

export default function Dashboard() {
  const [salaryDay] = useState(15); // Default to 15th, will come from settings later
  const { cycle, totalIncome, totalExpenses, remaining } = useCycle(salaryDay);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Finux Dashboard</h1>

      {/* Cycle Overview */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Current Cycle</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {format(cycle.startDate, "MMM d")} -{" "}
          {format(cycle.endDate, "MMM d, yyyy")}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {cycle.daysRemaining} days remaining
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4 dark:bg-gray-700">
          <div
            className="h-2 bg-blue-500 rounded-full dark:bg-blue-400"
            style={{ width: `${cycle.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Income</p>
          <p className="text-lg font-semibold">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
          <p className="text-lg font-semibold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
          <p className="text-lg font-semibold">${remaining.toFixed(2)}</p>
        </div>
      </div>

      {/* Placeholder for Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Transaction list will appear here
        </p>
      </div>

      {/* Placeholder for Category Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-4 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Category visualization will appear here
        </p>
      </div>
    </div>
  );
}
