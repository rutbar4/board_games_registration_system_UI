import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import useAuth from "../Authentication/Auth/useAuth";
import { useTranslation } from "react-i18next";

export default function Review({ setFormData, formData }) {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("Game summary")}
      </Typography>
      <Grid container spacing={3}>
        {!auth.user && (
          <Grid item xs={12}>
            {t("Organisation:")}
          </Grid>
        )}
        {auth.user && (
          <Grid item xs={12}>
            {t("Organisation/My Name:")}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {formData.organisation}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {t("Board game name:")}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.boardGameName}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* //padaryti kad būtų galima pasirinkti tipą ar įrašyti iš esamų */}
          {t("Board game type:")}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.boardGameType}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {t("Players:")}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.players}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {t("Winner:")}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.winner}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {t("Time played:")}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.time_h}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {t("Winner points:")}
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
