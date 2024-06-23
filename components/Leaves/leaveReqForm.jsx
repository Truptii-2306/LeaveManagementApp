import {
  InputBase,
  Typography,
  Stack,
  MenuItem,
  Button,
  Select,
  Card,
  CardContent,
  Grid,
  Alert
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import UseReponsive from "../../hooks/UseResponsive";
import CheckIcon from "@mui/icons-material/Check"
import { useApplyLeaveMutation } from "../../Store/slice/apiLeaveReqSlice";

function LeaveReqForm() {
  let Navigate = useNavigate();
  let [clickedId, setClickedId] = useState("");
  let responsive=UseReponsive();
  let [submitSuccess,setSubmitSuccess]=useState(false)
  let [applyLeave]=useApplyLeaveMutation()

  function handleClick(id) {
    setClickedId(id);
  }

  const yup = require("yup");

  const leaveReqObj = yup.object({
    start_date: yup
      .date()
      .required("Please select a date"),
    end_date: yup
      .date()
      .nullable()
      .min(yup.ref("start_date"), "Please Select a valid date"),
    leave_type: yup.string().required("Please Select a leave type"),
    reason: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      start_date: "",
      end_date: null,
      leave_type: "",
      reason: "",
    },
    validationSchema: leaveReqObj,
    onSubmit: (values) => {
      console.log(values)
      applyLeave(values)
      setSubmitSuccess(true);
      setTimeout(()=>{
      Navigate("/Employee");
      },1000)
    },
  });

  const Error = formik.errors;

  return (
    <Grid container justifyContent={"center"} width="100%" pt={responsive.isMobile ? 0 : 3}>
      <Stack sx={{textAlign: "left", width : (responsive.isDesktop || responsive.isLaptop || responsive.isTa) ? "70%" : "100%"}}>
      <Card
        elevation={1}
        pt="5%"
      >
        
        <CardContent component={"form"} onSubmit={formik.handleSubmit}>
        
          <Typography mb={2} variant="h5" color={"primary"}>
            Apply Leave
          </Typography>

          <Grid
            container
            direction={"row"}
            columnSpacing={1.5}
            // mb={1}
            justifyContent={"space-between"}
            pt="5px"
          >
            <Grid item xs={12} sm={6} height={responsive.isMobile ? "15vh" : "15vh"}>
              <Typography fontSize={"13px"}>FROM DATE</Typography>
              <InputBase
                onChange={formik.handleChange}
                value={formik.values.fromDate}
                type="date"
                name="start_date"
                lable="From Date"
                onClick={() => {
                  handleClick("from-date");
                }}
                onBlur={formik.handleBlur}
                sx={{
                  border:
                    clickedId === "from-date"
                      ? "2px solid blue"
                      : "2px solid rgba(204, 204, 204, 0.5)",
                  borderRadius: "4px",
                  p: "4px",
                  width: "100%",
                }}
              />
              {formik.touched.start_date && Error.start_date && (
                <Typography fontSize={"12px"} color="error">
                  {Error.start_date}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6} height={responsive.isMobile ? "15vh" : "15vh"}> 
              <Typography fontSize={"13px"}>TO DATE</Typography>
              <InputBase
                value={formik.values.toDate}
                onChange={formik.handleChange}
                type="date"
                name="end_date"
                lable="To Date"
                onClick={() => {
                  handleClick("to-date");
                }}
                onBlur={formik.handleBlur}
                sx={{
                  border:
                    clickedId === "to-date"
                      ? "2px solid blue"
                      : "2px solid rgba(204, 204, 204, 0.5)",
                  borderRadius: "4px",
                  p: "4px",
                  width: "100%",
                }}
              />

              {formik.touched.end_date && Error.end_date && (
                <Typography variant="caption" color="error">
                  {Error.end_date}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid container pb={2}>
            <Grid item xs={12} sm={6} height={responsive.isMobile ? "11vh" : "11vh"}>
              <Stack width="100%">
                <Typography fontSize={"13px"}>LEAVE TYPE</Typography>
                <Select
                  value={formik.values.leaveType}
                  name="leave_type"
                  size="small"
                  labelId="leave-type-label"
                  onClick={() => {
                    handleClick("leave-type");
                  }}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  sx={{
                    "& fieldset": {
                      borderColor: "rgba(204, 204, 204, 0.5)",
                      borderWidth: "2px",
                    },
                    "&:hover": {
                      "&& fieldset": {
                        border: "2px solid rgba(204, 204, 204, 0.5)"
                      }
                    },
                  }}
                >
                  <MenuItem value="first half">Half Day (First half)</MenuItem>
                  <MenuItem  value="second half">Half Day (Second half)</MenuItem>
                  <MenuItem value="full">Full Day</MenuItem>
                  <MenuItem value="work from home">Work From Home</MenuItem>
                </Select>

                {formik.touched.leave_type && Error.leave_type && (
                  <Typography variant="caption" color="error">
                    {Error.leave_type}
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>

          <Stack width="100%">
            <Typography fontSize={"13px"}>REASON</Typography>
            <InputBase
              value={formik.values.reason}
              name="reason"
              sx={{
                border:
                  clickedId === "reason"
                    ? "2px solid blue"
                    : "2px solid  rgba(204, 204, 204, 0.5)",
                borderRadius: "4px",
                px:1
              }}
              multiline
              rows={3}
              placeholder="Reason for leave"
              onClick={() => {
                handleClick("reason");
              }}
              onChange={formik.handleChange}
            />
          </Stack>

          <br />

          <Button type="submit" variant="contained" color="primary" sx={{textTransform:"none",}} >
            Apply Leave
          </Button>
  
        </CardContent>
        
      </Card>
      {submitSuccess && 
          (
          <Alert  icon={<CheckIcon fontSize="inherit" />} sx={{height:"50px",mt:"10px"}}  severity="success">
            You have applied for leave successfully.
          </Alert>
          )}
          </Stack>
    </Grid>
  );
}

export default LeaveReqForm;
