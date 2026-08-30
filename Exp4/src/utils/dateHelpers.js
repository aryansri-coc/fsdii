/**
 * Utility functions for date calculations in the calendar scheduler
 */

// Helper to check if two date objects/strings represent the same calendar day
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Formats a Date object to YYYY-MM-DD string
export const formatDateString = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// Generates an array of 42 dates to fill a standard 6-week grid for the given month
export const getMonthGrid = (dateString) => {
  const centerDate = new Date(dateString);
  const year = centerDate.getFullYear();
  const month = centerDate.getMonth();

  // First day of the current month
  const firstDayOfMonth = new Date(year, month, 1);
  // Day of the week of the first day (0 = Sunday, 1 = Monday, etc.)
  const startDayOfWeek = firstDayOfMonth.getDay();

  // We start our calendar grid from the starting Sunday (we can offset to starting Sunday of grid)
  const gridStart = new Date(firstDayOfMonth);
  gridStart.setDate(gridStart.getDate() - startDayOfWeek);

  const days = [];
  // Standard month view always displays 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + i);
    days.push({
      date: formatDateString(day),
      isCurrentMonth: day.getMonth() === month,
      isToday: isSameDay(day, new Date()),
      dayLabel: day.getDate(),
    });
  }
  return days;
};

// Generates the 7 days of the week starting from Sunday containing the centerDate
export const getWeekDays = (dateString) => {
  const centerDate = new Date(dateString);
  const dayOfWeek = centerDate.getDay();
  
  const startOfWeek = new Date(centerDate);
  startOfWeek.setDate(centerDate.getDate() - dayOfWeek);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push({
      date: formatDateString(day),
      isToday: isSameDay(day, new Date()),
      dayLabel: day.getDate(),
      weekdayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
    });
  }
  return days;
};

// Returns standard display header (e.g. "August 2026")
export const getCalendarHeaderLabel = (dateString, viewMode) => {
  const date = new Date(dateString);
  if (viewMode === 'day') {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
