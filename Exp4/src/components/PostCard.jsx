import React from 'react';

export default function PostCard({ post, onEditClick }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', post.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      onClick={(e) => {
        e.stopPropagation();
        onEditClick(post);
      }}
      className={`post-card platform-${post.platform}`}
      title={`${post.title} - Click to edit, drag to reschedule`}
    >
      <div className="post-card-header">
        <span className="post-card-title">{post.title}</span>
      </div>

      <p className="post-card-content">{post.content}</p>

      <div className="post-card-footer">
        <span className="post-card-time">{post.time}</span>
      </div>
    </article>
  );
}
