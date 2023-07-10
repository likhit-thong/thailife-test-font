import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./features/employee-slice";
import settingReducer from "./features/setting-slice";
import editmodalReducer from "./features/editmodal-slice";

export const store = configureStore({
  reducer: {
    employeeReducer,
    settingReducer,
    editmodalReducer,
  },
});
