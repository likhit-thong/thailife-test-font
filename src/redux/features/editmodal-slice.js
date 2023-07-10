import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {
    open: false,
    emp: {},
  },
};

const editModalSlice = createSlice({
  name: "editModal",
  initialState,
  reducers: {
    setEditModal: (state, action) => {
      const { payload } = action;
      state.values.open = payload.open;
      if (!payload.open) {
        state.values.emp = {};
      } else {
        state.values.emp = payload.emp;
      }
    },
  },
});

export const { setEditModal } = editModalSlice.actions;
export default editModalSlice.reducer;
