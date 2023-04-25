import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useCallback } from "react";
import useRefMounted from "../../../hooks/useRefMounted";
import useAuth from "../../../Authentication/Auth/useAuth";
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

export default function Top10PlayedGamesHistogram() {
  const { organisation } = useAuth();
  const isMountedRef = useRefMounted();

  const [chartData, setChartData] = React.useState([]);

  const GetTop10BGPlaysCount = useCallback(async () => {
    try {
      console.log(organisation.id);
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/BGPlaysCountbyOrganisationId/Top10/" +
          organisation.id
      );

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
    await GetTop10BGPlaysCount();
  }, [GetTop10BGPlaysCount]);

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField="playCount" argumentField="boardGameName" />
          <Title
            text={
              <Typography variant="h6s">
                All time Top 10 played Board Games
              </Typography>
            }
          />
          <EventTracker />
          <Tooltip />
          <Animation />
        </Chart>
      </Paper>
    </ThemeProvider>
  );
}
