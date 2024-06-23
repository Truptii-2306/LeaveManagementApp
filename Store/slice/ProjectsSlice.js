import { Description } from '@mui/icons-material';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    Projects : [
        {
          Id:1,
          Name: "Employee Management System",
          Project_Manager: "Ketan Rathod",
          Start_date: "2023-08-06",
          Status: "Active",
          Description:"This is an active project"
        },
        {
          Id:2,
          Name: "Horeca",
          Project_Manager: "Prashil Sir",
          Start_date: "2024-02-06",
          Status: "Active",
          Description:"This is an active project"
        },
        {
          Id:3,
          Name: "Bloqcube",
          Project_Manager: "Mehvish Shaikh",
          Start_date: "2022-02-07",
          Status: "Active",
          Description:"This is an active project"
        },
        {
          Id:4,
          Name: "Zopt",
          Project_Manager: "Abhishek Shinde",
          Start_date: "2023-05-09",
          Status: "Active",
          Description:"This is an active project"
        },
        {
          Id:5,
          Name: "Leave Management",
          Project_Manager: "Pratiksha Nimbalkar",
          Start_date: "2021-08-02",
          Status: "Active",
          Description:"This is an active project"
        },
        {
          Id:6,
          Name: "Whatsapp Clone",
          Project_Manager: "Prerana Divekar",
          Start_date: "2021-02-06",
          Status: "Active",
          Description:"This is an active project"
        },
        {
          Id:7,
          Name: "Amazon Clone",
          Project_Manager: "Pruthvi",
          Start_date: "2020-04-09",
          Status: "Active",
          Description:"This is an active project"
        },
        {
          Id:8,
          Name: "Instagram Clone",
          Project_Manager: "Pruthvi",
          Start_date: "2019-08-02",
          Status: "Active",
          Description:"This is an active project"
        },
      ],
      selectedProject:""
}


const Projectlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
      addProject:(state,action)=>{
        state.Projects=action.payload
      },
      selectProject:(state,action)=>{
        state.selectedProject=action.payload
      },
      editProject:(state,action)=>{
        state.Projects=action.payload
      },
      deleteProject:(state,action)=>{
        state.Projects=action.payload
      }
    }
})

export const {
  addProject,
  selectProject,
  editProject,
  deleteProject,
} = Projectlice.actions;
export default Projectlice.reducer