import { Box, Typography, Grid, Card, Stack } from "@mui/material";
import { useGetLeavesByIdQuery } from "../../Store/slice/apiLeaveReqSlice";
import { useSelector } from "react-redux";

export default function HistoryMobile() {
  // const LeaveHistory = useSelector((state) => state.leaveHistory.LeaveHistory);
  const id=useSelector((state)=>state.employees.userId)
  const { data: LeaveHistory = []} = useGetLeavesByIdQuery(id);
  console.log(LeaveHistory)
  
  const formatDate = (dateString) => {
    
    const [day, month] = dateString.split("-");
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

    return `${day} ${monthNames[parseInt(month, 10) - 1]}`;
  };

  return (
    <Grid m={1} mt={2}>
      {LeaveHistory.map((history, index) => (
        <Card
          key={index}
          sx={{
            my: 0.5,
            py: 1.5,
            px: 2,
            borderRadius: "15px",
          }}
        >
          <Stack direction={"column"}>
            <Stack justifyContent={"space-between"} direction={"row"}>
              <Typography variant="body2" color="grey">
                {history.leave_type}
              </Typography>
              <Box
                width="60px"
                borderRadius={"6px"}
                py={0.1}
                px={0.1}
                color="white"
                bgcolor={
                  history.status === "Approved"|| history.status ==="approved"
                    ? "#CCFFCC"
                    : history.status === "Pending"|| history.status ==="pending"
                    ? "#FFD699"
                    : "#D3D3D3"
                }
                sx={{alignContent:"center"}}
              >
                <Typography
                  fontSize={"12px"}
                  color={
                    history.status === "Approved"||history.status ==="approved"
                      ? "#008800"
                      : history.status === "Pending"||history.status ==="pending"
                      ? "#7B3F00"
                      : "gray"
                  }
                >
                  {history.status.charAt(0).toUpperCase()+ history.status.slice(1)}
                </Typography>
              </Box>
            </Stack>
            <Stack direction={"column"} textAlign={"left"}>
              <Typography variant="body" sx={{ fontWeight: "bold" }}>
                {formatDate(history.start_date)}
                {history.end_date !== null
                  ? " - " 
                  + formatDate(history.end_date)
                  : ""}
              </Typography>
              <Typography variant="caption" color="grey">
                {history.reason}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
