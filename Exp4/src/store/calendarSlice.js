import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDate: new Date().toISOString().split('T')[0],
  viewMode: 'month',
  performanceHighlight: true,
  memoizationEnabled: true,
  renderTrigger: 0, // Used to trigger re-renders when memoization is disabled
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    togglePerformanceHighlight: (state) => {
      state.performanceHighlight = !state.performanceHighlight;
    },
    toggleMemoization: (state) => {
      state.memoizationEnabled = !state.memoizationEnabled;
    },
    triggerRender: (state) => {
      state.renderTrigger += 1;
    },
  },
});

export const {
  setCurrentDate,
  setViewMode,
  togglePerformanceHighlight,
  toggleMemoization,
  triggerRender,
} = calendarSlice.actions;

export default calendarSlice.reducer;
