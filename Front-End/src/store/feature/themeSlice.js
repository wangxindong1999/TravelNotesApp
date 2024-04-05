import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    back_theme: "black",
    font_theme: "white",
  },
  reducers: {
    setTheme(state, action) {
      state.back_theme = action.payload.back_theme
      state.font_theme = action.payload.font_theme
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
