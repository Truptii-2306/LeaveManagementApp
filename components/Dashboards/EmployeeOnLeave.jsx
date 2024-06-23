import React from "react";
import {
  Card,
  Typography,
  Grid,
  CardContent,
  Divider,
  Box
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useGetEmpOnLeaveTodayQuery } from "../../Store/slice/apiLeaveReqSlice";

export default function EmployeeOnLeave() {
  const { data: employees,isLoading,isError} = useGetEmpOnLeaveTodayQuery();
  const Employees= employees || []; 

  if (isLoading) {
    return 
    <CircularProgress />; 
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Card sx={{ height: "100%"}}>
        <CardContent sx={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Typography fontWeight={"bold"} textAlign={"left"} fontSize={"16px"}>
          Employees on leave
        </Typography>
      </CardContent>
      <Divider/>
      <Grid
        container
        sx={{
          overflowY: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          height: "50vh",
          paddingTop:"0%",
          mt:"0%"

        }}
      >
        <Grid item xs={12}>
          <Grid
            sx={{
              height: "45vh",
              overflowY: "auto",
              scrollbarWidth: "thin",
              bgcolor: "white",
              minHeight:"100%"
            }}
          >
            {Employees.length > 0 && Employees.map((emp,index) => (
                <Box sx={{p:"1%"}}> 
                <ListItem alignItems="flex-start" mx={1}>           
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item>
                        <Avatar
                        sx={{width:"50px",height:"50px"}}
                          alt={emp.leaveRequest.employee.name}
                          src={emp.leaveRequest.employee.image===null?"":URL.createObjectURL(
                            new Blob([new Uint8Array(emp.leaveRequest.employee.image.data)])
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          sx={{
                            textTransform: "none",
                            color: "black",
                            fontWeight: "30",
                          }}
                        >
                          { emp.leaveRequest.employee.name}
                        </Typography>
                        <Typography sx={{fontSize:"12px"}}>
                            {emp.leaveRequest.start_date} - {emp.leaveRequest.end_date}
                        </Typography>
                      </Grid>
                    </Grid>                 
                </ListItem> 
                <Divider variant="inset"/> 
                </Box>             
            ))}
             </Grid>
          </Grid>
      </Grid>
    </Card>
  );
}