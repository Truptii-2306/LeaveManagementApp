import {
  Button,
  CardContent,
  Grid,
  InputBase,
  Stack,
  Typography,
  MenuItem,
  Select,
  Alert,
  Box,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseReponsive from "../../hooks/UseResponsive";
import CheckIcon from "@mui/icons-material/Check";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useAddDeaprtmentMutation,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../Store/slice/apiEmployeeSlice";
import { useGetDepartmentsQuery } from "../../Store/slice/apiDepartmentSlice";
import { useGetInventoryQuery } from "../../Store/slice/apiInventorySlice";
import { useParams } from "react-router-dom";

export default function EmloyeeDetailForm() {
  const [newDepartment, setNewDepartment] = useState("");
  const [showAddDepartmentField, setShowAddDepartmentField] = useState(false);
  const responsive = UseReponsive();
  const [clickedBtnID, setClickedBtnID] = useState("");
  let [onBoardSuccess, setOnBoardSuccess] = useState(false);
  const [Department, setDepartment] = useState([]);
  const [updateEmployee] = useUpdateEmployeeMutation();
  const { data: department, isSuccess,refetch: refetchDepartmentList  } = useGetDepartmentsQuery();
  const dept = department || [];
  const [addDepartment]=useAddDeaprtmentMutation()
  const { id } = useParams();
  let selectedEmp = parseInt(id);
  const { data: employees,isLoading } = useGetEmployeesQuery();
  const { data: inventory } = useGetInventoryQuery();

  const Employees = employees || [];
  const InventoryList = inventory || [];

  let selectedEmpIndex = Employees.findIndex((emp) => emp.id === selectedEmp);
  console.log(selectedEmpIndex,"selected")

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const initialValues = {
    name: selectedEmp ? (Employees ? Employees[selectedEmpIndex]?.name : "") : "",
    email: selectedEmp ? (Employees ? Employees[selectedEmpIndex]?.email : "") : "",
    mobile_number: selectedEmp ? (Employees ? Employees[selectedEmpIndex]?.mobile_number : "") : "",
    dob: selectedEmp ? (Employees ? formatDate(Employees[selectedEmpIndex]?.dob ): "") : "",
    department_id: selectedEmp ? (Employees ? Employees[selectedEmpIndex]?.department_id : "") : "",
    gender: selectedEmp ? (Employees ? Employees[selectedEmpIndex]?.gender : "") : "",
    manager_id: selectedEmp ? (Employees ? Employees[selectedEmpIndex]?.manager_id : null) : null,
    admin: selectedEmp ? (Employees ? Employees[selectedEmpIndex]?.role ? (Employees[selectedEmpIndex]?.role=="Admin"?1 :0) : null:null):null,
    inventory_id:""
  };

  useEffect(() => {
    if (isSuccess) {
      setDepartment(dept);
    }
  }, [isSuccess, dept]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string(),

      email: Yup.string()
        .trim()
        .matches(emailRegex, "Invalid email format"),

      mobile_number: Yup.number()
        .test(
          "len",
          "contact no should contain only 10 characters.",
          (value) => {
            if (value === undefined || value === null) {
              return true;
            }
            return String(value).length === 10;
          }
        ),

      dob: Yup.date()
        .min("1950-01-01", "Birthdate should be after 1950-01-01")
        .max(
          eighteenYearsAgo,
          `Birthdate should be before ${eighteenYearsAgo.getDate()}-${eighteenYearsAgo.getMonth()}-${eighteenYearsAgo.getFullYear()}`
        ),

      department_id: Yup.number(),
      manager_id: Yup.string().nullable(),
      gender: Yup.string(),
    }),

    onSubmit: async (values) => {
      {
        updateEmployee({ id: selectedEmp, updatedEmployeeDetails: values });
      }
      setOnBoardSuccess(true);
      setTimeout(() => {
        navigate("/Employee/Employees");
      }, 1000);
    },
  });

  const handleChangeDepartment = (e) => {
    setNewDepartment(e.target.value);
  };

  const addNewDepartment = async () => {
    if (newDepartment) {
      try {
        const departmentData = { department_name: newDepartment };
        await addDepartment(departmentData);
        setShowAddDepartmentField(false);
        await refetchDepartmentList();
      } catch (refetchDepartmentListerror) {

      }
    }
  };

  const errors = formik.errors;
  function handleClick(id) {
    setClickedBtnID(id);
  }
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 130,
        width: 250,
        scrollbarWidth: "thin",
      },
    },
  };

  const navigate = useNavigate();

  if(isLoading){
    return(
      <></>
    )
  }

  return (
    <Grid
      container
      justifyContent={"center"}
      width="100%"
      pt={responsive.isMobile ? 0 : 3}
    >
      <Stack
        sx={{
          textAlign: "left",
          width:
            responsive.isDesktop || responsive.isLaptop || responsive.isTablet
              ? "70%"
              : "100%",
        }}
      >
        <Card elevation={1}>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Typography color={"primary"} variant="h5" mb={2}>
                Edit Employee Details
              </Typography>

              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  height={responsive.isMobile ? "13vh" : "9vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2">NAME</Typography>
                    <InputBase
                      placeholder=" Name"
                      type="text"
                      name="name"
                      sx={{
                        border:
                          clickedBtnID === "Name"
                            ? "2px solid blue"
                            : "2px solid  rgba(204, 204, 204, 0.5)",
                        height: "40px",
                        borderRadius: 1,
                      }}
                      onClick={() => handleClick("Name")}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.touched.name && errors.name && (
                      <Typography variant="caption" color="error">
                        {errors.name}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  height={responsive.isMobile ? "10vh" : "9vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2"> GENDER </Typography>
                    <Select
                      size="small"
                      name="gender"
                      sx={{
                        "& fieldset": {
                          borderColor: "rgba(204, 204, 204, 0.5)",
                          borderWidth: "2px",
                        },
                        "&:hover": {
                          "&& fieldset": {
                            border: "2px solid rgba(204, 204, 204, 0.5)",
                          },
                        },
                        height: "40px",
                        borderRadius: 1,
                      }}
                      onClick={() => handleClick("Gender")}
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {formik.touched.gender && errors.gender && (
                      <Typography variant="caption" color="error">
                        {errors.gender}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  height={responsive.isMobile ? "13vh" : "6vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2"> EMAIL </Typography>
                    <InputBase
                      type="text"
                      name="email"
                      placeholder=" example@gmail.com"
                      sx={{
                        border:
                          clickedBtnID === "Email"
                            ? "2px solid blue"
                            : "2px solid  rgba(204, 204, 204, 0.5)",
                        height: "40px",
                        borderRadius: 1,
                      }}
                      onClick={() => handleClick("Email")}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && errors.email && (
                      <Typography variant="caption" color="error">
                        {errors.email}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  height={responsive.isMobile ? "6vh" : "6vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2">CONTACT NO</Typography>
                    <InputBase
                      type="tel"
                      pattern="[0-9]*"
                      maxLength={10}
                      name="mobile_number"
                      placeholder=" Phone Number"
                      sx={{
                        border:
                          clickedBtnID === "mobile_number"
                            ? "2px solid blue"
                            : "2px solid  rgba(204, 204, 204, 0.5)",
                        height: "40px",
                        borderRadius: 1,
                      }}
                      onClick={() => handleClick("mobile_number")}
                      onChange={formik.handleChange}
                      value={formik.values.mobile_number}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobile_number && errors.mobile_number && (
                      <Typography variant="caption" color="error">
                        {errors.mobile_number}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <br />

              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  height={responsive.isMobile ? "13vh" : "9vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2"> ADMIN</Typography>
                    <Select
                      size="small"
                      name="admin"
                      sx={{
                        "& fieldset": {
                          borderColor: "rgba(204, 204, 204, 0.5)",
                          borderWidth: "2px",
                        },
                        "&:hover": {
                          "&& fieldset": {
                            border:
                              clickedBtnID === "admin"
                                ? "2px solid blue"
                                : "2px solid  rgba(204, 204, 204, 0.5)",
                          },
                        },
                        height: "40px",
                        borderRadius: 1,
                      }}
                      onClick={() => handleClick("admin")}
                      onChange={formik.handleChange}
                      value={formik.values.admin}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                    </Select>

                    {formik.touched.admin && errors.admin && (
                      <Typography variant="caption" color="error">
                        {errors.admin}
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  height={responsive.isMobile ? "1vh" : "9vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2">REPORTING MANAGER</Typography>

                    <Select
                      size="small"
                      name="manager_id"
                      sx={{
                        "& fieldset": {
                          borderColor: "rgba(204, 204, 204, 0.5)",
                          borderWidth: "2px",
                        },
                        "&:hover": {
                          "&& fieldset": {
                            border:
                              clickedBtnID === "manager_id"
                                ? "2px solid blue"
                                : "2px solid  rgba(204, 204, 204, 0.5)",
                          },
                        },
                        height: "40px",
                        borderRadius: 1,
                      }}
                      MenuProps={MenuProps}
                      onChange={formik.handleChange}
                      value={formik.values.manager_id}
                    >
                      {Employees.map((emp, index) => (
                        <MenuItem key={index} value={emp.id}>
                          {emp.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.manager_id && errors.manager_id && (
                      <Typography variant="caption" color="error">
                        {errors.manager_id}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Grid container mt={responsive.isMobile ? 5 : 0} spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  height={responsive.isMobile ? "9vh" : "9vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2"> DATE OF BIRTH </Typography>
                    <InputBase
                      type="date"
                      name="dob"
                      sx={{
                        border:
                          clickedBtnID === "DateOfBirth"
                            ? "2px solid blue"
                            : "2px solid  rgba(204, 204, 204, 0.5)",
                        height: "40px",
                        borderRadius: 1,
                        p: 1,
                      }}
                      onClick={() => handleClick("DateOfBirth")}
                      onChange={formik.handleChange}
                      value={formik.values.dob}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.dob && errors.dob && (
                      <Typography variant="caption" color="error">
                        {errors.dob}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  height={responsive.isMobile ? "5vh" : "9vh"}
                  mt={responsive.isMobile && 3}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2">ASSIGN INVENTORY</Typography>

                    <Select
                      value={formik.values.inventory_id}
                      onChange={formik.handleChange}
                      name="inventory_id"
                      size="small"
                      labelId="inventory_id"
                      sx={{
                        "& fieldset": {
                          borderColor: "rgba(204, 204, 204, 0.5)",
                          borderWidth: "2px",
                        },
                        "&:hover": {
                          "&& fieldset": {
                            border: "2px solid rgba(204, 204, 204, 0.5)",
                          },
                        },
                        height: "40px",
                        borderRadius: 1,
                      }}
                      MenuProps={MenuProps}
                    >
                      {InventoryList.map((inventory) => (
                        <MenuItem key={inventory.id} value={inventory.id}>
                          {inventory.name} - {inventory.category.name} -{" "}
                          {inventory.serial_number}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container mt={responsive.isMobile ? 5 : 2} spacing={1}>
                <Grid
                  item
                  xs={10}
                  sm={5}
                  
                  height={responsive.isMobile ? "13vh" : "9vh"}
                >
                  <Stack width={"100%"}>
                    <Typography variant="body2"> DEPARTMENT</Typography>
                    <Select
                      size="small"
                      name="department_id"
                      sx={{
                        "& fieldset": {
                          borderColor: "rgba(204, 204, 204, 0.5)",
                          borderWidth: "2px",
                        },
                        "&:hover": {
                          "&& fieldset": {
                            border:
                              clickedBtnID === "department_id"
                                ? "2px solid blue"
                                : "2px solid  rgba(204, 204, 204, 0.5)",
                          },
                        },
                        height: "40px",
                        borderRadius: 1,
                      }}
                      onClick={() => setShowAddDepartmentField(false)}
                      onChange={formik.handleChange}
                      value={formik.values.department_id}
                      onBlur={formik.handleBlur}
                    >
                      {Department.map((department, index) => (
                        <MenuItem key={index} value={department.id}>
                          {department.department_name}
                        </MenuItem>
                      ))}
                    </Select>

                    {formik.touched.department_id && errors.department_id && (
                      <Typography variant="caption" color="error">
                        {errors.department_id}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                
                <Grid item xs={2} sm={1} sx={{ mt: 2.5 }}>
                  {!showAddDepartmentField && (
                    <IconButton
                      disableRipple
                      size="small"
                      onClick={() => setShowAddDepartmentField(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Grid>
                {showAddDepartmentField && (
                  <>
                    <Grid
                      item
                      xs={10}
                      sm={5}
                      mt={0.2}
                      height={responsive.isMobile ? "14vh" : "9vh"}
                    >
                      <Stack width="100%">
                        <Typography variant="body2">ADD DEPARTMENT</Typography>
                        <InputBase
                          name="newDepartment"
                          onChange={handleChangeDepartment}
                          placeholder="Add New Department"
                          type="text"
                          sx={{
                            border: "2px solid rgba(204, 204, 204, 0.5)",
                            height: "40px",
                            borderRadius: 1,
                            px: 1,
                          }}
                        ></InputBase>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} sm={1} mt={2.3}>
                      <IconButton onClick={addNewDepartment}>
                        <CheckIcon
                          sx={{
                            color: "black",
                            border: "2px solid rgba(204, 204, 204, 0.5)",
                            borderRadius: 5,
                            bgcolor: "lightblue",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </>
                )}
              </Grid>

              <Box pt={responsive.isMobile ? 3 : 0}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none", mt: 2, ml: 1 }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        {onBoardSuccess && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            sx={{ height: "50px", mt: "10px" }}
            severity="success"
          >
            Employee Edited successfully.
          </Alert>
        )}
      </Stack>
    </Grid>
  );
}