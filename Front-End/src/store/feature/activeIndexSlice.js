import { createSlice } from '@reduxjs/toolkit';

const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState: {
    value: 0,
  },
  reducers: {
    setActiveIndex(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setActiveIndex } = activeIndexSlice.actions;
export default activeIndexSlice.reducer;
