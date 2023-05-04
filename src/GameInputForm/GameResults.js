import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TimeField } from "@mui/x-date-pickers/TimeField/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormGroup from "@mui/material/FormGroup";
import { FormLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function GameResults({ setFormData, formData }) {
  const { players } = formData;
  const today = new Date();
  const cjToday = dayjs(today);
  const [selectedWinner, setSelectedWinner] = React.useState("");
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("Played board game results")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel>{t("Select winner")}</FormLabel>
        </Grid>
        <Grid item xs={12}>
          <FormGroup
            required
            id="Players"
            label={t("Players")}
            autoComplete="cc-number"
            variant="standard"
          >
            {/* Add single selection to Checkbox */}
            {players.map((player) => {
              let player1 = player.charAt(0) === "@" ? player.slice(1) : player;
              return (
                <FormControlLabel
                  key={player1}
                  control={
                    <Checkbox
                      disabled={
                        selectedWinner !== "" && player1 !== selectedWinner
                      }
                    />
                  }
                  onChange={(e) => {
                    console.log(e.target.checked);
                    if (e.target.checked === true) setSelectedWinner(player1);
                    else setSelectedWinner("");
                    setFormData((data) => ({
                      ...data,
                      winner: player1,
                    }));
                  }}
                  label={player1}
                />
              );
            })}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="GamePlayDay"
              name="GamePlayDay"
              defaultValue={cjToday}
              label={t("Game play day")}
              onChange={(value) => {
                setFormData((data) => ({
                  ...data,
                  DatePlayed: value === null ? cjToday : value.$d,
                }));
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              id="TimePlayed"
              name="TimePlayed"
              label={t("Time played")}
              format="HH:mm"
              fullWidth
              variant="standard"
              onChange={(value) =>
                setFormData((data) => ({
                  ...data,
                  time_h: value.$H,
                  time_m: value.$m,
                }))
              }
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="WinnerPoints"
            name="Winner Points"
            label={t("Winner Points")}
            type="number"
            fullWidth
            placeholder={t("Winner points")}
            variant="standard"
            onChange={(e) =>
              setFormData((data) => ({
                ...data,
                winnerPoints: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
