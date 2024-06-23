import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from './slice/EmployeeSlice'
import ProjectsSlice from './slice/ProjectsSlice'
import employeeApi from "./slice/apiEmployeeSlice"
import projectApi from './slice/apiProjectSlice'
import holidaysApi from './slice/apiHolidaySlice'
import forgotApi from './slice/apiForgetPassword'
import categoryApi from './slice/apiCategorySlice'
import inventoryApi from './slice/apiInventorySlice'
import departmentApi from './slice/apiDepartmentSlice'
import leaveReqApi from './slice/apiLeaveReqSlice'

export const store = configureStore({
  reducer: {
    employees: employeeSlice,
    Project : ProjectsSlice,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [holidaysApi.reducerPath]: holidaysApi.reducer,
    [forgotApi.reducerPath]:forgotApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [inventoryApi.reducerPath]:inventoryApi.reducer,
    [departmentApi.reducerPath]:departmentApi.reducer,
    [leaveReqApi.reducerPath]:leaveReqApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(employeeApi.middleware)
    .concat(projectApi.middleware)
    .concat(holidaysApi.middleware)
    .concat(forgotApi.middleware)
    .concat(categoryApi.middleware)
    .concat(inventoryApi.middleware)
    .concat(departmentApi.middleware)
    .concat(leaveReqApi.middleware)
})

