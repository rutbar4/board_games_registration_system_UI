//turėtų būti lentelė su mano buvusiais/vykstančiais turnyrais
//mygtukas add nez tournament
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useCallback } from "react";
import useRefMounted from "../../src/hooks/useRefMounted";
import useAuth from "../../src/Authentication/Auth/useAuth";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

const theme = createTheme();
const columns = [
  { id: "tournamentName", label: "Name" },
  { id: "tournamentDate", label: "Date" },
];

export default function MainTournamentPage() {
  const navigate = useNavigate();
  const { organisation } = useAuth();
  const [tournaments, setTournaments] = React.useState([]);
  const { t } = useTranslation();
  const today = new Date();
  const cjToday = dayjs(today);

  console.log(tournaments);
  //   const isMountedRef = useRefMounted();

  //   const GetAllTournamentssByOrgnisation = useCallback(async () => {
  //     try {
  //       console.log(organisation.id);
  //       const response = await axios.get(
  //         "http://localhost:7293/api/BoardGamePlay/AllPlaysByOrganisationId/" +
  //           organisation.id
  //       );

  //       if (isMountedRef.current) {
  //         setTournaments(response.data);
  //       }
  //       console.log(tournaments);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }, [isMountedRef]);

  //   useEffect(async () => {
  //     await GetAllTournamentssByOrgnisation();
  //   }, [GetAllTournamentssByOrgnisation]);

  if (tournaments === []) return null;
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 7,
          marginBottom: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Tournament name"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="GamePlayDay"
                name="GamePlayDay"
                defaultValue={cjToday}
                label={t("Game play day")}
                onChange={(value) => {
                  debugger;
                  setFormData((data) => ({
                    ...data,
                    DatePlayed: value === null ? cjToday : value.$d,
                  }));
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                // {handleAddTournament}
                navigate("/add_new_tournament");
              }}
            >
              Create new tournament
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: 7,
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={"100%"}>
                    <Typography
                      sx={{ flex: "100%", textAlign: "center" }}
                      variant="h6"
                      id="tournamentsTitle"
                      component="div"
                    >
                      {t("All Tournaments")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {tournaments.map((row) => (
            //   <TableRow
            //     key={row.name}
            //     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            //   >
            //     <TableCell component="th" scope="row">
            //       {row.boardGameName}
            //     </TableCell>
            //     <TableCell align="left">{row.boardGameType}</TableCell>
            //     <TableCell align="left">{row.playersCount}</TableCell>
            //     <TableCell align="left">{row.winner}</TableCell>
            //     <TableCell align="left">{row.winnerPoints}</TableCell>
            //     <TableCell align="left">
            //       {row.datePlayed.slice(0, 10)}
            //     </TableCell>
            //   </TableRow>
            ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
