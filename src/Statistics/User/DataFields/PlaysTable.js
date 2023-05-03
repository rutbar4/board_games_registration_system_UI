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
import useRefMounted from "../../../hooks/useRefMounted";
import useAuth from "../../../Authentication/Auth/useAuth";
import axios from "axios";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function PlaysTable() {
  const { user } = useAuth();
  const [plays, setPlays] = React.useState([]);
  const { t } = useTranslation();
  const columns = [
    { id: "boardGameName", label: t("Board Game Name") },
    { id: "boardGameType", label: t("Type") },
    { id: "playersCount", label: t("Number of players") },
    { id: "winner", label: t("Winner") },
    { id: "winnerPoints", label: t("Winning points") },
    { id: "playDate", label: "Play date" },
  ];

  console.log(plays);
  const isMountedRef = useRefMounted();

  const GetAllPlaysByOrgnisation = useCallback(async () => {
    try {
      console.log(user.id);
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/AllPlaysByUserId/" + user.id
      );

      if (isMountedRef.current) {
        setPlays(response.data);
      }
      console.log(plays);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(async () => {
    await GetAllPlaysByOrgnisation();
  }, [GetAllPlaysByOrgnisation]);

  if (plays === []) return null;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={"100%"}>
                <Typography
                  sx={{ flex: "100%", textAlign: "center" }}
                  variant="h6"
                  id="playsTableTitle"
                  component="div"
                >
                  {t("All Board Game Plays")}
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
            {plays.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.boardGameName}
                </TableCell>
                <TableCell align="left">{row.boardGameType}</TableCell>
                <TableCell align="left">{row.playersCount}</TableCell>
                <TableCell align="left">{row.winner}</TableCell>
                <TableCell align="left">{row.winnerPoints}</TableCell>
                <TableCell align="left">
                  {row.datePlayed.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
