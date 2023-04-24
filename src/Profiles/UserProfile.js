import * as React from "react";
import ReactDOM from "react-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useRefMounted from "../hooks/useRefMounted";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../Authentication/Auth/useAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const columns = [
  { id: "name", label: "Board Game Name", minWidth: 50 },
  { id: "gameType", label: "Type", minWidth: 50 },
  // { id: "deleteButton", label: "55", minWidth: 60 },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const theme = createTheme();
export default function UserProfile() {
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState({
    open: false,
    message: "",
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const { user } = useAuth();
  console.log(user);

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

  const [games, setGames] = React.useState([]);
  console.log(games);
  const isMountedRef = useRefMounted();

  const getAllBGByOrganisation = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/GetAllBGDataByOrganisation/" +
          user.id
      );

      if (isMountedRef.current) {
        setGames(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllBGByOrganisation();
  }, [getAllBGByOrganisation]);

  const handleAdd = async (event) => {
    {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = {
        Name: formData.get("BGName"),
        GameType: formData.get("BGType"),
        OrganisationId: user.id,
      };
      const response = await axios.post(
        "http://localhost:7293/api/BoardGamePlay/AddOrganisationBG",
        data
      );
      console.log("Board Game added");
      console.log(response.data);
      if (response) {
        setGames(response.data);
        setOpenSuccess({
          open: true,
          message: "Board Game added",
        });
      }
    }
  };

  const handleDelete = async (id) => {
    {
      const response = await axios.delete(
        "http://localhost:7293/api/BoardGamePlay/DeleteOrganisationBG/" + id
      );
      if (response) {
        console.log("Board Game deleted");
        console.log(response);
        setGames(response.data);
        setOpen(true);
      }
    }
  };

  const handleEditProfile = async (event) => {
    {
      console.log(user.id);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      setIsEditing(false);
      const data = {
        ID: user.id,
        Name: formData.get("userName"),
        Username: user.username,
        Password: formData.get("password"),
        Email: formData.get("email"),
      };
      const response = await axios.put(
        "http://localhost:7293/api/User/UpdateUser",
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
  if (!user) return null;

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
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Board game deleted!
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" gutterBottom align="center">
            My Profile
          </Typography>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
            }}
          >
            <Grid container item>
              <Grid
                container
                component="form"
                spacing={2}
                item
                onSubmit={(e) => handleEditProfile(e)}
              >
                <Grid item>
                  <TextField
                    name="userName"
                    fullWidth
                    id="userName"
                    label="Name"
                    defaultValue={user.name}
                    variant="standard"
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="userUsername"
                    fullWidth
                    id="userUsername"
                    label="Username"
                    defaultValue={user.username}
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
                    defaultValue={user.email}
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
                    defaultValue={user.password}
                    variant="standard"
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
    </ThemeProvider>
  );
}
