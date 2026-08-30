import React, { useRef, useEffect, useState } from 'react';
import PostCard from './PostCard';

function DayCellComponent({
  date,
  dayLabel,
  isCurrentMonth,
  isToday,
  posts,
  onCellClick,
  onEditPost,
  onDropPost,
  performanceHighlight,
  forceRenderKey,
}) {
  const cellRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Performance visualizer: Flash when rendering
  useEffect(() => {
    if (performanceHighlight && cellRef.current) {
      const el = cellRef.current;
      el.classList.add('flash-render');
      const timer = setTimeout(() => {
        el.classList.remove('flash-render');
      }, 400);
      return () => clearTimeout(timer);
    }
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const postId = e.dataTransfer.getData('text/plain');
    if (postId) {
      onDropPost(postId, date);
    }
  };

  return (
    <div
      ref={cellRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onCellClick(date)}
      className={`day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isDragOver ? 'drag-over' : ''}`}
    >
      <div className="day-cell-header">
        <span className="day-cell-number">
          {dayLabel}
        </span>
        {posts.length > 0 && (
          <span className="day-cell-count">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        )}
      </div>

      <div className="day-cell-posts-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEditClick={onEditPost}
            performanceHighlight={performanceHighlight}
            forceRenderKey={forceRenderKey}
          />
        ))}
      </div>
    </div>
  );
}

// Custom equal check for strict memoization
const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.date !== nextProps.date ||
    prevProps.dayLabel !== nextProps.dayLabel ||
    prevProps.isCurrentMonth !== nextProps.isCurrentMonth ||
    prevProps.isToday !== nextProps.isToday ||
    prevProps.performanceHighlight !== nextProps.performanceHighlight ||
    prevProps.forceRenderKey !== nextProps.forceRenderKey
  ) {
    return false;
  }

  if (prevProps.posts.length !== nextProps.posts.length) {
    return false;
  }

  for (let i = 0; i < prevProps.posts.length; i++) {
    const p1 = prevProps.posts[i];
    const p2 = nextProps.posts[i];
    if (
      p1.id !== p2.id ||
      p1.title !== p2.title ||
      p1.content !== p2.content ||
      p1.date !== p2.date ||
      p1.time !== p2.time ||
      p1.platform !== p2.platform ||
      p1.status !== p2.status
    ) {
      return false;
    }
  }

  return true;
};

export const DayCell = React.memo(DayCellComponent, areEqual);
export default DayCell;
