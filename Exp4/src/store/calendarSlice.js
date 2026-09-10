import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDate: new Date().toISOString().split('T')[0],
  viewMode: 'month',
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
  },
});

export const { setCurrentDate, setViewMode } = calendarSlice.actions;
export default calendarSlice.reducer;
