import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Plus } from 'lucide-react';
import { getCalendarHeaderLabel } from '../utils/dateHelpers';

export default function CalendarHeader({
  currentDate,
  viewMode,
  onNavigate,
  onViewChange,
  onNewPost,
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
    <header className="calendar-header-wrapper">
      <div className="brand-section">
        <div className="brand-icon-box">
          <CalendarDays className="brand-icon" />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">Post Calendar Scheduler</h1>
          <p className="brand-subtitle">Schedule & manage posts across temporal layouts</p>
        </div>
      </div>

      <div className="nav-controls">
        <div className="nav-btn-group">
          <button
            onClick={handlePrev}
            className="btn-icon"
            aria-label="Previous period"
            title="Previous"
          >
            <ChevronLeft size={16} />
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
            aria-label="Next period"
            title="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <h2 className="current-date-label">
          {getCalendarHeaderLabel(currentDate, viewMode)}
        </h2>
      </div>

      <div className="header-actions">
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

        {onNewPost && (
          <button
            onClick={onNewPost}
            className="btn-primary-action"
            title="Create new post"
          >
            <Plus size={15} />
            <span>New Post</span>
          </button>
        )}
      </div>
    </header>
  );
}
