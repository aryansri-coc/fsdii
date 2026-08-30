import { createSlice } from '@reduxjs/toolkit';

// Utility to get today's date formatted as YYYY-MM-DD
const getTodayString = (offsetDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

const initialState = {
  posts: [
    {
      id: '1',
      title: 'Vibe Check 🌌',
      content: 'Launching our brand new dark-themed productivity dashboard next week! Who is excited? #buildinpublic #webdev',
      date: getTodayString(0),
      time: '10:00',
      platform: 'twitter',
      status: 'scheduled',
    },
    {
      id: '2',
      title: 'Design System Principles 🎨',
      content: 'A deep dive into building maintainable, high-performance UI systems with strict memoization in React. React.memo is your friend.',
      date: getTodayString(1),
      time: '14:30',
      platform: 'linkedin',
      status: 'scheduled',
    },
    {
      id: '3',
      title: 'Vibrant Gradients Showcase ✨',
      content: 'CSS Glassmorphism and Neon accents tutorial drops tonight at 8 PM. Turn on notifications!',
      date: getTodayString(-2),
      time: '20:00',
      platform: 'instagram',
      status: 'published',
    },
    {
      id: '4',
      title: 'Performance Benchmark ⚡',
      content: 'Comparing re-renders with and without component-level memoization. Check out our real-time visualizer tool!',
      date: getTodayString(2),
      time: '09:15',
      platform: 'twitter',
      status: 'scheduled',
    },
    {
      id: '5',
      title: 'Weekly Team Update 📈',
      content: 'Quarterly planning sessions and goal alignment. Let us review roadmap items and deliver value.',
      date: getTodayString(0),
      time: '11:30',
      platform: 'facebook',
      status: 'draft',
    }
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      });
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    movePost: (state, action) => {
      const { id, newDate } = action.payload;
      const post = state.posts.find(p => p.id === id);
      if (post) {
        post.date = newDate;
      }
    },
  },
});

export const { addPost, updatePost, deletePost, movePost } = postsSlice.actions;
export default postsSlice.reducer;
