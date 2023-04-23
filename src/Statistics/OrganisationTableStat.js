import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { useEffect, useCallback } from "react";
import useRefMounted from "../hooks/useRefMounted";
import useAuth from "../Authentication/Auth/useAuth";
import { BarSeries, ValueScale } from "@devexpress/dx-react-chart";
import { EventTracker } from "@devexpress/dx-react-chart";
import axios from "axios";
import {
  Chart,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { Typography } from "@mui/material";

const theme = createTheme();
const columns = [
  { id: "boardGameName", label: "Board Game Name" },
  { id: "boardGameType", label: "Type" },
  { id: "playersCount", label: "Number of players" },
  { id: "winner", label: "Winner" },
  { id: "winnerPoints", label: "Winning points" },
  // { id: "deleteButton", label: "55", minWidth: 60 },
];

export default function BasicTable() {
  const { organisation } = useAuth();
  const [plays, setPlays] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  console.log(plays);
  const isMountedRef = useRefMounted();

  const GetAllPlaysByOrgnisation = useCallback(async () => {
    try {
      console.log(organisation.id);
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/AllPlaysByOrganisationId/" +
          organisation.id
      );

      if (isMountedRef.current) {
        setPlays(response.data);
      }
      console.log(plays);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  const GetTop10BGPlaysCount = useCallback(async () => {
    try {
      console.log(organisation.id);
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/BGPlaysCountbyOrganisationId/Top10/" +
          organisation.id
      );

      console.log("dt");
      console.log(response);
      if (isMountedRef.current) {
        setChartData(response.data);
      }
      console.log(chartData);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(async () => {
    await GetAllPlaysByOrgnisation();
    GetTop10BGPlaysCount();
  }, [GetAllPlaysByOrgnisation, GetTop10BGPlaysCount]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ pb: 2, pt: 3 }}>
        <Paper>
          <Chart data={chartData}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="playCount" argumentField="boardGameName" />
            <Title text="Top 10 played games" />
            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
        </Paper>
      </Container>
      <Container maxWidth="md" sx={{ pb: 2, pt: 2 }}>
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
                    All Board Game Plays
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}
