import { createSlice } from "@reduxjs/toolkit"
const type = ["特征分类1", "特征分类2", "特征分类3"]
const category = ["特征类型1", "特征类型2", "特征类型3"]
const listSlice = createSlice({
  name: "listSlice",
  initialState: {
    currentUser: "",
    listData: [],
    currentLimit: {},
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload.result.username
      state.currentLimit = action.payload.result2
    },
    setListData(state, action) {
      state.listData = action.payload.map((item) => ({
        ...item,
        key: item._id,
        category: category[item.category - 1],
        type: type[item.type - 1],
        isShare: item.isShare ? "是" : "否",
      }))
    },
  },
})
export const { setListData, setCurrentUser } = listSlice.actions
export const listReducer = listSlice.reducer
