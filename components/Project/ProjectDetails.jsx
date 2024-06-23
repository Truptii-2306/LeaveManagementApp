import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Card,
  Typography,
  Grid,
  ListItem,
  Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useGetProjectByIdQuery } from "../../Store/slice/apiProjectSlice";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import UseReponsive from "../../hooks/UseResponsive";
import {Tooltip} from "@mui/material"

export default function ProjectDetails({ onProjectAddOrEdit }) {
  let { Id } = useParams();
  const { data: project, isLoading } = useGetProjectByIdQuery(Id);
  const navigate = useNavigate();
  const responsive = UseReponsive();

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

  if (isLoading) {
    return <></>;
  }

  return (
    <Grid container sx={{ height: "89vh", padding: 1 }}>
      <Grid
        item
        xs={12}
        sx={{
          height:
            responsive.isDesktop || responsive.isLaptop || responsive.isTablet
              ? "28%"
              : "40%",
        }}
      >
        <Card elevation={2} sx={{ height: "100%", padding: 2 }}>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"space-between"}
            mx={2}
          >
            <Typography
              fontSize={responsive.isDesktop ? "24px" : "18px"}
              fontWeight={525}
              display="flex"
              justifyContent="left"
              alignItems={"center"}
              width="100%"
            >
              {project.name.toUpperCase()}

              <Box
                sx={{
                  bgcolor: project.status === "active" ? "#CCFFCC" : "#D3D3D3",
                  color: project.status === "active" ? "008800" : "gray",
                  width: "60px",
                  height: "20px",
                  p: "1px",
                  borderRadius: "6px",
                  textAlign: "center",
                  fontSize: "12px",
                  ml: 2,
                }}
              >
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </Box>
            </Typography>
            <IconButton
              onClick={() => {
                onProjectAddOrEdit("edit");
                navigate("/Employee/Projects/ProjectForm");
              }}
            >
              <EditIcon sx={{ color: "blue" }} />
            </IconButton>
          </Grid>
          <Grid container textAlign={"left"} sx={{ mx: 2, mb: 2, mt: 1 }}>
            <Grid item lg={12} md={12} xs={12} sm={12}>
              {project.manager && (
                <Typography>Project Manager: {project.manager.name}</Typography>
              )}
            </Grid>
            <Grid item lg={12} md={12} xs={12} sm={12}>
              <Typography>
                Start Date: {formatDate(project.start_date)}
              </Typography>
            </Grid>

            <Grid item lg={12} md={12} xs={12} sm={12}>
            <Tooltip title={project.description} arrow >
              {project.description && (
                <Typography
                  align="left"
                >
                  Description:{project.description.length >60 ? project.description.slice(0, 110) + '...': project.description}
                </Typography>
              )}
              </Tooltip>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12} sx={{ height: "72%", marginTop: 1 }}>
        <Card sx={{ height: "100%" }}>
          <Typography
            fontWeight={"bold"}
            textAlign={"left"}
            fontSize={"16px"}
            sx={{ p: 2 }}
          >
            Team Assigned to This Project
          </Typography>
          <Divider />
          <Box
            sx={{ maxHeight: "84%", overflowY: "auto", scrollbarWidth: "thin" }}
          >
            {project.employee &&
              project.employee.map((emp, index1) => (
                <Box key={index1}>
                  <ListItem alignItems="flex-start" mx={1}>
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item>
                        <Avatar
                          sx={{ width: "50px", height: "50px" }}
                          alt={emp.name}
                          src={
                            emp.image
                              ? URL.createObjectURL(
                                  new Blob([new Uint8Array(emp.image.data)])
                                )
                              : ""
                          }
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
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider variant="inset" />
                </Box>
              ))}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
