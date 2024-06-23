import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { Box, Tooltip } from "@mui/material";
import { useGetLeavesByIdQuery } from "../../Store/slice/apiLeaveReqSlice";

const columns = [
  { id: "start_date", label: "Start Date", minWidth: 90, ml: "500px" },
  { id: "end_date", label: "End Date", minWidth: 80 },
  {
    id: "leave_type",
    label: "Leave Type",
    minWidth: 80,
  },
  {
    id: "reason",
    label: "Reason",
    minWidth: 80,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
  },
];

export default function History() {
  const id=useSelector((state)=>state.employees.userId)
  
  const { data: LeaveHistory = []} = useGetLeavesByIdQuery(id);
  console.log(LeaveHistory)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", pt: 1 }}>
      <TableContainer sx={{ height: "80vh", scrollbarWidth: "thin" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    color: "primary.main",
                    fontWeight: 550,
                    fontSize: "16px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {LeaveHistory.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value =
                      column.id === "start_date" || column.id === "end_date"
                        ? row[column.id] !== null
                          ? formatDate(row[column.id])
                          : "-"
                        :row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          color:
                            column.id === "status" && (value === "Pending"||value ==="pending")
                              ? "#7B3F00"
                              : column.id === "status" && (value === "Approved"||value ==="approved")
                              ? "#008800"
                              : column.id === "status" && (value === "Rejected"||value ==="rejected")
                              ? "gray"
                              : "black",
                        }}
                      >
                        {column.id === "status" ? (
                          <Box
                            sx={{
                              bgcolor:
                                column.id === "status" && (value === "Pending"||value ==="pending")
                                  ? "#FFD699"
                                  : column.id === "status" &&
                                  (value === "Approved"||value ==="approved")
                                  ? "#CCFFCC"
                                  : column.id === "status" &&
                                  (value === "Rejected"||value ==="rejected")
                                  ? "#D3D3D3"
                                  : "",
                              width: column.id === "status" && "70px",
                              borderRadius: column.id === "status" && "6px",
                              py: column.id === "status" && "1px",
                              px: column.id === "status" && "1px",
                              textAlign: column.id === "status" && "center",
                              fontSize:"12px"
                            }}
                          >
                            {value.charAt(0).toUpperCase()+ value.slice(1)}
                          </Box>
                        ) : column.id==="reason"? (
                          <Tooltip title={value} arrow>
                          <Box>
                          {value!=null ? (value.length>40 ? value.slice(0,40)+ '...' : value): ""}
                          </Box>
                          </Tooltip>
                        ):
                        (
                          <Box>
                            {value}
                          </Box>
                        )
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={LeaveHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// import { Box, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { List } from "@mui/material";
// import ListItem from "@mui/material/ListItem";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import AddIcon from "@mui/icons-material/Add"

// export default function EmployeeList() {
//   let Navigate = useNavigate();

//   const employeeList = [
//     { Name: "Pruthviraj Suryawanshi", Role: "Employee", Gender: "Male" },
//     { Name: "Pratiksha Nimbalkar", Role: "Employee", Gender: "Female" },
//     { Name: "Trupti Jadhav", Role: "Employee", Gender: "Female" },
//     { Name: "Ketan Rathod", Role: "      Manager", Gender: "Male" },
//     { Name: "Pratik Deshmukh", Role: "Admin", Gender: "Male" },
//     { Name: "Nupur Tyagi", Role: "Employee", Gender: "Female" },
//     { Name: "Mehvish Shaikh", Role: "Employee", Gender: "Female" },
//     { Name: "Abhinandan Ambekar", Role: "Employee", Gender: "Male" },
//   ];
//   return (
//     <Box
//       sx={{
//         justifyContent: "center",
//         alignItems: "center",
//         px: "10%",
//         pt: "14vh",
//         width: "100%",
//         textAlign: "center",
//       }}
//     >
//       <List sx={{ overflow: "auto", width: "100%" }}>
//         <ListItem sx={{ pt: "20px", backgroundColor: "#fafafa" }}>
//           <Typography color="primary.main" width="40%" fontWeight={350} pl={2}>
//             NAME
//           </Typography>
//           <Typography
//             color="primary.main"
//             width="30%"
//             fontWeight={350}
//             pl={0.9}
//           >
//             GENDER
//           </Typography>
//           <Typography
//             color="primary.main"
//             width="30%"
//             fontWeight={350}
//             pl={1.7}
//           >
//             ROLE
//           </Typography>
//         </ListItem>
//         <Divider />
//         {employeeList.map((employee, index) => (
//           <ListItem key={index} sx={{ backgroundColor: "#fafafa", py: "12px" }}>
//             <Typography width="40%" pl={1} textAlign={"left"}>
//               {employee.Name}
//             </Typography>
//             <Typography width="30%" pl={1} textAlign={"left"}>
//               {employee.Gender}
//             </Typography>
//             <Typography width="30%" pl={1} textAlign={"left"}>
//               {employee.Role}
//             </Typography>
//           </ListItem>
//         ))}
//       </List>
//       <Button
//         variant="contained"
//         onClick={() => {
//           Navigate("/Employee/Employees/NewRegistration");
//         }}
//       >
//         Employee
//         <AddIcon/>
//       </Button>
//     </Box>
//   );
// }
