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
export default function OrganisationProfile() {
  const [open, setOpen] = React.useState(false);
  const { organisation } = useAuth();
  console.log(organisation);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [games, setGames] = React.useState([]);
  console.log(games);
  const isMountedRef = useRefMounted();
  const getAllBGByOrganisation = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/GetAllBGDataByOrganisation/" +
          organisation.id
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
      const formData = new FormData(event.currentTarget);
      const data = {
        Name: formData.get("BGName"),
        GameType: formData.get("BGType"),
        OrganisationId: organisation.id,
      };
      const response = await axios.post(
        "http://localhost:7293/api/BoardGamePlay/AddOrganisationBG",
        data
      );
      console.log("Board Game added");
      console.log(response.data);
      if (response) setGames(response.data);
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
  if (!organisation) return null;

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        autoHideDuration={4500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Board game deleted!
        </Alert>
      </Snackbar>
      <Typography variant="h6" gutterBottom align="center" mt={2}>
        My Organisation Profile
      </Typography>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={6} item xs={11}>
            <Grid container spacing={2} item xs={7}>
              <Grid item xs={10}>
                <TextField
                  name="organisationName"
                  fullWidth
                  id="organisationName"
                  label="Name of organisation"
                  defaultValue={organisation.name}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
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
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  id="email"
                  label="E-mail address"
                  name="email"
                  defaultValue={organisation.email}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  id="organisationAddress"
                  label="Address of location"
                  name="organisationAddress"
                  defaultValue={organisation.address}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  id="organisationCity"
                  label="City"
                  name="organisationCity"
                  defaultValue={organisation.city}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  defaultValue="Password"
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  type="description"
                  id="description"
                  multiline
                  rows={4}
                  defaultValue="Description"
                />
              </Grid>
              <Grid container justifyContent="flex-end" item xs={10}>
                <Button type="submit" variant="contained" sx={{ mt: 1, mb: 0 }}>
                  Edit profile
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Divider
                orientation="vertical"
                sx={{ borderRightWidth: 4 }}
              ></Divider>
            </Grid>
            <Grid item xs={4}>
              <Paper
                style={{ height: 500, width: "100%" }}
                component="form"
                onSubmit={handleAdd}
              >
                <TableContainer sx={{ maxHeight: 440 }} label="Filled">
                  {/* <Table stickyHeader aria-label="customized table"> */}
                  <Table stickyHeader size="small" aria-label="a dense table">
                    {/* aria-label="sticky table" */}
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <StyledTableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                            }}
                          >
                            {column.label}
                          </StyledTableCell>
                        ))}
                        <StyledTableCell
                          style={{
                            minWidth: 50,
                          }}
                        ></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {games.map((game) => {
                        return (
                          <StyledTableRow
                            hover
                            tabIndex={-1}
                            key={game.code}
                            // onSubmit={handleDelete}
                          >
                            {columns.map((column) => {
                              const value = game[column.id];
                              return (
                                <StyledTableCell
                                  key={column.id}
                                  align={column.align}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </StyledTableCell>
                              );
                            })}
                            <Tooltip title="Delete">
                              <StyledTableCell key="deleteButton">
                                <IconButton
                                  aria-label="delete"
                                  id={game.id}
                                  onClick={() => {
                                    handleDelete(game.id);
                                  }}
                                >
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                              </StyledTableCell>
                            </Tooltip>
                          </StyledTableRow>
                        );
                      })}
                      <StyledTableCell>
                        <TextField
                          fullWidth
                          label="Name"
                          id="BGName"
                          name="BGName"
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          fullWidth
                          label="Type"
                          id="BGType"
                          name="BGType"
                          variant="standard"
                        />
                      </StyledTableCell>
                      <Tooltip title="Add new board game">
                        <StyledTableCell>
                          <IconButton id="addBoardGame" type="submit">
                            <AddIcon />
                          </IconButton>
                        </StyledTableCell>
                      </Tooltip>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
