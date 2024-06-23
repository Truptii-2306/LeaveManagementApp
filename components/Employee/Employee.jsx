import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box, Button, Divider, InputBase, Tooltip, Typography } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Table,
  Stack,
} from "@mui/material";
import { useGetEmployeesQuery } from "../../Store/slice/apiEmployeeSlice";
import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useMemo, useEffect } from "react";
import {  useDispatch } from "react-redux";

const columns = [
  { id: "name", label: "Name", minWidth: 180 },
  { id: "email", label: "Email", minWidth: 170 },
  {
    id: "gender",
    label: "Gender",
    minWidth: 110,
  },
  {
    id: "manager",
    label: "Manager",
    minWidth: 120,
  },
  {
    id: "department",
    label: "Department",
    minWidth: 80,
    align: "left",
  },
];

export default function EmployeeList() {
  const [searchText, setsearchText] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortedBy, setSortedBy] = useState("name");
  const { data: Employees, isSuccess } = useGetEmployeesQuery();
  const [sortOrder, setSortOrder] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]); 
  const employees = Employees || [];

  console.log(employees)

  useEffect(() => {
    if (isSuccess) {
      setFilteredEmployees(employees);
    }
  }, [isSuccess, employees]);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, employees]);

  function handleSearchText(event) {
    setsearchText(event.target.value);
  }

  const sortedRows = useMemo(() => {
  return [...employees].sort((a, b) => {
    const valueA = a[sortedBy];
    const valueB = b[sortedBy];

    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
  });
}, [employees, sortedBy, sortOrder]);

  const handleSortClick = (columnId) => {
    const isAscending = sortedBy === columnId && sortOrder === "asc";
    setSortedBy(columnId);
    setSortOrder(isAscending ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const FilterArray = sortedRows.filter((Employee) =>
    Employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        minHeight: "100%",
        height: "100%",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} mt={1} mb={0.7}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "30%",
            border: "2px solid rgba(204, 204, 204, 0.5)",
            borderRadius: "20px",
          }}
        >
          <InputBase
            sx={{ width: "90%", pl: 2 }}
            placeholder="Search for Employee..."
            onChange={handleSearchText}
          />
          <SearchIcon sx={{ my: "1.5%", mr: 1.5 }} />
        </Box>
        
      </Box>
      <Divider />
      <TableContainer
        sx={{ height: "64.5vh", overflow: "auto", scrollbarWidth: "thin" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ color: "primary.main", minWidth: column.minWidth }}
                >
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography fontWeight={550} fontSize={"16px"}>
                      {column.label}
                    </Typography>
                    {column.label === "Name" ? (
                      <Tooltip title="Sort Employee">
                      <Button
                        disableRipple
                        size="small"
                        onClick={
                          column.id === "name"
                            ? () => handleSortClick(column.id)
                            : undefined
                        }
                      >
                        {sortOrder === "asc" ? (
                          <>
                            <ArrowUpwardIcon />
                          </>
                        ) : (
                          <>
                            <ArrowDownwardIcon />
                          </>
                        )}
                      </Button>
                      </Tooltip>
                    ) : null}
                  </Stack>
                </TableCell>
              ))}
              <TableCell
                sx={{ borderBottom: "1.5px solid rgba(204, 204, 204, 0.5)" }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {sortOrder
              ? FilterArray.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row}
                    ml={2}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      Navigate(`/Employee/${row.id}`);
                    }}
                  >
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.id === "manager" && value
                            ? value.name
                            : column.id === "department" && value
                            ? value.department_name
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              : filteredEmployees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      ml={2}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        Navigate(`/Employee/${row.id}`);
                      }}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.id === "manager" && value
                              ? value.name
                              : column.id === "department" && value
                              ? value.department_name
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 100]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}