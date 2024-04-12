import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
    userImg: null,
  },
  reducers: {
    setUser(state, action) {
      // console.log("action", action)
      state.userId = action.payload.userId
      state.username = action.payload.username
      state.userImg = action.payload.userImg
    },
    logout: state => {
      state.userId = null,
      state.username = null,
      state.userImg = null
    },
  },
})

export const { setUser, logout } = userSlice.actions

export const selectUser = state => state.user

export default userSlice.reducer
