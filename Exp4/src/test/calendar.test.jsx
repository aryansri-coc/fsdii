import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer, { addPost, movePost } from '../store/postsSlice';
import calendarReducer, { setViewMode } from '../store/calendarSlice';
import App from '../App';

// Helper to configure a fresh store instance for each test
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      calendar: calendarReducer,
    },
    preloadedState,
  });
};

describe('Redux Slices Tests (Unit Logic)', () => {
  it('should add a new post correctly', () => {
    const store = createMockStore();
    const newPost = {
      title: 'New Social Post Test',
      content: 'Testing vitest suite',
      date: '2026-08-15',
      time: '12:00',
      platform: 'twitter',
      status: 'scheduled',
    };
    
    store.dispatch(addPost(newPost));
    const state = store.getState();
    const addedPost = state.posts.posts.find(p => p.title === 'New Social Post Test');
    
    expect(addedPost).toBeDefined();
    expect(addedPost.content).toBe('Testing vitest suite');
    expect(addedPost.date).toBe('2026-08-15');
  });

  it('should move/reschedule a post correctly', () => {
    const store = createMockStore();
    const stateBefore = store.getState();
    const originalPost = stateBefore.posts.posts[0];
    
    store.dispatch(movePost({ id: originalPost.id, newDate: '2026-08-25' }));
    
    const stateAfter = store.getState();
    const updatedPost = stateAfter.posts.posts.find(p => p.id === originalPost.id);
    expect(updatedPost.date).toBe('2026-08-25');
  });

  it('should handle calendar view changes', () => {
    const store = createMockStore();
    store.dispatch(setViewMode('week'));
    expect(store.getState().calendar.viewMode).toBe('week');
  });
});

describe('Calendar Scheduler UI (Component Integration Tests)', () => {
  it('renders the header title and brand info', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(screen.getByText('Social Scheduler')).toBeInTheDocument();
    expect(screen.getByText('Map & organize your posts visually')).toBeInTheDocument();
  });

  it('renders weekdays headers in Month View', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    // Check that weekday labels are loaded
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('toggles view modes when buttons are clicked', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const weekButton = screen.getByRole('button', { name: /week/i });
    fireEvent.click(weekButton);

    expect(store.getState().calendar.viewMode).toBe('week');
  });
});
