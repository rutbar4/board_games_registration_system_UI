import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

export default function Review({ setFormData, formData }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Game summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Organisation:
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {formData.organisation}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          Board game name:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.boardGameName}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* //padaryti kad būtų galima pasirinkti tipą ar įrašyti iš esamų */}
          Board game type:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.boardGameType}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          Players:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.players}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          Winner:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.winner}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          Time played:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.time_h}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          Winner points:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.winnerPoints}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
