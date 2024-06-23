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
  CircularProgress,
  TablePagination,
  TableRow,
  Table,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetListOfInventoeyQuery,
  useDeleteInventoryMutation,
} from "../../Store/slice/apiInventorySlice";
import DeleteDialouge from "../Main/DeleteDialouge";

const columns = [
  { id: "name", label: "Name", minWidth: 180 },
  { id: "category", label: "Category", minWidth: 170 },
  {
    id: "serial_number",
    label: "Serial No",
    minWidth: 110,
  },
];

export default function InventoryList({
  openDeleteDialouge,
  onOpenDeleteDialogue,
  onCloseDeleteDialogue,
}) {
  const {
    data: inventoryListItems,
    isLoading,
    isError,
  } = useGetListOfInventoeyQuery();
  const InventoryListItems = inventoryListItems;

  const [deleteInventory] = useDeleteInventoryMutation();

  const Navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setsearchText] = useState("");
  const [inventoryId,setinventoryId]=useState();

  function handelDelete() {
    deleteInventory(inventoryId);
  }

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleSearchText(event) {
    setsearchText(event.target.value);
  }

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <></>;
  }
  const FilterArray = InventoryListItems.filter((inventory) =>
    inventory.category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", pb: 1, minHeight: "100%" }}>
      <Box display={"flex"} justifyContent={"space-between"} m={1} mx={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "30%",
            border: "2px solid rgba(204, 204, 204, 0.5)",
            borderRadius: "20px",
            mr: "1",
          }}
        >
          <InputBase
            sx={{ width: "90%", pl: 2 }}
            placeholder="Search for Category ..."
            onChange={handleSearchText}
          />
          <SearchIcon sx={{ my: "1.5%", mr: 1.5 }} />
        </Box>

        <Tooltip title="Add Inventory">
        <Button
          variant="contained"
          sx={{ borderRadius: "50px", textTransform: "none" }}
          onClick={() => {
            Navigate("/Employee/Inventory/AddInventory");
          }}
        >
          Inventory
          <AddIcon />
        </Button>
        </Tooltip>
      </Box>
      <Divider />
      <TableContainer
        sx={{ height: "69vh", overflow: "auto", scrollbarWidth: "thin" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  sx={{ color: "primary.main", minWidth: column.minWidth }}
                >
                  <Typography fontWeight={550} fontSize={"16px"}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
              <TableCell
                sx={{ borderBottom: "1.5px solid rgba(204, 204, 204, 0.5)" }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {FilterArray.map((inventory, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((column) => {
                    const value = inventory[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "category" ? value.name : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Stack direction="row">
                      <Tooltip title="Delete Inventory">
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          onOpenDeleteDialogue();
                          setinventoryId(inventory.id)
                        }}
                      />
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 100]}
        component="div"
        count={InventoryListItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteDialouge
        openDeleteDialouge={openDeleteDialouge}
        onCloseDeleteDialogue={onCloseDeleteDialogue}
        handelDelete={handelDelete}
      />
    </Paper>
  );
}
