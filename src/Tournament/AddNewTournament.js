//turnyro pavadinimas
//(datos kada vyks įvedimas)
//žaidėjų suvedimas (kaip boardgame)
import * as React from "react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import useRefMounted from "../hooks/useRefMounted";
import useAuth from "../Authentication/Auth/useAuth";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const theme = createTheme();
export default function AddNewTournament({ ...props }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState({
    open: false,
    message: "",
  });
  const { t } = useTranslation();
  const columns = [{ id: "name", label: t("Player"), minWidth: 50 }];
  const { organisation } = useAuth();

  const { state } = useLocation();
  const [tournament, setTournament] = useState({
    Name: state.Name,
    Date: state.TournamentDate,
    OrganisationId: organisation.id,
    Description: state.Description,
  });

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

  const handleAddTournament = async () => {
    {
      const response = await axios.post(
        "http://localhost:7293/api/Tournament",
        {
          ...tournament,
          Players: tournamentPlayers,
        }
      );
      if (response) {
        navigate("/tournament_table/" + response.data.id);
      }
    }
  };
  console.log(state);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Player input

  const { placeholder, ...other } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [tournamentPlayers, setTournamentPlayers] = React.useState([]);

  function handleAdd(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const playerName = formData.get("playerName");

    const newTournamentPlayers = [...tournamentPlayers];
    const duplicatedValues = newTournamentPlayers.indexOf(playerName.trim());

    if (duplicatedValues !== -1) {
      setInputValue("");
      return;
    }
    if (!playerName.replace(/\s/g, "").length) return;

    newTournamentPlayers.push(playerName.trim());
    setTournamentPlayers(newTournamentPlayers);

    console.log("added tournament player", tournamentPlayers);

    setInputValue("");
  }
  function handleChange(item) {
    let newSelectedItem = [...tournamentPlayers];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
      console.log({
        handleChange: formData,
        selektintiplaueriai: tournamentPlayers,
      });
    }
    setInputValue("");
    setTournamentPlayers(newSelectedItem);
  }

  const handleDelete = (item) => {
    const newTournamentPlayers = [...tournamentPlayers];
    newTournamentPlayers.splice(newTournamentPlayers.indexOf(item), 1);
    setTournamentPlayers(newTournamentPlayers);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  //>>>>>>>>>>>>>>>>Player input ^
  let i = 1;
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
          {t("Player deleted!")}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            {t("Register all tournament players")}
          </Typography>

          <Box>
            <Typography component="h1">{t("Tournament name:")}</Typography>
            <Typography component="h1">{state.Name}</Typography>
            <Typography component="h1">{t("Tournament date:")}</Typography>
            <Typography component="h1">
              {state.TournamentDate.toLocaleDateString()}{" "}
              {state.TournamentDate.toLocaleTimeString()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              align: "left",
              marginTop: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleAddTournament();
              }}
            >
              {t("Confirm Tournament")}
            </Button>
          </Box>
          <Paper
            sx={{
              marginTop: 2,
            }}
            style={{ height: 500, width: "100%" }}
            component="form"
            onSubmit={handleAdd}
          >
            <TableContainer sx={{ maxHeight: "100%" }} label="Filled">
              {/* <Table stickyHeader aria-label="customized table"> */}
              <Table stickyHeader size="small" aria-label="a dense table">
                {/* aria-label="sticky table" */}
                <TableHead>
                  <TableRow>
                    <StyledTableCell padding="checkbox">Nr.</StyledTableCell>
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
                  {tournamentPlayers.map((player) => {
                    return (
                      <StyledTableRow hover tabIndex={-1} key={player.code}>
                        <StyledTableCell padding="checkbox">
                          {i++}
                        </StyledTableCell>
                        {columns.map((column) => {
                          const value = player;
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
                        <Tooltip title={t("Delete")}>
                          <StyledTableCell key="deleteButton">
                            <IconButton
                              aria-label={t("delete")}
                              id={player}
                              onClick={() => {
                                handleDelete(player);
                              }}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </StyledTableCell>
                        </Tooltip>
                      </StyledTableRow>
                    );
                  })}
                  <StyledTableCell padding="checkbox"></StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      label={t("Name")}
                      id="playerName"
                      name="playerName"
                      variant="standard"
                    />
                  </StyledTableCell>
                  <Tooltip title={t("Add new player")}>
                    <StyledTableCell>
                      <IconButton id="addPlayer" type="submit">
                        <AddIcon />
                      </IconButton>
                    </StyledTableCell>
                  </Tooltip>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
