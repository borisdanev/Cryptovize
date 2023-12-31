import { createSlice } from "@reduxjs/toolkit";
const displaySlice = createSlice({
  name: "display",
  initialState: "Market Data",
  reducers: {
    selectDisplay(_, action) {
      return action.payload;
    },
  },
});
export const { selectDisplay } = displaySlice.actions;
export default displaySlice.reducer;
