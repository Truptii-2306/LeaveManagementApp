import React, { useState } from "react";
import { Button, CardContent, Grid, InputBase, Stack, Typography, Alert, Select, MenuItem, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import UseResponsive from "../../hooks/UseResponsive";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { useAddInventoryMutation } from "../../Store/slice/apiInventorySlice";
import { useAddCategoryMutation, useGetAllCategoryQuery } from "../../Store/slice/apiCategorySlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  category_id: Yup.string().required("Category is required"),
  serial_number: Yup.string().required("Serial No is required"),
});

export default function InventoryForm() {
  const responsive = UseResponsive();
  const [onBoardSuccess, setOnBoardSuccess] = useState(false);
  const [onCategorySuccess, setOnCategorySuccess] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategoryField, setShowAddCategoryField] = useState(false);
  const navigate = useNavigate();

  const { data: categoryList, isError, refetch: refetchCategoryList } = useGetAllCategoryQuery();
  const CategoryList = categoryList || [];
  const [addInventory] = useAddInventoryMutation();
  const [addCategory] = useAddCategoryMutation();

  const formik = useFormik({
    initialValues: { name: "", category_id: "", serial_number: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addInventory(values);
        setOnBoardSuccess(true);
        setTimeout(() => {
          navigate("/Employee/InventoryList");
        }, 1000);
      } catch (error) {
        
      }
    },
  });

  const handleChangeCatgory = (e) => {
    setNewCategory(e.target.value);
  };

  const handleCancel = () => {
    navigate("/Employee/InventoryList");
  };

  const addNewCategory = async () => {
    if (newCategory) {
      try {
        const categoryData = { name: newCategory };
        await addCategory(categoryData);
        setOnCategorySuccess(true);
        setShowAddCategoryField(false);
        await refetchCategoryList();
      } catch (refetchCategoryListerror) {

      }
    }
  };

  if (isError) {
    return <Grid>Error while loading ...</Grid>;
  }

  return (
    <Grid
      container
      justifyContent="center"
      width="100%"
      height="100%"
      pt={responsive.isMobile ? 0 : 3}
    >
      <Stack
        sx={{
          textAlign: "left",
          width:
            responsive.isDesktop || responsive.isLaptop || responsive.isTablet
              ? "70%"
              : "100%",
        }}
      >
        <Card elevation={1} sx={{ minHeight: responsive.isMobile && "100%" }}>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Typography color="primary" variant="h5" mb={2}>
                Add Inventory
              </Typography>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  height={responsive.isMobile ? "14vh" : "11vh"}
                >
                  <Stack width="100%">
                    <Typography variant="body2">NAME</Typography>
                    <InputBase
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Name"
                      type="text"
                      sx={{
                        border:
                          formik.touched.name && formik.errors.name
                            ? "2px solid red"
                            : "2px solid rgba(204, 204, 204, 0.5)",
                        height: "40px",
                        borderRadius: 1,
                        px: 1,
                      }}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <Typography variant="caption" color="error">
                        {formik.errors.name}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                {/* Serial No Input */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  height={responsive.isMobile ? "14vh" : "11vh"}
                >
                  <Stack width="100%">
                    <Typography variant="body2">SERIAL NO</Typography>
                    <InputBase
                      name="serial_number"
                      value={formik.values.serial_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Serial No"
                      type="text"
                      sx={{
                        border:
                          formik.touched.serial_number && formik.errors.serial_number
                            ? "2px solid red"
                            : "2px solid rgba(204, 204, 204, 0.5)",
                        height: "40px",
                        borderRadius: 1,
                        px: 1,
                      }}
                    />
                    {formik.touched.serial_number && formik.errors.serial_number && (
                      <Typography variant="caption" color="error">
                        {formik.errors.serial_number}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={10}
                  sm={5}
                  height={responsive.isMobile ? "14vh" : "11vh"}
                >
                  <Stack width="100%">
                    <Typography variant="body2">CATEGORY</Typography>
                    <Select
                      value={formik.values.category_id}
                      name="category_id"
                      size="small"
                      labelId="category"
                      onClick={() => {
                        setShowAddCategoryField(false);
                      }}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
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
                      }}
                    >
                      {CategoryList.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category_id && formik.errors.category_id && (
                      <Typography variant="caption" color="error">
                        {formik.errors.category}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={2} sm={1} sx={{ mt: 2.5 }}>
                  {!showAddCategoryField && (
                    <IconButton
                      disableRipple
                      size="small"
                      onClick={() => setShowAddCategoryField(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Grid>
                {showAddCategoryField && (
                  <>
                    <Grid
                      item
                      xs={10}
                      sm={5}
                      height={responsive.isMobile ? "14vh" : "11vh"}
                    >
                      <Stack width="100%">
                        <Typography variant="body2">ADD CATEGORY</Typography>
                        <InputBase
                          name="newCategory"
                          onChange={handleChangeCatgory}
                          placeholder="Add New Category"
                          type="text"
                          sx={{
                            border: "2px solid rgba(204, 204, 204, 0.5)",
                            height: "40px",
                            borderRadius: 1,
                            px: 1,
                          }}
                        ></InputBase>
                      </Stack>
                    </Grid>
                    <Grid item xs={2} sm={1} mt={2.3} >
                      <IconButton onClick={addNewCategory} >
                        <CheckIcon sx={{color:"black", border:"2px solid rgba(204, 204, 204, 0.5)", borderRadius:5, bgcolor:"lightblue"}} />
                      </IconButton>
                    </Grid>
                  </>
                )}
              </Grid>
              <br />
              <Grid container mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none", mr: 2 }}
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
        {onCategorySuccess && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            sx={{ height: "50px", mt: "10px" }}
            severity="success"
          >
            Category added successfully.
          </Alert>
        )}

        {onBoardSuccess && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            sx={{ height: "50px", mt: "10px" }}
            severity="success"
          >
            Inventory added successfully.
          </Alert>
        )}
      </Stack>
    </Grid>
  );
}
