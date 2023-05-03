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
import { useNavigate } from "react-router-dom";
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
export default function AddNewTournament() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState({
    open: false,
    message: "",
  });
  const { t } = useTranslation();
  const columns = [{ id: "name", label: t("Player"), minWidth: 50 }];
  const { organisation } = useAuth();
  console.log(organisation);

  const [formTournament, setTournament] = useState({
    organisation: "",
    DatePlayed: "",
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

  const [players, setPlayers] = React.useState([]);
  //   console.log(players);
  const isMountedRef = useRefMounted();

  //   const getAllBGByOrganisation = useCallback(async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:7293/api/BoardGamePlay/GetAllBGDataByOrganisation/" +
  //           organisation.id
  //       );

  //       if (isMountedRef.current) {
  //         setPlayers(response.data);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }, [isMountedRef]);

  //   useEffect(() => {
  //     getAllBGByOrganisation();
  //   }, [getAllBGByOrganisation]);

  const handleAdd = async (event) => {
    {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = {
        Name: formData.get("playerName"),
        OrganisationId: organisation.id,
      };
      const response = await axios.post(
        "http://localhost:7293/api/BoardGamePlay/AddOrganisationBG",
        data
      );
      console.log("Player added");
      console.log(response.data);
      if (response) {
        setPlayers(response.data);
        setOpenSuccess({
          open: true,
          message: "Player added",
        });
      }
    }
  };

  //   const handleDelete = async (id) => {
  //     {
  //       const response = await axios.delete(
  //         "http://localhost:7293/api/BoardGamePlay/DeleteOrganisationBG/" + id
  //       );
  //       if (response) {
  //         console.log("Player deleted");
  //         console.log(response);
  //         setPlayers(response.data);
  //         setOpen(true);
  //       }
  //     }
  //   };

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
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {t("Register all tournament players")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              align: "left",
              marginTop: 7,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                // {handleAddTournament}
                navigate("/tournament_table");
              }}
            >
              {t("Confirm Tournament")}
            </Button>
          </Box>
          <Paper
            sx={{
              marginTop: 1,
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
                  {players.map((player) => {
                    return (
                      <StyledTableRow hover tabIndex={-1} key={player.code}>
                        {columns.map((column) => {
                          const value = player[column.id];
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
                              id={player.id}
                              onClick={() => {
                                // handleDelete(player.id);
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
