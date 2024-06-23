import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import DeleteDialouge from "../Main/DeleteDialouge";
import { useState } from "react";
import { useParams } from "react-router-dom";
import  {
  useGetEmployeesByIdQuery,
  useDeleteEmployeeMutation,
  useAssignProjectMutation
} from "../../Store/slice/apiEmployeeSlice";
import {
  useGetProjectsQuery,
} from "../../Store/slice/apiProjectSlice";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import UseReponsive from "../../hooks/UseResponsive";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';

export default function EmployeeDetails({
  openDeleteDialouge,
  onOpenDeleteDialogue,
  onCloseDeleteDialogue,
}) {
  const responsive=UseReponsive()
  const Navigate = useNavigate();
  const { id } = useParams();
  const selectedEmp = parseInt(id);

  const {
    data: Employee,
    isLoading,
    isError,
    isSuccess
  } = useGetEmployeesByIdQuery(id);
  const { data: project } = useGetProjectsQuery();
  let [selectedProject, setSelectedProject] = useState("");
  const [assignProject] = useAssignProjectMutation();

  const Project = project || [];
  const [deleteEmployee] = useDeleteEmployeeMutation();
  
  let availableProjects=[];

  function hadleDelete() {
    deleteEmployee(selectedEmp);
    Navigate("/Employee/Employees");
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

  function handelAssign(projectId) {
    const projectObj = {
      employeeId: selectedEmp,
      projectId: projectId,
    };
    assignProject(projectObj);
    setSelectedProject("")
  }


  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <></>;
  }
  if(isSuccess){
    const assignedProjectIds = Employee.project.map(project => project.id);
    availableProjects = Project.filter(project => !assignedProjectIds.includes(project.id));
  }

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Card elevation={3} sx={{ mb: 1 }}>
        <CardContent>
          <Grid container width="100%">
          <Grid item xs={12} sm={4.5} md={2.5} lg={1.7} alignItems={"center"}>
              <Box sx={{ width: 124, height: 124 }}>
                <Avatar
                  sx={{ width: 124, height: 124 }}
                  src={
                    Employee.image === null
                      ? ""
                      : URL.createObjectURL(
                          new Blob([new Uint8Array(Employee.image.data)])
                        )
                  }
                  alt="Profile"
                />

              <Tooltip title="Edit Employee">
                <IconButton
                  disableRipple
                  sx={{
                    mt: -8,
                    ml: 11,
                    position: "relative",
                    backgroundColor: "blue",
                    border: "3px solid white",
                    borderRadius: "50%",
                    p:"5px",
                    "&:hover": {
                      backgroundColor: "blue",
                    },
                  }}
                  
                >
                  <EditIcon
                    sx={{
                      height: "20px",
                      width: "20px",
                      color: "white",
                    }}
                    onClick={() => {
                      Navigate(`/Employee/Employees/EmployeeDetailsForm/${id}`);
                    }}
                  />
                </IconButton>
                </Tooltip>
              </Box>
            </Grid>

            <Grid item textAlign={"left"} xs={12} sm={4} md={4} lg={5.4}>
              <Typography
                fontWeight="700"
                variant="h6"
                textAlign={"left"}
                mb={1}
              >
                {Employee.name}
              </Typography>

              <Box display={"flex"} gap={0.5} flexDirection={"row"}>
                <MailIcon sx={{ height: "20px", mt: 0.2 }} />
                <Typography color="body2" style={{ overflowWrap:"anywhere"}}>{Employee.email} </Typography>
              </Box>
              <Box display={"flex"} gap={0.5} flexDirection={"row"}>
                <CallIcon sx={{ height: "20px" }} />
                <Typography variant="body2">
                  {Employee.mobile_number}
                </Typography>
              </Box>
              <Box display={"flex"} gap={0.5} flexDirection={"row"}>
                <OtherHousesIcon />
                <Typography variant="body1">
                  {Employee.department
                    ? Employee.department.department_name
                    : "-"}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              textAlign={"left"}
              xs={12}
              sm={4}
              md={4}
              lg={3}
              mt={responsive.isDesktop ?5:0}
            >
              {Employee.manager && (
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold' }}>Manager :</span> {Employee.manager.name}
                </Typography>
              )}
              <Typography variant="body1"><span style={{ fontWeight: 'bold' }}>Gender:</span> {Employee.gender}</Typography>
              <Typography variant="body1">
              <span style={{ fontWeight: 'bold' }}>Date of Birth:</span> {formatDate(Employee.dob)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={1} lg={1.7} width={"100%"}>
              <Tooltip title="Delete Employee">
                <DeleteIcon
                  sx={{ml:"96%"}}
                  onClick={() => {
                    onOpenDeleteDialogue();
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={1} height={"61.5vh"}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <Typography variant="h6" p={1}>
              Projects
            </Typography>

            <Divider />
            <Box position={"sticky"} py={1}>
                    <FormControl sx={{ minWidth: 120}}>
                      <InputLabel id="demo-select-small-label" size="small">
                        Assign Project
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        onChange={(e) => setSelectedProject(e.target.value)}
                        value={selectedProject}
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
                          width: "270px", 
                          height: "40px",
                          borderRadius: 1,
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              scrollbarWidth:"thin"
                            },
                          },
                        }}
                      >
                        {availableProjects.map((project) => (
                          <MenuItem key={project.id} value={project.id}>
                            {project.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Tooltip title="Assign Project">
                    <IconButton onClick={() =>{handelAssign(selectedProject);handelAssign("");}}>
                    <CheckIcon
                      sx={{     
                        color: "black",
                        border: "2px solid rgba(204, 204, 204, 0.5)",
                        borderRadius: 5,
                        bgcolor: "lightblue",
                      }}
                    />
                    </IconButton>
                    </Tooltip>
                  </Box>
                  <Divider/>
                <List sx={{ overflowY: "auto",maxHeight:"44.5vh",scrollbarWidth:"thin"}}>
                  {Employee.project &&
                    Employee.project.map((Project, index) => (
                      <Box>
                        <ListItem
                          key={index}
                          variant="body1"
                          sx={{ px: 2, py: 1.3 }}
                        >
                          <ListItemText>{Project.name}</ListItemText>
                          <Box
                            sx={{
                              bgcolor:
                                Project.status === "active"
                                  ? "#CCFFCC"
                                  : "#D3D3D3",
                              color:
                                Project.status === "active" ? "008800" : "gray",
                              width: "60px",
                              p: "1px",
                              borderRadius: "6px",
                              textAlign: "center",
                              fontSize: "12px",
                            }}
                          >
                            {Project.status.charAt(0).toUpperCase() +
                              Project.status.slice(1)}
                          </Box>
                        </ListItem>
                        {index !== Employee.project.length - 1 && <Divider />}
                      </Box>
                    ))}
                </List>

          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <Typography variant="h6" p={1}>
              Inventory
            </Typography>
            <Divider />
            <List sx={{ overflowY: "auto",maxHeight:"320px",scrollbarWidth:"thin"}}>
              {Employee.inventories &&
                Employee.inventories.map((inventory, index) => (
                  <div key={index}>
                    <ListItem sx={{ px: 2, pb: 0.5, pt: 0.2 }}>
                      <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant="subtitle1">
                          {inventory.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Serial Number : {inventory.serial_number}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index !== Employee.inventories.length - 1 && <Divider />}
                  </div>
                ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      <DeleteDialouge
        openDeleteDialouge={openDeleteDialouge}
        onCloseDeleteDialogue={onCloseDeleteDialogue}
        handelDelete={hadleDelete}
      />
    </Box>
  );
}
