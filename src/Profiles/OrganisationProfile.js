import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import useAuth from "../Authentication/Auth/useAuth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const theme = createTheme();
export default function OrganisationProfile() {
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState({
    open: false,
    message: "",
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const { organisation } = useAuth();
  console.log(organisation);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess({
      open: false,
      message: "",
    });
  };

  const handleEditProfile = async (event) => {
    {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      setIsEditing(false);
      const data = {
        ID: organisation.id,
        Name: formData.get("organisationName"),
        UserName: organisation.username,
        Password: formData.get("password"),
        Email: formData.get("email"),
        Address: formData.get("organisationAddress"),
        City: formData.get("organisationCity"),
        Description: formData.get("description"),
      };
      const response = await axios.put(
        "http://localhost:7293/api/Organisation/UpdateOrganisation",
        data
      );
      if (response) {
        console.log("Profile updated");
        console.log(response);
        setOpenSuccess({
          open: true,
          message: "Profile updated",
        });
      }
    }
  };
  if (!organisation) return null;

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={openSuccess.open}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {openSuccess.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      ></Snackbar>
      <>
        <Container component="main" maxWidth="sm" alignItems="center">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}
          >
            <Typography variant="h6" gutterBottom align="center">
              My Organisation Profile
            </Typography>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
              }}
            >
              <Grid container item xs={12}>
                <Grid
                  container
                  component="form"
                  spacing={2}
                  item
                  onSubmit={(e) => handleEditProfile(e)}
                >
                  <Grid item>
                    <TextField
                      name="organisationName"
                      fullWidth
                      id="organisationName"
                      label="Name of organisation"
                      defaultValue={organisation.name}
                      variant="standard"
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="organisationUsername"
                      fullWidth
                      id="organisationUsername"
                      label="Username"
                      defaultValue={organisation.username}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="email"
                      label="E-mail address"
                      name="email"
                      defaultValue={organisation.email}
                      variant="standard"
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="organisationAddress"
                      label="Address of location"
                      name="organisationAddress"
                      defaultValue={organisation.address}
                      variant="standard"
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="organisationCity"
                      label="City"
                      name="organisationCity"
                      defaultValue={organisation.city}
                      variant="standard"
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      defaultValue={organisation.password}
                      variant="standard"
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="description"
                      label="Description"
                      type="description"
                      id="description"
                      multiline
                      rows={4}
                      defaultValue={organisation.description}
                      placeholder="Write about your organisation"
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid container justifyContent="flex-end" item>
                    {!isEditing && (
                      <Button
                        variant="contained"
                        sx={{ mt: 1, mb: 0 }}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit profile
                      </Button>
                    )}
                    {isEditing && (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 1, mb: 0, mr: 1 }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ mt: 1, mb: 0 }}
                          onClick={() => setIsEditing(false)}
                          color="error"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </>
    </ThemeProvider>
  );
}
