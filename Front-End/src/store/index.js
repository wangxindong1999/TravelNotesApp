import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./feature/userSlice"
import themeReducer from "./feature/themeSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
})
export default store
