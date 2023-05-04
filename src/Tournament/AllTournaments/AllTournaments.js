//turėtų būti lentelė su mano buvusiais/vykstančiais turnyrais
//mygtukas add nez tournament
import * as React from "react";
import { format } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useCallback } from "react";
import useRefMounted from "../../hooks/useRefMounted";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import LaunchIcon from "@mui/icons-material/Launch";
import IconButton from "@mui/material/IconButton";

const theme = createTheme();
const columns = [
  { id: "organisationName", label: "Organisation" },
  { id: "tournamentName", label: "Name" },
  { id: "tournamentDate", label: "Date" },
  { id: "description", label: "Description" },
  { id: "actions", label: "" },
];

export default function MainTournamentPage() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = React.useState([]);

  const { t } = useTranslation();

  console.log(tournaments);

  const isMountedRef = useRefMounted();

  const GetAllTournaments = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/tournament/organisation/AllTournaments"
      );

      if (isMountedRef.current) {
        setTournaments(response.data);
      }
      console.log(tournaments);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(async () => {
    await GetAllTournaments();
  }, [GetAllTournaments]);

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
        <Grid
          container
          component="form"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        ></Grid>
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
                {tournaments.map((row) => {
                  var date = new Date(row.date);
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.organsiationName}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {format(date, "dd-MM-yyyy H:mm", { timeZone: "GMT+3" })}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" size="large">
                          <LaunchIcon
                            onClick={() => {
                              navigate("/tournament_table/public/" + row.id);
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
