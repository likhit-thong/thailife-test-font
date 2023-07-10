"use client";
import { createSlice } from "@reduxjs/toolkit";

let menuIndex;
if (typeof window !== "undefined") {
  menuIndex = localStorage.getItem("E_MENU_INDEX");
}

const initialState = {
  values: {
    menuIndex: menuIndex ? JSON.parse(menuIndex) : ["1"],
  },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setMenuIndex: (state, action) => {
      localStorage.setItem("E_MENU_INDEX", JSON.stringify(action.payload));
      state.values.menuIndex = action.payload;
    },
  },
});

export const { setMenuIndex } = settingSlice.actions;
export default settingSlice.reducer;
