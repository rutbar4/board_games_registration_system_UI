import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import PlaysTable from "./DataFields/PlaysTable";
import Top10PlayedGamesHistogram from "./DataFields/Top10PlayedGamesHistogram";
import DataOfMonth from "./DataFields/DataOfMonth";
import BGTable from "./DataFields/BGTable";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

const theme = createTheme();

export default function OrganisationTableStat() {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ pb: 3, pt: 3 }}>
        <Grid spacing={4} container>
          <Grid item xs={9}>
            <Top10PlayedGamesHistogram />
          </Grid>
          <Grid item xs={3}>
            <DataOfMonth />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ pb: 3, pt: 3 }}>
        <BGTable />
      </Container>
      <Container maxWidth="lg" sx={{ pb: 3, pt: 3 }}>
        <PlaysTable />
      </Container>
    </ThemeProvider>
  );
}
