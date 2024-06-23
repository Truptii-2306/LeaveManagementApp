import React, { useState } from "react";
import { Grid, Typography, Paper, Box, IconButton,Tooltip } from "@mui/material";
import UseReponsive from "../../hooks/UseResponsive";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeleteHolidayMutation, useGetHolidaysQuery } from "../../Store/slice/apiHolidaySlice";

export default function Holidays() {
  const navigate = useNavigate();
  const role = useSelector((state) => state.employees.userRole);
  const [hoverIndex, setHoverIndex] = useState(null); 

  function handleAddClick() {
    navigate("/Employee/Holidays/AddHoliday");
  }

  const { data: holiday } = useGetHolidaysQuery();
  const annualLeaves = holiday;
  const [deleteHoliday]=useDeleteHolidayMutation()

  const suttya = annualLeaves ? annualLeaves || [] : [];
  console.log(suttya.holidays)

  let responsive = UseReponsive();

  const formatDate = (timestampString) => {
    const date = new Date(timestampString);
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${day} ${monthNames[date.getMonth()]} ${year}`;

    return formattedDate;
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <Grid container spacing={2} pt={2} px={2}>
      {suttya.holidays && suttya.holidays.map((holiday, index) => (
        <Grid
          item
          key={index}
          xs={6}
          sm={6}
          md={4}
          lg={3}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <Paper elevation={2} sx={{ position: "relative", p: "10px" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                height: responsive.isMobile ? "50px" : "25px",
              }}
            >
              {holiday.occasion}
            </Typography>
            <img
              style={{ borderRadius: "50%" }}
              alt={holiday.occasion}
              src={URL.createObjectURL(
                new Blob([new Uint8Array(holiday.image.data)])
              )}
              width={"50px"}
              height={"50px"}
            />
            <Typography>{formatDate(holiday.date)}</Typography>
            <Typography sx={{ mb: 1 }}>{holiday.day}</Typography>
            {hoverIndex === index && (
              role === "Admin" &&
              <Tooltip title="Delete Holiday">
              <IconButton
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => {
                  // handledeleteHolidayClick(holiday.id);
                  deleteHoliday(holiday.id)
                }}
              >
                <DeleteIcon />
              </IconButton>
              </Tooltip>
            )}
          </Paper>
        </Grid>
      ))}
      {role === "Admin"  && (
      <Box width={"100%"} display={"flex"} justifyContent={"right"}>
        <Tooltip title="Add Holiday">
        <IconButton
          color="primary"
          sx={{ width: "40px", height: "40px", mt: 0.5 }}
          onClick={handleAddClick}
        >
          <AddCircleIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
        </Tooltip>
      </Box>
       )} 
    </Grid>
  );
}