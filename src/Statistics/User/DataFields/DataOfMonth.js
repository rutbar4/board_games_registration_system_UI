import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useRefMounted from "../../../hooks/useRefMounted";
import useAuth from "../../../Authentication/Auth/useAuth";
import { Grid, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function DataOfMonth() {
  const { user } = useAuth();
  const [winners, setWinners] = React.useState(null);
  const [boardGames, setBoardGames] = React.useState(null);
  const today = new Date();
  const { t } = useTranslation();

  const GetTopMonthPlayer = async (datePicker) => {
    try {
      const date = datePicker ? datePicker.$d : today;
      console.log("dt");
      console.log(date);
      const response = await axios.post(
        "http://localhost:7293/api/BoardGamePlay/TopMonthPlayers/" + user.id,
        date
      );
      if (response.data.count === "") {
        setWinners("");
      } else {
        setWinners(
          response.data
            ? response.data.players +
                "\n" +
                t("(won ") +
                response.data.winCount +
                t(" games)")
            : null
        );
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const GetTopMonthBoardGame = async (datePicker) => {
    try {
      const date = datePicker ? datePicker.$d : today;
      console.log("dt");
      console.log(date);
      const response = await axios.post(
        "http://localhost:7293/api/BoardGamePlay/TopMonthBoardGames/" + user.id,
        date
      );
      console.log(response);

      if (response.data.count === "") {
        setBoardGames("");
      } else {
        setBoardGames(
          response.data
            ? response.data.boardGames +
                "\n" +
                t("(played ") +
                response.data.count +
                t(" times)")
            : null
        );
      }

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    await GetTopMonthPlayer();
    await GetTopMonthBoardGame();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        direction={"column"}
        container
        alignItems="flex-start"
        justifyContent="space-evenly"
        style={{ minHeight: "100%" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            {t("Select month")}
          </Typography>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  format="YYYY-MM"
                  label={t('"Year" and "Month"')}
                  defaultValue={dayjs(today)}
                  onChange={(e) => {
                    GetTopMonthPlayer(e);
                    GetTopMonthBoardGame(e);
                  }}
                  views={["year", "month"]}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            {t("Player(s) of the month:")}
          </Typography>
          <Grid item>
            <TextField
              placeholder={t(
                "Here will be shown the most winning player(s) in a selected month"
              )}
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              multiline
              id="playerOfMonth"
              variant="standard"
              value={winners ?? ""}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            {t("Game(s) of the month:")}
          </Typography>
          <Grid item>
            <TextField
              placeholder={t(
                "Here will be shown the most played board game(s) in a selected month"
              )}
              multiline
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              id="boardGameOfMonth"
              variant="standard"
              value={boardGames ?? ""}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
