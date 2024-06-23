import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography, Grid,Badge } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { People } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import EventIcon from "@mui/icons-material/Event";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logoImage from "../../assets/ays_logo.jpg";
import UseReponsive from "../../hooks/UseResponsive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector } from "react-redux";
import { useGetPendingRequestByIdQuery, useGetPendingRequestQuery } from "../../Store/slice/apiLeaveReqSlice";
import { useState,useEffect } from "react";

export default function SideDrawer({ handleDrawerClose }) {
  let Navigate = useNavigate();
  let path = useLocation().pathname;
  let selected = path.substring(path.lastIndexOf("/") + 1);
  let selectedItem;
  let sideDrawerList;

  let [pendingRequest, setPendingRequest] = useState([]);
  let [pendingRequestById, setPendingRequestById] = useState([]);

  const { data: PendingRequest, isSuccess} = useGetPendingRequestQuery();

  const id = useSelector((state) => state.employees.userId);
  const role = useSelector((state) => state.employees.userRole);

  const { data: PendingRequestById, isSuccess: isSuccessById } = useGetPendingRequestByIdQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setPendingRequest(PendingRequest||[]);
    }
  }, [isSuccess, PendingRequest]);

  useEffect(() => {
    if (isSuccessById ) {
        setPendingRequestById(PendingRequestById.pendingRequests || []);
    }
}, [isSuccessById, PendingRequestById]);

const PendingRequestList =
role === "Manager"
  ? pendingRequestById || []
  : pendingRequest
  ? pendingRequest.filter((request) => request.emp_id !== id)
  : [];

  let responsive = UseReponsive();
  function onMobile() {
    return responsive.isMobile && handleDrawerClose();
  }

  if (selected !== "Employee") {
    selectedItem = selected;
  } else {
    selectedItem = "Dashboard";
  }

  if (role === "Admin") {
    sideDrawerList = [
      "Dashboard",
      "Pending Request",
      "Apply Leave",
      "History",
      "Holidays",
      "Employees",
      "Projects",
      "Inventory List",
    ];
  }if(role==="Manager"){
    sideDrawerList = [
      "Dashboard",
      "Pending Request",
      "Apply Leave",
      "History",
      "Holidays",
    ]
  } if(role==="Employee") {
    sideDrawerList = ["Dashboard", "Apply Leave", "History", "Holidays"];
  }

  return (
    <div>
      <Toolbar sx={{ ml: "-20px" }}>
        <img
          src={logoImage}
          alt="Logo"
          style={{
            maxWidth: "60px",
            borderRadius: "50%",
            width: "100%",
            height: "100%",
          }}
        />
        <Grid ml="10px">
          <Typography textAlign={"center"} fontWeight={"bold"} color={"darkblue"}>
            LMS
          </Typography>
          <Typography fontWeight={"bold"}>Application</Typography>
        </Grid>
      </Toolbar>
      <Divider />
      <List>
        {sideDrawerList.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              backgroundColor:
                selectedItem === text.split(" ").join("") ? "#E0E0E0" : "white",
            }}
          >
            <ListItemButton
              disableTouchRipple
              onClick={
                text === "Dashboard"
                  ? () => {
                      Navigate("/Employee");
                      onMobile();
                    }
                  : text==="Pending Request"
                  ? ()=>{
                    Navigate("/Employee/PendingRequest");
                    onMobile();
                  }
                  : text === "Apply Leave"
                  ? () => {
                      Navigate("/Employee/ApplyLeave");
                      onMobile();
                    }
                  : text === "History"
                  ? () => {
                      Navigate("/Employee/History");
                      onMobile();
                    }
                  : text === "Holidays"
                  ? () => {
                      Navigate("/Employee/Holidays");
                      onMobile();
                    }
                  : text === "Employees"
                  ? () => {
                      Navigate("/Employee/Employees");
                      onMobile();
                    }
                  : text === "Projects"
                  ? () => {
                      Navigate("/Employee/Projects");
                      onMobile();
                    }
                  : () => {
                      Navigate("/Employee/InventoryList");
                      onMobile();
                    }
              }
            >
              <ListItemIcon>
                {text === "Dashboard" ? (
                  <HomeIcon />
                )
                : text=== "Pending Request" ?(
                  <Badge badgeContent={PendingRequestList.length} color="primary"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                  <PendingActionsIcon/>
                  </Badge>
                )
                : text === "Apply Leave" ? (
                  <SendIcon />
                ) : text === "History" ? (
                  <HistoryIcon />
                ) : text === "Holidays" ? (
                  <EventIcon />
                ) : text === "Employees" ? (
                  <People />
                ) : text === "Projects" ? (
                  <AssignmentIcon />
                ) : 
                  <CategoryIcon/>
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
