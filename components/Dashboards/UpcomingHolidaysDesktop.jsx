import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useUpcomingHolidaysQuery } from "../../Store/slice/apiHolidaySlice";

export default function UpcomingHolidays() {
  const role = useSelector((state) => state.employees.userRole);
  const {data:upcomingHoliday}=useUpcomingHolidaysQuery();
  
  const upcomingHolidays = upcomingHoliday ? upcomingHoliday.holidays || [] : [];
  const currentDate = new Date();

  const formatDate = (timestampString) => {
    const date = new Date(timestampString);
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${day} ${monthNames[date.getMonth()]} ${year}`;

    return formattedDate;
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ position: "sticky" }}>
        <Typography fontWeight={"bold"} textAlign={"left"} fontSize={"16px"}>
          Upcoming Holidays
        </Typography>
      </CardContent>
      <Divider />
      <Box sx={{ overflow: "auto", scrollbarWidth: "thin", height: "85%", width: "100%" }}>
        <List
          sx={{
            width: "100%",
            height: 300,
            maxWidth: 360,
            bgcolor: "background.paper",
            ml:  "6%" ,
          }}
        >
          {upcomingHolidays.map((holiday, index) => (
            <Box key={index}>
              <ListItem width="100%">
                <ListItemAvatar>
                  <Avatar src={URL.createObjectURL(
                new Blob([new Uint8Array(holiday.holiday_image.data)])
              )} />
                </ListItemAvatar>
                <Typography sx={{ ml: role === "Employee" ? "25%" : "15%" }}>
                  {holiday.holiday_occasion}
                  <br />
                  {formatDate(holiday.holiday_date)}
                </Typography>
              </ListItem>
              <Divider variant="inset" />
            </Box>
          ))}
        </List>
      </Box>
    </Card>
  );
}