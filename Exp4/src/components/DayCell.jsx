import React, { useState } from 'react';
import PostCard from './PostCard';

export default function DayCell({
  date,
  dayLabel,
  isCurrentMonth,
  isToday,
  posts = [],
  onCellClick,
  onEditPost,
  onDropPost,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

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
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onCellClick(date)}
      className={`day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isDragOver ? 'drag-over' : ''}`}
    >
      <div className="day-cell-header">
        <span className="day-cell-number">{dayLabel}</span>
      </div>

      <div className="day-cell-posts-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEditClick={onEditPost}
          />
        ))}
      </div>
    </div>
  );
}
