import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OrganisationsTable from "./OrganisationsTable/OrganisationsTable";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function Organisations() {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <OrganisationsTable />
      </Container>
    </ThemeProvider>
  );
}
