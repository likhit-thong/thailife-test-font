import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {
    searchListEmp: [],
    globalEmpMaster: null,
  },
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setSearchListEmp: (state, action) => {
      const { payload } = action;
      state.values.searchListEmp = payload;
    },
    setGlobalEmpMaster: (state, action) => {
      const { payload } = action;
      state.values.globalEmpMaster = payload;
    },
  },
});

export const { setSearchListEmp, setGlobalEmpMaster } = employeeSlice.actions;
export default employeeSlice.reducer;
