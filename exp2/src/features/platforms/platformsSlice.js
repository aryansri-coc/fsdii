import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { id: 'p1', name: 'Instagram', color: '#E1306C', icon: '📸' },
    { id: 'p2', name: 'LinkedIn', color: '#0077B5', icon: '💼' },
    { id: 'p3', name: 'Twitter/X', color: '#1DA1F2', icon: '🐦' },
    { id: 'p4', name: 'Facebook', color: '#1877F2', icon: '👥' }
  ]
};

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    // We can add simple reducers if needed, e.g., to add a platform, but it is mainly used for read-only store data in this experiment.
  }
});

export default platformsSlice.reducer;
