import {
  addMonths,
  subDays,
  isBefore,
  isAfter,
  differenceInDays,
} from "date-fns";

export const calculateCurrentCycle = (salaryDay: number = 1) => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  let cycleStartDate: Date;

  if (currentDay >= salaryDay) {
    // We're past the salary day in current month
    cycleStartDate = new Date(currentYear, currentMonth, salaryDay);
  } else {
    // We're before the salary day, so cycle started last month
    cycleStartDate = new Date(currentYear, currentMonth - 1, salaryDay);
  }

  // End date is the day before next salary date
  const nextCycleStart = addMonths(cycleStartDate, 1);
  const cycleEndDate = subDays(nextCycleStart, 1);

  // Calculate days remaining and progress
  const totalDays = differenceInDays(cycleEndDate, cycleStartDate) + 1;
  const daysElapsed = differenceInDays(today, cycleStartDate);
  const daysRemaining = totalDays - daysElapsed;
  const progress = (daysElapsed / totalDays) * 100;

  return {
    startDate: cycleStartDate,
    endDate: cycleEndDate,
    totalDays,
    daysElapsed,
    daysRemaining,
    progress,
  };
};

export const isTransactionInCurrentCycle = (
  transactionDate: string | Date,
  cycle: { startDate: Date; endDate: Date },
) => {
  const date = new Date(transactionDate);
  return (
    (isAfter(date, cycle.startDate) ||
      date.getTime() === cycle.startDate.getTime()) &&
    (isBefore(date, cycle.endDate) ||
      date.getTime() === cycle.endDate.getTime())
  );
};
