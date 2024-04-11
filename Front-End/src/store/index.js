import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./feature/userSlice"
import themeReducer from "./feature/themeSlice"
import activeIndexSlice from "./feature/activeIndexSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    activeIndex:activeIndexSlice
  },
})
export default store
