export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const formatDateString = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

export const getMonthGrid = (dateString) => {
  const centerDate = new Date(dateString);
  const year = centerDate.getFullYear();
  const month = centerDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();

  const gridStart = new Date(firstDayOfMonth);
  gridStart.setDate(gridStart.getDate() - startDayOfWeek);

  const days = [];
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

export const getCalendarHeaderLabel = (dateString, viewMode) => {
  const date = new Date(dateString);
  if (viewMode === 'day') {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
