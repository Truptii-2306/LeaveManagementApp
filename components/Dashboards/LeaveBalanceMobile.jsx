import { Card, Grid, Typography } from "@mui/material";
import {
  useGetAnnunalLeaveBalanceQuery,
  useGetRemainingBalanceQuery,
  useGetWorkFromHomeBalanceQuery,
} from "../../Store/slice/apiLeaveReqSlice";
import { useSelector } from "react-redux";

export function LeaveBalanceMobile() {
  const { data: annualBal } = useGetAnnunalLeaveBalanceQuery();
  // const annualBalance=annualBal.remainingHolidays ||[]
  const annualBalance = annualBal ? annualBal.remainingHolidays || [] : [];
//   console.log(annualBalance);
  const id = useSelector((state) => state.employees.userId);
//   console.log(id);
  const { data: wfh } = useGetWorkFromHomeBalanceQuery(id);
  const workFromHome = wfh ? wfh || [] : [];
//   console.log(workFromHome);

  const { data: leave } = useGetRemainingBalanceQuery(id);
  console.log(leave);
  const remainingLeaves = leave ? leave || [] : [];
  return (
    <Grid container width="100%" pt={2}>
      <Card sx={{ borderRadius: "20px", px: 1, py: 0.4, width: "100%" }}>
        <Grid
          display={"flex"}
          item
          xs={12}
          justifyContent="center"
          flexDirection={"row"}
          px={1}
          py={1.5}
        >
          <Grid
            item
            xs={4}
            sx={{ borderRight: "2px solid rgba(204, 204, 204, 0.5)", px: 1 }}
          >
            <Typography sx={{ height: 28, fontSize: "16px" }}>
              Remaining Leaves
            </Typography>
            <Typography sx={{ mt: 2.5, fontWeight: "bold" }}>
              {remainingLeaves.remainingBalance} /
              {remainingLeaves.default_balance}
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{ borderRight: "2px solid rgba(204, 204, 204, 0.5)" }}
          >
            <Typography sx={{ height: 28, fontSize: "16px" }}>
              Work From Home
            </Typography>
            <Typography sx={{ mt: 2.5, fontWeight: "bold" }}>{workFromHome.remainingBalance} / {workFromHome.defaultBalance}</Typography>
          </Grid>

          <Grid item xs={4} px={1}>
            <Typography sx={{ height: 28, fontSize: "16px" }}>
              Annual Leaves
            </Typography>
            <Typography sx={{ mt: 2.5, fontWeight: "bold" }}>{annualBalance.remainingHolidays} / {annualBalance.totalHolidays}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
