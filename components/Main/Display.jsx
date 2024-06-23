import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Stack, Toolbar, Grid, CircularProgress } from "@mui/material";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import CenterDisplay from "./CenterDisplay";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import { useDispatch, useSelector } from "react-redux";
import { useGetEmployeesByIdQuery } from "../../Store/slice/apiEmployeeSlice";
import { getRole, setUserId } from "../../Store/slice/EmployeeSlice";
import UseReponsive from "../../hooks/UseResponsive";

function AccountMenu() {
  let Navigate = useNavigate();
  let dispatch = useDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const jwtToken = urlParams.get("jwtToken");
  console.log(jwtToken)
  const storedAuthToken = localStorage.getItem("authToken");

  if (!storedAuthToken && jwtToken) {
    localStorage.setItem("authToken", jwtToken);
    const decodedToken = jwtDecode(jwtToken);
    console.log("Decoded Token:", decodedToken);

    let id = decodedToken.user.id;
    let role = decodedToken.user.role;

    dispatch(getRole(role));
    dispatch(setUserId(id));
  } else if (storedAuthToken) {
    const decodedToken = jwtDecode(storedAuthToken);
    console.log("User Details:", decodedToken);

    let id = decodedToken.user.id;
    let role = decodedToken.user.role;

    dispatch(getRole(role));
    dispatch(setUserId(id));
  } else {
    console.log("No jwtToken provided in URL and no stored token found");
  }

  const cid = useSelector((state) => state.employees.userId);

  const { data: Emp, isLoading, isError } = useGetEmployeesByIdQuery(cid);
  const logedInEmp = Emp || [];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onLogoutClick = () => {
    Navigate("/");
    localStorage.removeItem("authToken");
    console.log("Token Removed Succesfully", localStorage);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    Navigate(`/Employee/Profile`);
  };
  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <></>;
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 0.2 }}>
          <Avatar
            src={
              logedInEmp.image === null
                ? ""
                : URL.createObjectURL(
                    new Blob([new Uint8Array(logedInEmp.image.data)])
                  )
            }
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
      </Tooltip>
      {anchorEl ? (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            px={7}
            py={1.5}
          >
            <Avatar
              style={{ width: "60px", height: "60px" }}
              src={
                logedInEmp.image === null
                  ? ""
                  : URL.createObjectURL(
                      new Blob([new Uint8Array(logedInEmp.image.data)])
                    )
              }
            />
            <Typography fontWeight={"bold"} mt={1}>
              {logedInEmp.name}
            </Typography>
            <Box display={"flex"} gap={0.5} mt={1} flexDirection={"row"}>
              <MailIcon />
              <Typography color="textSecondary" sx={{overflowWrap:"anywhere"}}>{logedInEmp.email}</Typography>
            </Box>
            <Box display="flex">
              <CallIcon />
              <Typography color="textSecondary">
                {logedInEmp.mobile_number}
              </Typography>
            </Box>
            <Box display="flex">
              <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
              <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
            </Box>
          </Box>
        </Menu>
      ) : (
        <></>
      )}
    </Box>
  );
}

const drawerWidth = 240;

export default function Display() {
  const id = useSelector((state) => state.employees.userId);
  let responsive=UseReponsive();
  // console.log(id)
  const { data: Emp } = useGetEmployeesByIdQuery(id);
  const logedInEmp = Emp || [];
  console.log(logedInEmp);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "whitesmoke" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // height: {sm:"9vh"},
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "primary",
        }}
      >
        <Stack direction={"row"} m={1.5} justifyContent={"space-between"}>
          <Stack>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1.5, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Stack
            direction={"row"}
            // spacing={0.1}
            height={"100%"}
            alignItems={"center"}
          >
            <Typography fontSize={"18px"} noWrap component="div">
              {logedInEmp.name}
            </Typography>

            <AccountMenu />
          </Stack>
        </Stack>
      </AppBar>
      <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {responsive.isMobile ?
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideDrawer handleDrawerClose={handleDrawerClose} />
        </Drawer>:
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideDrawer />
        </Drawer>}
      </Box>
      <Grid container direction={"row"}>
        <Toolbar />
        <Box bgcolor={"#f5f5f5"} sx={{ width: "100%", height: "89.5vh" }}>
          <CenterDisplay />
        </Box>
      </Grid>
    </Box>
  );
}
