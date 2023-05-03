import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useCallback } from "react";
import useRefMounted from "../../hooks/useRefMounted";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreInfoDialog from "./Tools/MoreInfoDialog";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function OrganisationsTable() {
  const isMountedRef = useRefMounted();
  const [organisations, setOrganisations] = React.useState([]);
  const { t } = useTranslation();
  const columns = [
    { id: "name", label: t("Name of organisation") },
    { id: "city", label: t("City") },
    { id: "description", label: t("Description") },
  ];

  const getAllOrganisations = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/AllOrganisations"
      );

      if (isMountedRef.current) {
        setOrganisations(response.data);
        console.log(organisations);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllOrganisations();
  }, [getAllOrganisations]);

  if (organisations === []) return null;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={"100%"}>
                <Typography
                  sx={{ flex: "100%", textAlign: "center", mb: 2 }}
                  variant="h6"
                  id="organisationsTable"
                  component="div"
                >
                  {t("All registered organisations")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organisations.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center" padding="none">
                  <MoreInfoDialog organisationName={row.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
