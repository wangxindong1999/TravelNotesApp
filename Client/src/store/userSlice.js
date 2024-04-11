import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
  name: "listSlice",
  initialState: {
    userInfo: {},
    searchKey: "",
  },
  reducers: {
    setUserInfo(state, actions) {
      state.userInfo = actions.payload
    },
    setTravelList(state, actions) {
      console.log(actions.payload)
      state.travleList = actions.payload
    },
    setSearchKey(state, actions) {
      state.searchKey = actions.payload
    },
  },
})
export const { setUserInfo, setTravelList, setSearchKey } = userSlice.actions
export const userReducer = userSlice.reducer
