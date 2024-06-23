import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import UseReponsive from "../../hooks/UseResponsive";
import { useGetEmployeesByIdQuery } from "../../Store/slice/apiEmployeeSlice";
import { useSelector } from "react-redux";

export default function ApproverCard() {
  let responsive=UseReponsive()
  let id=useSelector((state)=>state.employees.userId)
  let {data:Employee,isLoading}=useGetEmployeesByIdQuery(id)
  console.log("Employee",Employee)

  if(isLoading){
    return(
      <></>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography fontWeight="bold" fontSize="16px">
          Approver
        </Typography>
      </CardContent>
      <Divider />
      {Employee.manager ?
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          my={responsive.isMobile ? 2 :0.8}
        >
          <Avatar
           src={Employee?.manager?.image && URL.createObjectURL(
            new Blob([new Uint8Array(Employee?.manager?.image?.data)])
          )}
            style={{ width:responsive.isMobile ? "50px" :"70px", height:responsive.isMobile ? "50px" : "70px", border: "2px solid blue" }}
          />
          <Box px={6} display={"flex"} flexDirection={"column"}>
            <Typography fontSize={responsive.isDesktop ? "19px" : "16px"}>{ Employee?.manager?.name}</Typography>
            <Typography variant={responsive.isDesktop ? "subtitle1" : "subtitle2"}> Reporting Manager</Typography>
          </Box>
        </Box>

        <Grid
          container
          display="flex"
          width={"100%"}
          justifyContent="space-between"
          textAlign="center"
          py={0.5}
          px={responsive.isMobile ? "5%" : "10%"}
        >
          <Grid item display="flex" px={0.5}>
            <MailIcon />
            <Typography variant={responsive.isMobile ? "subtitle2" : "15px"}>{ Employee?.manager?.email}</Typography>
          </Grid>
          <Grid item display="flex">
            <CallIcon />
            <Typography variant={responsive.isMobile ? "subtitle2" : "15px"}>{ Employee?.manager?.mobile_number}</Typography>
          </Grid>
        </Grid>
      </CardContent>:
      <CardContent>
      <Typography sx={{color:"gray",my:4.2}}>
        Manager is not assigned yet .
      </Typography>
      </CardContent>}
    </Card>
  );
}
