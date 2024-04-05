import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "John Doe",
    age: 30,
  },
  reducers: {
    setName(state, action) {
      console.log("action", action)
      state.name = action.payload
    },
    setAge(state, action) {
      state.age = action.payload
    },
  },
})

export const { setName, setAge } = userSlice.actions
export default userSlice.reducer
