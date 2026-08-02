import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, editPost } from '../features/posts/postsSlice';

function AddPost({ editingPost, setEditingPost }) {
  const dispatch = useDispatch();
  
  // Select platforms from the Redux store to populate the dropdown select list
  const platforms = useSelector((state) => state.platforms.list);

  // Component local state for form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState(platforms[0]?.name || '');

  // Update form inputs if editingPost prop changes
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
      setPlatform(editingPost.platform);
    } else {
      setTitle('');
      setContent('');
      setPlatform(platforms[0]?.name || '');
    }
  }, [editingPost, platforms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !platform) return;

    if (editingPost) {
      // Dispatch action to update the existing post
      dispatch(editPost({
        id: editingPost.id,
        title,
        content,
        platform
      }));
      setEditingPost(null); // Clear editing state
    } else {
      // Dispatch action to add a new post
      dispatch(addPost({
        id: Date.now().toString(), // Generate simple unique ID
        title,
        content,
        platform
      }));
    }

    // Reset local state fields
    setTitle('');
    setContent('');
  };

  return (
    <div className="card form-container">
      <h3>{editingPost ? '✏️ Edit Post' : '➕ Add New Post'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">Post Title</label>
          <input
            type="text"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-platform">Platform</label>
          <select
            id="post-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.name}>
                {p.icon} {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="post-content">Content</label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
            rows="4"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingPost ? 'Update Post' : 'Publish Post'}
          </button>
          {editingPost && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditingPost(null)}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddPost;
