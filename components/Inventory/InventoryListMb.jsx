import React from "react";
import {
  Card,
  Typography,
  Grid,
  Button,
  Divider,
  InputBase,
  Box,
  Paper,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useGetListOfInventoeyQuery } from "../../Store/slice/apiInventorySlice";

export default function InventoryListMb() {
  const {data:InventoryList,isLoading} = useGetListOfInventoeyQuery()
  const Navigate = useNavigate();
  const [searchText, setsearchText] = useState("");

  function handleSearchText(event) {
    setsearchText(event.target.value);
  }

  if(isLoading){
    return(<></>)
  }

  const FilterArray = InventoryList.filter((inventory) =>
    inventory.category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Paper sx={{ height: "100%", mt: "5%" }}>
      <Grid
        container
        sx={{
          width: "100%",
          top: "10%",
          zIndex: 1,
          bgcolor: "white",
          height: "5vh",
        }}
        position={"sticky"}
      >
        <Grid item xs={10}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
              border: "2px solid rgba(204, 204, 204, 0.5)",
              borderRadius: "10px",
              mr: "1",
            }}
          >
            <InputBase
              sx={{ width: "98%", px: 2 }}
              placeholder="Search for Category ..."
              onChange={handleSearchText}
            />
            <SearchIcon sx={{ my: "1%", mr: 1.5 }} />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              color: "black",
            }}
            onClick={() => {
              Navigate("/Employee/Inventory/AddInventory");
            }}
          >
            <AddIcon />
          </Button>
        </Grid>
        <Divider />
      </Grid>

      <Grid
        container
        sx={{
          overflowY: "auto",
          mx: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          height: "90vh",
          mt: "11px",
        }}
      >
        <Grid item xs={12}>
          <Grid
            sx={{
              height: "90vh",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              mt: "2%",
              bgcolor: "white",
            }}
          >
            {FilterArray.map((inventory,index) => (
              <Card
                sx={{ mb: 1, borderRadius: 2, mr: 1 }}
                elevation={3}
                key={index}
                fullWidth
              >
                {
                  <ListItem alignItems="flex-start" mx={1}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography
                          variant="body1"
                          sx={{
                            textTransform: "none",
                            color: "black",
                            fontWeight: "30",
                          }}
                        >
                          {inventory.category.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            textTransform: "none",
                            color: "black",
                            fontWeight: "30",
                            pr: 2,
                          }}
                        >
                          {inventory.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ textTransform: "none", color: "black" }}
                        >
                          {inventory.serial_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                }
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
