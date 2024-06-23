import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Divider,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetProjectsQuery } from "../../Store/slice/apiProjectSlice";
import { selectProject } from "../../Store/slice/ProjectsSlice";

const columns = [
  { id: "name", label: "Name", minWidth: 120 },
  {
    id: "manager",
    label: "Project Manager",
    minWidth: 90,
  },
  {
    id: "start_date",
    label: "Start Date",
    minWidth: 90,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
  },
];

export default function ProjectList({ onProjectAddOrEdit }) {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { data: project, isSuccess } = useGetProjectsQuery();
  const Projects = project || [];
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchText, setsearchText] = useState("");

  function handleSearchText(event) {
    setsearchText(event.target.value);
  }

  const formatDate = (timestampString) => {
    const date = new Date(timestampString);
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");

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
    const formattedDate = `${day} ${monthNames[date.getMonth()]} ${year}`;

    return formattedDate;
  };

  useEffect(() => {
    if (isSuccess) {
      setFilteredProjects(Projects);
    }
  }, [isSuccess, Projects]);
  useEffect(() => {
    setFilteredProjects(
      Projects.filter((employee) =>
        employee.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, Projects]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        minHeight: "100%",
        height: "100%",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} m={1}>
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
            placeholder="Search for Project..."
            onChange={handleSearchText}
          />
          <SearchIcon sx={{ my: "1.5%", mr: 1.5 }} />
        </Box>

        <Tooltip title="Add Project">
          <Button
            variant="contained"
            sx={{ borderRadius: "50px", textTransform: "none" }}
            onClick={() => {
              onProjectAddOrEdit("add");
              Navigate("/Employee/Projects/ProjectForm");
            }}
          >
            Project
            <AddIcon />
          </Button>
        </Tooltip>
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
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    ml={2}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(selectProject(row.id));
                      Navigate(`/Employee/Projects/${row.id}`);
                    }}
                  >
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.id === "status"
                            ? value.charAt(0).toUpperCase() + value.slice(1)
                            : column.id === "manager" && value
                            ? value.name
                            : column.id === "start_date"
                            ? formatDate(value)
                            : value}
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
        rowsPerPageOptions={[5, 10, 20, 100]}
        component="div"
        count={Projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// const [sortOrder, setSortOrder] = useState(""); // Track sort order
// const [sortedBy, setSortedBy] = useState("name"); // Track sorted column
// console.log(searchText);

// const sortedRows = useMemo(() => {
//   // Sort rows based on sortedBy and sortOrder
//   return Projects.slice().sort((a, b) => {
//     const valueA = a[sortedBy];
//     const valueB = b[sortedBy];

//     if (typeof valueA === "string") {
//       return sortOrder === "asc"
//         ? valueA.localeCompare(valueB)
//         : valueB.localeCompare(valueA);
//     } else {
//       return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
//     }
//   });
// }, [sortedBy, sortOrder]);

// if (isLoading) {
//   return (
//     <Grid>
//       <CircularProgress />
//     </Grid>
//   );
// }
// if (isError) {
//   return <></>;
// }

// const handleSortClick = (columnId) => {
//   const isAscending = sortedBy === columnId && sortOrder === "asc";
//   setSortedBy(columnId);
//   setSortOrder(isAscending ? "desc" : "asc");
// };

// const { data: Employees, isSuccess } = useGetEmployeesQuery();
// const [searchText, setSearchText] = useState("");
// const [sortedBy, setSortedBy] = useState("name");
// const [sortOrder, setSortOrder] = useState("asc");
// const Navigate = useNavigate();
// const employees=Employees || [];
// console.log(employees)
