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

export default function GameResults({ setFormData, formData }) {
  const { players } = formData;

  const [selectedWinner, setSelectedWinner] = React.useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Played board game results
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel>Select winner</FormLabel>
        </Grid>
        <Grid item xs={12}>
          <FormGroup
            required
            id="Players"
            label="Players"
            autoComplete="cc-number"
            variant="standard"
          >
            {/* Add single selection to Checkbox */}
            {players.map((player) => {
              return (
                <FormControlLabel
                  key={player}
                  control={
                    <Checkbox
                      disabled={
                        selectedWinner !== "" && player !== selectedWinner
                      }
                    />
                  }
                  onChange={(e) => {
                    console.log(e.target.checked);
                    if (e.target.checked === true) setSelectedWinner(player);
                    else setSelectedWinner("");
                    setFormData((data) => ({
                      ...data,
                      winner: player,
                    }));
                  }}
                  label={player}
                />
              );
            })}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              id="TimePlayed"
              name="TimePlayed"
              label="Time played"
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
            label="Winner Points"
            type="number"
            fullWidth
            placeholder="Winner's points"
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