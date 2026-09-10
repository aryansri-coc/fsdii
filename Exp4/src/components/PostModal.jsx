import React, { useState, useEffect } from 'react';
import { X, Send, Trash2, Calendar, Edit2 } from 'lucide-react';

export default function PostModal({ post, date, isOpen, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [postDate, setPostDate] = useState('');
  const [postTime, setPostTime] = useState('09:00');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPlatform(post.platform);
      setPostDate(post.date);
      setPostTime(post.time);
    } else {
      setTitle('');
      setContent('');
      setPlatform('twitter');
      setPostDate(date || new Date().toISOString().split('T')[0]);
      setPostTime('09:00');
    }
  }, [post, date, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      id: post ? post.id : undefined,
      title,
      content,
      platform,
      date: postDate,
      time: postTime,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {post ? (
              <Edit2 style={{ width: '20px', height: '20px', color: 'var(--color-primary)' }} />
            ) : (
              <Calendar style={{ width: '20px', height: '20px', color: 'var(--color-primary)' }} />
            )}
            {post ? 'Edit Post' : 'Create New Post'}
          </h3>
          <button
            onClick={onClose}
            className="modal-close-btn"
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-form">
          <div className="form-group">
            <label className="form-label">Post Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Product Changelog & Feature Release"
              className="form-input"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                required
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="time"
                required
                value={postTime}
                onChange={(e) => setPostTime(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="form-select"
            >
              <option value="twitter">X / Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Post Content</label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What would you like to share?"
              className="form-textarea"
            />
          </div>

          <div className="modal-footer">
            {post ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(post.id);
                  onClose();
                }}
                className="btn-delete"
              >
                <Trash2 style={{ width: '16px', height: '16px' }} />
                Delete
              </button>
            ) : (
              <div />
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save"
              >
                <Send style={{ width: '16px', height: '16px' }} />
                {post ? 'Update' : 'Save Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
