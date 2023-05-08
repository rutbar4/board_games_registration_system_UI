import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import useRefMounted from "../../../hooks/useRefMounted";
import { IconButton, Typography } from "@mui/material";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function BoardGameTable({ games }) {
  const isMountedRef = useRefMounted();
  const { t } = useTranslation();
  const columns = [{ id: "name", label: t("BoardGameName") }];

  console.log(games);
  if (games === null) return null;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={"90%"}>
                <Typography
                  sx={{
                    flex: "90%",
                    textAlign: "center",
                    mb: 1,
                    fontWeight: "bold",
                  }}
                  id="gamesTable"
                  component="div"
                >
                  {t("Owned board games")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ fontWeight: "bold" }} key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={t("Get more info at BoardGameGeeks.com")}>
                    <IconButton color="primary" aria-label="more info">
                      <InsertLinkOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
