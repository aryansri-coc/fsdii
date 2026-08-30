import React from 'react';
import { ChevronLeft, ChevronRight, CalendarRange } from 'lucide-react';
import { getCalendarHeaderLabel } from '../utils/dateHelpers';

export default function CalendarHeader({
  currentDate,
  viewMode,
  onNavigate,
  onViewChange,
}) {
  const handlePrev = () => {
    const date = new Date(currentDate);
    if (viewMode === 'month') {
      date.setMonth(date.getMonth() - 1);
    } else if (viewMode === 'week') {
      date.setDate(date.getDate() - 7);
    } else {
      date.setDate(date.getDate() - 1);
    }
    onNavigate(date.toISOString().split('T')[0]);
  };

  const handleNext = () => {
    const date = new Date(currentDate);
    if (viewMode === 'month') {
      date.setMonth(date.getMonth() + 1);
    } else if (viewMode === 'week') {
      date.setDate(date.getDate() + 7);
    } else {
      date.setDate(date.getDate() + 1);
    }
    onNavigate(date.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    onNavigate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="calendar-header-wrapper">
      {/* Title / Info */}
      <div className="brand-section">
        <div className="brand-icon-box">
          <CalendarRange style={{ width: '24px', height: '24px' }} />
        </div>
        <div>
          <h1 className="brand-title">Social Scheduler</h1>
          <p className="brand-subtitle">Map & organize your posts visually</p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls">
        <button
          onClick={handlePrev}
          className="btn-icon"
          title="Previous"
        >
          <ChevronLeft style={{ width: '20px', height: '20px' }} />
        </button>

        <button
          onClick={handleToday}
          className="btn-today"
        >
          Today
        </button>

        <button
          onClick={handleNext}
          className="btn-icon"
          title="Next"
        >
          <ChevronRight style={{ width: '20px', height: '20px' }} />
        </button>

        {/* Date Display */}
        <h2 className="current-date-label">
          {getCalendarHeaderLabel(currentDate, viewMode)}
        </h2>
      </div>

      {/* View Toggle */}
      <div className="view-toggle-bar">
        {['month', 'week', 'day'].map((mode) => (
          <button
            key={mode}
            onClick={() => onViewChange(mode)}
            className={`btn-toggle-view ${viewMode === mode ? 'active' : ''}`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
