import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, updatePost, deletePost, movePost } from './store/postsSlice';
import { setCurrentDate, setViewMode } from './store/calendarSlice';
import { getMonthGrid, getWeekDays } from './utils/dateHelpers';

// Components
import CalendarHeader from './components/CalendarHeader';
import DayCell from './components/DayCell';
import PostModal from './components/PostModal';
import PerformancePanel from './components/PerformancePanel';

// Icons
import { Plus, Calendar as CalendarIcon, Info } from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function App() {
  const dispatch = useDispatch();
  
  // Select calendar configuration from Redux
  const { 
    currentDate, 
    viewMode, 
    performanceHighlight, 
    memoizationEnabled, 
    renderTrigger 
  } = useSelector((state) => state.calendar);

  // Select scheduled posts list
  const posts = useSelector((state) => state.posts.posts);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Performance Key to bypass React.memo when optimizations are toggled OFF
  const forceRenderKey = useMemo(() => {
    return memoizationEnabled ? 'optimized' : `bypass-${renderTrigger}-${Math.random()}`;
  }, [memoizationEnabled, renderTrigger]);

  // Performance Optimization (useMemo): Grouping posts by date string (e.g. "2026-08-13")
  const postsByDate = useMemo(() => {
    const map = {};
    posts.forEach((post) => {
      if (!map[post.date]) {
        map[post.date] = [];
      }
      map[post.date].push(post);
    });
    return map;
  }, [posts]);

  // Performance Optimization (useMemo): Month Grid Generation (42 days)
  const monthDays = useMemo(() => {
    return getMonthGrid(currentDate);
  }, [currentDate]);

  // Performance Optimization (useMemo): Week Grid Generation (7 days)
  const weekDays = useMemo(() => {
    return getWeekDays(currentDate);
  }, [currentDate]);

  // Callback Optimizations (useCallback): Stable event handlers passed to cells
  const handleDropPost = useCallback((postId, newDate) => {
    dispatch(movePost({ id: postId, newDate }));
  }, [dispatch]);

  const handleCellClick = useCallback((date) => {
    setSelectedDate(date);
    setSelectedPost(null);
    setIsModalOpen(true);
  }, []);

  const handleEditPost = useCallback((post) => {
    setSelectedPost(post);
    setSelectedDate(post.date);
    setIsModalOpen(true);
  }, []);

  const handleSavePost = (postData) => {
    if (postData.id) {
      dispatch(updatePost(postData));
    } else {
      dispatch(addPost(postData));
    }
    setIsModalOpen(false);
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
    setIsModalOpen(false);
  };

  const handleNavigate = (newDate) => {
    dispatch(setCurrentDate(newDate));
  };

  const handleViewChange = (newView) => {
    dispatch(setViewMode(newView));
  };

  // --- Views Renders ---
  
  // Month Grid View
  const renderMonthView = () => (
    <div className="calendar-view-container">
      {/* Month Days Header */}
      <div className="weekdays-grid-header">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekday-header-label">
            {day}
          </div>
        ))}
      </div>
      {/* Month Days Cells */}
      <div className="days-grid-cells">
        {monthDays.map((day) => (
          <DayCell
            key={day.date}
            date={day.date}
            dayLabel={day.dayLabel}
            isCurrentMonth={day.isCurrentMonth}
            isToday={day.isToday}
            posts={postsByDate[day.date] || []}
            onCellClick={handleCellClick}
            onEditPost={handleEditPost}
            onDropPost={handleDropPost}
            performanceHighlight={performanceHighlight}
            forceRenderKey={forceRenderKey}
          />
        ))}
      </div>
    </div>
  );

  // Week Grid View
  const renderWeekView = () => (
    <div className="calendar-view-container">
      <div className="weekdays-grid-header">
        {weekDays.map((day) => (
          <div key={day.date} className="weekday-header-label">
            {day.weekdayName} {day.dayLabel}
          </div>
        ))}
      </div>
      <div className="days-grid-cells">
        {weekDays.map((day) => (
          <DayCell
            key={day.date}
            date={day.date}
            dayLabel=""
            isCurrentMonth={true}
            isToday={day.isToday}
            posts={postsByDate[day.date] || []}
            onCellClick={handleCellClick}
            onEditPost={handleEditPost}
            onDropPost={handleDropPost}
            performanceHighlight={performanceHighlight}
            forceRenderKey={forceRenderKey}
          />
        ))}
      </div>
    </div>
  );

  // Day List/Timeline View
  const renderDayView = () => {
    const dayPosts = postsByDate[currentDate] || [];
    return (
      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="timeline-container">
          <div className="timeline-header">
            <h3 className="brand-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarIcon className="w-5 h-5 text-indigo-400" />
              Timeline for {new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
            <button
              onClick={() => handleCellClick(currentDate)}
              className="btn-save"
            >
              <Plus className="w-3.5 h-3.5" /> Add Post
            </button>
          </div>

          {dayPosts.length === 0 ? (
            <div className="empty-timeline-state">
              <CalendarIcon style={{ width: '40px', height: '40px', color: 'var(--text-muted)' }} />
              <p className="empty-timeline-title">No posts scheduled for this day</p>
              <p className="empty-timeline-subtitle">Click the button above to add one!</p>
            </div>
          ) : (
            <div className="timeline-posts-list">
              {dayPosts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => handleEditPost(post)}
                  className="timeline-post-row"
                >
                  <div className="timeline-post-details">
                    <div className="timeline-post-meta">
                      <span className="timeline-post-title">{post.title}</span>
                      <span className="timeline-post-platform">
                        {post.platform}
                      </span>
                    </div>
                    <p className="timeline-post-body">{post.content}</p>
                  </div>
                  <div className="timeline-post-timing">
                    <span className="timeline-time-badge">
                      {post.time}
                    </span>
                    <span className={`post-card-status-badge badge-${post.status}`}>
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <main className="app-main">
        {/* Calendar Nav and View Settings */}
        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onNavigate={handleNavigate}
          onViewChange={handleViewChange}
        />

        {/* Dashboard Content */}
        <div className="dashboard-grid">
          
          {/* Main Calendar View Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'day' && renderDayView()}
          </div>

          {/* Performance Control Panel */}
          <div>
            <PerformancePanel />
          </div>

        </div>

      </main>

      {/* Schedule / Edit Post Dialog Modal */}
      <PostModal
        isOpen={isModalOpen}
        post={selectedPost}
        date={selectedDate}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePost}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
