import { createSlice } from '@reduxjs/toolkit';

const searchTextSlice = createSlice({
  name: 'searchText',
  initialState: {
    value: '',
  },
  reducers: {
    setSearchText(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setSearchText} = searchTextSlice.actions;
export default searchTextSlice.reducer;
