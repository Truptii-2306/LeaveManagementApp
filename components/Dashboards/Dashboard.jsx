import React from "react";
import { Grid } from "@mui/material";
import UseReponsive from "../../hooks/UseResponsive";
import LeavePolicy from "./LeavePolicy";
import { LeaveBalanceMobile } from "./LeaveBalanceMobile";
import { LeaveBalanceDeskTop } from "./LeaveBalanceDeskTop";
import UpcomingHolidaysDesktop from "./UpcomingHolidaysDesktop";
import ApproverCard from "./ApproverCard";
import UpcomingHolidaysMobile from "./UpcomingHolidaysMobile";
import { useSelector } from "react-redux";
import EmployeeOnLeave from "./EmployeeOnLeave";

export default function Dashboard() {
  const role=useSelector((state)=>state.employees.userRole)
  const responsive = UseReponsive();

  return (
    <Grid container width="100%" px={1} >
      <Grid container width="100%" >
        <Grid item xs={12}  >
          {responsive.isMobile ? (
            <LeaveBalanceMobile />
          ) : (
            <LeaveBalanceDeskTop />
          )}
        </Grid>

        {responsive.isMobile && (
          <UpcomingHolidaysMobile/>
        )}

        <Grid container columnSpacing={1} mt={1}>
          {
          (role === "Admin" || role === "Manager") && 
          (responsive.isDesktop||responsive.isLaptop||responsive.isTablet) ? (
            <Grid item sm={7} md={7} lg={7}>
              <EmployeeOnLeave/>
              
            </Grid>
          ) : 
          (role === "Admin" || role === "Manager") &&
          (responsive.isMobile)&& (
            <Grid item xs={12}>
              <EmployeeOnLeave/>
            </Grid>
          )}

          {(responsive.isDesktop || responsive.isLaptop || responsive.isTablet) 
          && (role==="Admin" || role==="Manager")
          ? (
          <Grid
            item
            sm={5}
            md={5}
            lg={5}
          >
            <UpcomingHolidaysDesktop />
          </Grid>) :
          (responsive.isDesktop || responsive.isLaptop || responsive.isTablet) && 
          (role==="Employee")&&
          (
            <Grid item sm={5.5} md={5.5} lg={5.5}>
              <UpcomingHolidaysDesktop />
            </Grid>
          )} 
          

          {/* Approver Card-"For Employee"  */}
          {role !== "Admin" && role !== "Manager" && (
            <Grid
              item
              xs={12}
              sm={6.5}
              md={6.5}
              lg={6.5}
              textAlign="left"
            >
              <Grid>
              <ApproverCard />
              </Grid>
              <Grid mt={1}>
                <LeavePolicy />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}