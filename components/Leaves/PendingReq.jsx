import {
  Card,
  Divider,
  Paper,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableContainer,
  Stack,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  useGetPendingRequestByIdQuery,
  useGetPendingRequestQuery,
} from "../../Store/slice/apiLeaveReqSlice";
import { useUpdateLeaveStatusMutation } from "../../Store/slice/apiLeaveReqSlice";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function PendingReq() {
  let [pendingRequest, setPendingRequest] = useState([]);
  let [pendingRequestById, setPendingRequestById] = useState([]);

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

  console.log(PendingRequestList)

  const [updateStatus] = useUpdateLeaveStatusMutation();

  const handleAccept = (id) => {
    updateStatus({ id: id, status: "approved" });
    console.log("hot nahiye approve",id)
  };

  const handleReject = (id) => {
    updateStatus({ id: id, status: "rejected" });
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  if(isLoadingById){
    return(<></>)
  }

  if(isLoading){
    return(<></>)
  }

  console.log("hjgjhghj",pendingRequest)

  return (
    <Card sx={{ height: "100%", overflow: "auto" }}>
      <Divider />
      <TableContainer
        component={Paper}
        sx={{ height: "99%", scrollbarWidth: "thin" }}
      >
        <Table sx={{ minWidth: 700 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold",color: "primary.main" ,fontSize:"16px"}}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" ,color: "primary.main",fontSize:"16px"}}>
                From date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" ,color: "primary.main",fontSize:"16px"}}>
                To date
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold",color: "primary.main",fontSize:"16px" }}>
                Leave Type
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" ,color: "primary.main",fontSize:"16px",overflow:"elipses"}}>
                Reason
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" ,color: "primary.main",fontSize:"16px"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PendingRequestList.length!==0 && PendingRequestList.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  { row.employeeName}
                </TableCell>
                <TableCell align="center">
                  {formatDate(row.start_date)}
                </TableCell>
                <TableCell align="center">
                  { row.end_date !== null ? formatDate(row.end_date) : "-"}
                </TableCell>
                <TableCell align="left">{row.leave_type}</TableCell>
                <Tooltip title={row.reason} arrow>
                <TableCell align="left" minWidth={"600px"}>{row.reason.length >30 ? row.reason.slice(0, 30) + '...': row.reason}</TableCell>
                </Tooltip>
                <TableCell align="right">
                  {(row.manager_id===id || row.manager_id===null) && <Stack direction={"row"}>
                    <Button
                      disableRipple
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleAccept(row.id)}
                      sx={{
                        marginRight: 1,
                        textTransform: "none",
                        height: "25px",
                        width: "52px",
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      disableRipple
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleReject(row.id)}
                      sx={{
                        textTransform: "none",
                        height: "25px",
                        width: "52px",
                      }}
                    >
                      Reject
                    </Button>
                  </Stack>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
