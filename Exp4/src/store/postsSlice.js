import { createSlice } from '@reduxjs/toolkit';

const getTodayString = (offsetDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

const initialState = {
  posts: [
    {
      id: '1',
      title: 'Product Launch Announcement',
      content: 'Unveiling our new release: collaborative editing, instant sync, and clean scheduling interface.',
      date: getTodayString(0),
      time: '10:00',
      platform: 'twitter',
    },
    {
      id: '2',
      title: 'Weekly Tech Blog & Tutorial',
      content: 'A comprehensive guide on building interactive calendar UIs and temporal state management in React.',
      date: getTodayString(1),
      time: '14:30',
      platform: 'linkedin',
    },
    {
      id: '3',
      title: 'Customer Case Study & Spotlight',
      content: 'Discover how modern engineering teams simplify social media scheduling and post organization.',
      date: getTodayString(-2),
      time: '19:00',
      platform: 'instagram',
    },
    {
      id: '4',
      title: 'UI Design System Walkthrough',
      content: 'Exploring clean temporal layouts, responsive calendars, and drag-and-drop interactions.',
      date: getTodayString(2),
      time: '09:15',
      platform: 'twitter',
    },
    {
      id: '5',
      title: 'Community Q&A Sync',
      content: 'Live developer discussion covering calendar component architecture and Redux state synchronization.',
      date: getTodayString(0),
      time: '11:30',
      platform: 'facebook',
    },
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        ...action.payload,
        id: Math.random().toString(36).substring(2, 9),
      });
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    movePost: (state, action) => {
      const { id, newDate } = action.payload;
      const post = state.posts.find((p) => p.id === id);
      if (post) {
        post.date = newDate;
      }
    },
  },
});

export const { addPost, updatePost, deletePost, movePost } = postsSlice.actions;
export default postsSlice.reducer;
