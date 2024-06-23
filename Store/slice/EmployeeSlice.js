import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: "",
  userId:"",
};
const EmployeeSlice = createSlice({
  name: "EmployeeSlice",
  initialState,
  reducers: {
    getLogedInEmp: (state, action) => {
      state.logedInEmp = action.payload;
    },
    editEmp: (state, action) => {
      state.Employees = action.payload;
    },
    setUserId:(state,action)=>{
      state.userId= action.payload;
    },
    getRole: (state, action) => {
      state.userRole = action.payload;
    },
    
    setSelectedEmp: (state, action) => {
      state.selectedEmp = action.payload;
    },
    deleteEmp: (state, action) => {
      state.Employees = action.payload;
    },
  },
});

export const {
  editEmp,
  getRole,
  getLogedInEmp,
  setSelectedEmp,
  deleteEmp,
  setUserId,
} = EmployeeSlice.actions;
export default EmployeeSlice.reducer;