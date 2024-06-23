import React from "react";
import {
  Card,
  Typography,
  Grid,
  InputBase,
  Box,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useMemo } from "react";
import { useGetEmployeesQuery } from "../../Store/slice/apiEmployeeSlice";
import { CircularProgress } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function EmployeeList({ onAddOrEdit }) {
  const Navigate = useNavigate();
  const [searchText, setsearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const { data: employees, isLoading } = useGetEmployeesQuery();

  let FilterArray = employees;

  // useEffect(() => {
  //   if (isSuccess) {
  //     setFilterArray(employees);
  //   }
  // }, [isSuccess, employees]);

  function handleSearchText(event) {
    setsearchText(event.target.value);
  }

  const Employees = employees || [];

  const sortedRows = useMemo(() => {
    return [...Employees].sort((a, b) => {
      const valueA = a.name;
      const valueB = b.name;

      if (typeof valueA === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });
  }, [Employees, sortOrder]);
  
  if (sortOrder) {
    FilterArray = sortedRows;
  }
  if (searchText) {
    FilterArray = FilterArray.filter((employee) =>
      employee.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const handleSortClick = () => {
    const isAscending = sortOrder === "asc";
    setSortOrder(isAscending ? "desc" : "asc");
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ height: "100%", pt: "5%" }}>
      <Grid
        container
        sx={{
          width: "100%",
          top: "8%",
          zIndex: 1,
          height: "7vh",
          mx: 0.5,
        }}
        position={"sticky"}
      >
        <Grid item xs={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
              border: "2px solid rgba(204, 204, 204, 0.5)",
              borderRadius: "10px",
              pr: 1,
            }}
          >
            <InputBase
              sx={{ width: "98%", pl: 2 }}
              placeholder="Search for Employee..."
              onChange={handleSearchText}
            />
            <SearchIcon sx={{ my: 0.5 }} />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Tooltip title="Sort Employee">
            <IconButton
              disableRipple
              size="small"
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid whitesmoke",
              }}
              onClick={() => handleSortClick()}
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
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Employee">
            <IconButton
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid whitesmoke",
              }}
              onClick={() => {
                onAddOrEdit("add");
                Navigate("/Employee/Employees/EmployeeDetailsForm");
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          overflowY: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          height: "90%",
        }}
      >
        <Grid item xs={12}>
          <Grid
            sx={{
              height: "90%",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              bgcolor: "white",
              minHeight: "100%",
            }}
          >
            {FilterArray.map((emp, index) => (
              <Card
                sx={{
                  borderRadius: 2,
                  bgcolor: "white",
                  mt: 0.7,
                  mx: 0.7,
                }}
                elevation={3}
                key={index}
                onClick={() => {
                  Navigate(`/Employee/${emp.id}`);
                }}
              >
                <ListItem alignItems="flex-start">
                  <Grid container>
                    <Grid item>
                      <Avatar
                        sx={{ mr: 2, mt: 0.5 }}
                        src={
                          emp.image === null
                            ? ""
                            : URL.createObjectURL(
                                new Blob([new Uint8Array(emp.image.data)])
                              )
                        }
                        alt={emp.name}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        sx={{
                          textTransform: "none",
                          color: "black",
                          fontWeight: "30",
                        }}
                      >
                        {emp.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ textTransform: "none", color: "black" }}
                      >
                        {emp.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
