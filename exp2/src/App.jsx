import React, { useState } from 'react';
import AddPost from './components/AddPost';
import Posts from './features/posts/Posts';
import Platforms from './features/platforms/Platforms';
import './App.css';

function App() {
  // Local state to keep track of which post is currently being edited.
  // This allows the AddPost form and the Posts list to interact seamlessly.
  const [editingPost, setEditingPost] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-badge">Full Stack Development Lab</div>
        <h1>Centralized State Management using Redux Toolkit</h1>
        <p className="subtitle">
          Demonstrating global state, slices, reducers, and async thunks for a normalized multi-slice Redux application.
        </p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          {/* Component displaying the list of active social media platforms */}
          <Platforms />

          {/* Form to add or edit posts */}
          <AddPost editingPost={editingPost} setEditingPost={setEditingPost} />
        </aside>

        <section className="feed-section">
          {/* Feed list of posts with actions to edit and delete */}
          <Posts setEditingPost={setEditingPost} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Full Stack Development Experiment • Academic Purpose Only</p>
      </footer>
    </div>
  );
}

export default App;
