import {
  Grid,
  Card,
  Button,
  ListItem,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import {useSelector} from 'react-redux'
import { useGetPendingRequestQuery,useGetPendingRequestByIdQuery } from "../../Store/slice/apiLeaveReqSlice";
import { useUpdateLeaveStatusMutation } from "../../Store/slice/apiLeaveReqSlice";
import { useState,useEffect } from "react";

export default function PendingReqMobile() {
  let [pendingRequest, setPendingRequest] = useState([]);
  let [pendingRequestById, setPendingRequestById] = useState([]);

  console.log("pend",pendingRequest,pendingRequestById)

  const { data: PendingRequest, isSuccess,isLoading} = useGetPendingRequestQuery();

  const id = useSelector((state) => state.employees.userId);
  const role = useSelector((state) => state.employees.userRole);

  const { data: PendingRequestById, isSuccess: isSuccessById,isLoading:isLoadingById } = useGetPendingRequestByIdQuery(id);

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


  const [updateStatus] = useUpdateLeaveStatusMutation();

  const handleAccept = (id) => {
    updateStatus({ id: id, status: "approved" });
  };

  const handleReject = (id) => {
    updateStatus({ id: id, status: "rejected" });
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  if(isLoading){
    return(<></>)
  }
  if(isLoadingById){
    return(<></>)
  }
  return (
      <Grid
        item
        sx={{
          width: "100%",
          pt:1.5
        }}
      >
        {PendingRequestList.map((request, index) => (
          <Card
            sx={{ my: 0.2, borderRadius: 2, width: "100%" }}
            elevation={3}
            key={index}
          >
            {/* <Button onClick={() => handleClick(request.name)} fullWidth> */}
            <ListItem alignItems="flex-start">
              <Grid container>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{
                      textTransform: "none",
                      color: "black",
                      fontWeight: "530",
                    }}
                  >
                    {request.employeeName}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    {formatDate(request.start_date)} 
                    {request.end_date !== null
                      ? " to "+formatDate(request.end_date)
                      : ""}
                  </Typography>
                  <Box style={{ minHeight: "24px" }}>
                    <Typography variant="caption">{request.reason}</Typography>
                  </Box>
                  {(request.manager_id===id || request.manager_id===null) && <Stack direction={"row"} >
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ marginRight: 1, textTransform: "none", height: "25px",
                      width: "52px", }}
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ textTransform: "none" , height: "25px",
                      width: "52px",}}
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </Button>
                  </Stack>}
                </Grid>
              </Grid>
            </ListItem>
            {/* </Button> */}
          </Card>
        ))}
      </Grid>
  );
}
