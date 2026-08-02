import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, fetchPosts } from './postsSlice';

function Posts({ setEditingPost }) {
  const dispatch = useDispatch();
  
  // Select state fields using useSelector
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const handleFetchMockData = () => {
    dispatch(fetchPosts());
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h3>📋 Platform Feed ({posts.length})</h3>
        <button 
          onClick={handleFetchMockData} 
          className="btn btn-async"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading Async Data...' : '⚡ Load Mock Async Data'}
        </button>
      </div>

      {status === 'failed' && <div className="alert alert-error">Error: {error}</div>}

      {posts.length === 0 ? (
        <div className="empty-state">No posts published yet. Use the form above to add one!</div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="card post-card">
              <div className="post-meta">
                <span className="badge-platform">{post.platform}</span>
                <span className="post-id">ID: {post.id}</span>
              </div>
              <h4 className="post-title">{post.title}</h4>
              <p className="post-body">{post.content}</p>
              <div className="post-actions">
                <button
                  onClick={() => setEditingPost(post)}
                  className="btn btn-outline-primary"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => dispatch(deletePost(post.id))}
                  className="btn btn-outline-danger"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
