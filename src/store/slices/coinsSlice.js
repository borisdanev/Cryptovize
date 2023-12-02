import { createSlice } from "@reduxjs/toolkit";
const coinsSlice = createSlice({
  name: "coins",
  initialState: null,
  reducers: {
    selectCoin(state, action) {
      return action.payload;
    },
  },
});
export const { selectCoin } = coinsSlice.actions;
export default coinsSlice.reducer;
