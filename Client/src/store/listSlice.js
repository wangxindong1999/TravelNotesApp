import { createSlice } from "@reduxjs/toolkit"
const type = ["特征分类1", "特征分类2", "特征分类3"]
const category = ["特征类型1", "特征类型2", "特征类型3"]
const listSlice = createSlice({
  name: "listSlice",
  initialState: {
    currentPath: "",
  },
  reducers: {
    setCurrenPath(state, actions) {
      state.currentPath = actions.payload
    },
  },
})
export const { setCurrenPath } = listSlice.actions
export const listReducer = listSlice.reducer
