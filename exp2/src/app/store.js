import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import platformsReducer from '../features/platforms/platformsSlice';

// configureStore automatically combines the slices and sets up the Redux DevTools extension
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformsReducer
  }
});
