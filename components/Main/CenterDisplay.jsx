import { Routes, Route } from "react-router-dom";
import UseReponsive from "../../hooks/UseResponsive";
import EmployeeList from "../Employee/Employee";
import LeaveReqForm from "../Leaves/leaveReqForm";
import Holidays from "../Holiday/Holidays";
import History from "../Leaves/History";
import Dashboard from "../Dashboards/Dashboard";
import ProjectOnboardForm from "../Project/ProjectForm";
import ProjectList from "../Project/ProjectList";
import EmloyeeDetailForm from "../Employee/EmloyeeForm";
import InventoryForm from "../Inventory/InventoryForm";
import EmployeeMobile from "../Employee/EmployeeMobile";
import HistoryMobile from "../Leaves/HistoryMobile";
import InventoryList from "../Inventory/InventoryList";
import ProjectMbList from "../Project/ProjectMobileView";
import InventoryListMb from "../Inventory/InventoryListMb";
import EmployeeDetails from "../Employee/EmployeeDetails";
import { useState } from "react";
import AddHolidayForm from "../Holiday/AddHolidayForm";
import ProjectDetails from "../Project/ProjectDetails";
import ViewProfile from "../Main/ViewProfile";
import PendingReq from "../Leaves/PendingReq";
import PendingReqMobile from "../Leaves/PendingReqMobile";

export default function CenterDisplay() {
  let [projectAddOrEdit, setProjectAddOrEdit] = useState();
  let [selectedEmpId, setSelectedEmpId] = useState(null);
  let [openDeleteDialouge, setOpenDeleteDialouge] = useState(false);

  function onProjectAddOrEdit(form) {
    setProjectAddOrEdit(form);
  }

  function handleSelectedEmp(id) {
    setSelectedEmpId(id);
  }

  function onOpenDeleteDialogue() {
    setOpenDeleteDialouge(true);
  }
  
  function onCloseDeleteDialogue() {
    setOpenDeleteDialouge(false);
  }

  let responsive = UseReponsive();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/PendingRequest"
        element={responsive.isMobile ? <PendingReqMobile /> : <PendingReq />}
      />
      <Route path="/ApplyLeave" element={<LeaveReqForm />} />
      <Route
        path="/History"
        element={
          responsive.isDesktop || responsive.isLaptop || responsive.isTablet ? (
            <History/>
          ) : (
            <HistoryMobile />
          )
        }
      />
      <Route path="/Holidays" element={<Holidays/>} />
      <Route path="/Holidays/AddHoliday" element={<AddHolidayForm/>} />
      <Route
        path="/Employees"
        element={
          responsive.isMobile ? (
            <EmployeeMobile/>
          ) : (
            <EmployeeList
              handleSelectedEmp={handleSelectedEmp}
            />
          )
        }
      />

      <Route
        path="/:id"
        element={
          <EmployeeDetails
            selectedEmpId={selectedEmpId}
            openDeleteDialouge={openDeleteDialouge}
            onOpenDeleteDialogue={onOpenDeleteDialogue}
            onCloseDeleteDialogue={onCloseDeleteDialogue}
          />
        }
      />

      <Route
        path="/InventoryList"
        element={
          responsive.isMobile ? (
            <InventoryListMb
              openDeleteDialouge={openDeleteDialouge}
              onOpenDeleteDialogue={onOpenDeleteDialogue}
              onCloseDeleteDialogue={onCloseDeleteDialogue}
            />
          ) : (
            <InventoryList
              openDeleteDialouge={openDeleteDialouge}
              onOpenDeleteDialogue={onOpenDeleteDialogue}
              onCloseDeleteDialogue={onCloseDeleteDialogue}
            />
          )
        }
      />
      <Route
        path="/Employees/EmployeeDetailsForm/:id"
        element={
          <EmloyeeDetailForm/>
        }
      />
      <Route
        path="/Projects"
        element={
          responsive.isMobile ? (
            <ProjectMbList onProjectAddOrEdit={onProjectAddOrEdit} />
          ) : (
            <ProjectList onProjectAddOrEdit={onProjectAddOrEdit} />
          )
        }
      />

      <Route
        path="/Profile"
        element={<ViewProfile/>}
      />
      <Route
        path="/Projects/ProjectForm"
        element={<ProjectOnboardForm projectAddOrEdit={projectAddOrEdit} />}
      />
      <Route path="/Inventory/AddInventory" element={<InventoryForm />} />
      <Route
        path="/Employees/NewRegistration/Inventory"
        element={<InventoryForm />}
      />
      <Route
        path="Projects/:Id"
        element={<ProjectDetails onProjectAddOrEdit={onProjectAddOrEdit} />}
      />
      {/* <Route path="/Profile" element={<ViewProfile/>}/> */}
    </Routes>
  );
}