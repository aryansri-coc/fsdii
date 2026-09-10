import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, updatePost, deletePost, movePost } from './store/postsSlice';
import { setCurrentDate, setViewMode } from './store/calendarSlice';
import { getMonthGrid, getWeekDays } from './utils/dateHelpers';

import CalendarHeader from './components/CalendarHeader';
import DayCell from './components/DayCell';
import PostModal from './components/PostModal';

import { Plus, Calendar as CalendarIcon } from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function App() {
  const dispatch = useDispatch();

  const { currentDate, viewMode } = useSelector((state) => state.calendar);
  const posts = useSelector((state) => state.posts.posts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const monthDays = useMemo(() => {
    return getMonthGrid(currentDate);
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return getWeekDays(currentDate);
  }, [currentDate]);

  const handleDropPost = useCallback(
    (postId, newDate) => {
      dispatch(movePost({ id: postId, newDate }));
    },
    [dispatch]
  );

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

  const renderMonthView = () => (
    <div className="calendar-view-container">
      <div className="weekdays-grid-header">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekday-header-label">
            {day}
          </div>
        ))}
      </div>
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
          />
        ))}
      </div>
    </div>
  );

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
            dayLabel={day.dayLabel}
            isCurrentMonth={true}
            isToday={day.isToday}
            posts={postsByDate[day.date] || []}
            onCellClick={handleCellClick}
            onEditPost={handleEditPost}
            onDropPost={handleDropPost}
          />
        ))}
      </div>
    </div>
  );

  const renderDayView = () => {
    const dayPosts = postsByDate[currentDate] || [];
    return (
      <div className="timeline-container">
        <div className="timeline-header">
          <h3 className="brand-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon style={{ width: '20px', height: '20px', color: 'var(--color-primary)' }} />
            Schedule for {new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </h3>
          <button
            onClick={() => handleCellClick(currentDate)}
            className="btn-save"
          >
            <Plus style={{ width: '15px', height: '15px' }} /> Add Post
          </button>
        </div>

        {dayPosts.length === 0 ? (
          <div className="empty-timeline-state">
            <CalendarIcon style={{ width: '40px', height: '40px', color: 'var(--text-muted)' }} />
            <p className="empty-timeline-title">No posts scheduled for this day</p>
            <p className="empty-timeline-subtitle">Click &quot;Add Post&quot; above to schedule one</p>
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
                    <span className="timeline-post-platform">{post.platform}</span>
                  </div>
                  <p className="timeline-post-body">{post.content}</p>
                </div>
                <div className="timeline-post-timing">
                  <span className="timeline-time-badge">{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <main className="app-main">
        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onNavigate={handleNavigate}
          onViewChange={handleViewChange}
          onNewPost={() => handleCellClick(currentDate)}
        />

        <div className="dashboard-grid">
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </div>
      </main>

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
