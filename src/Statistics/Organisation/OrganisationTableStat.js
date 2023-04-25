import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import PlaysTable from "./DataFields/PlaysTable";
import Top10PlayedGamesHistogram from "./DataFields/Top10PlayedGamesHistogram";
import DataOfMonth from "./DataFields/DataOfMonth";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function OrganisationTableStat() {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ pb: 3, pt: 3 }}>
        <Grid spacing={3} container>
          <Grid item xs={8}>
            <Top10PlayedGamesHistogram />
          </Grid>
          <Grid item xs={4}>
            <DataOfMonth />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md" sx={{ pb: 3, pt: 3 }}>
        <PlaysTable />
      </Container>
    </ThemeProvider>
  );
}
