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
import useRefMounted from "../../../hooks/useRefMounted";
import useAuth from "../../../Authentication/Auth/useAuth";
import axios from "axios";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";

const theme = createTheme();

export default function PlaysTable() {
  const { organisation } = useAuth();
  const [plays, setPlays] = React.useState([]);
  const { t } = useTranslation();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("playDate");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(plays, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  console.log(visibleRows);
  const columns = [
    {
      id: "boardGameName",
      numeric: false,
      disablePadding: true,
      label: t("Board game name"),
    },
    {
      id: "boardGameType",
      numeric: false,
      disablePadding: true,
      label: t("Type"),
    },
    {
      id: "playersCount",
      numeric: true,
      disablePadding: false,
      label: t("Number of players"),
    },
    {
      id: "winner",
      numeric: false,
      disablePadding: true,
      label: t("Winner"),
    },
    {
      id: "winnerPoints",
      numeric: true,
      disablePadding: false,
      label: t("Winning points"),
    },
    {
      id: "datePlayed",
      numeric: false,
      disablePadding: false,
      label: t("Play date"),
    },
  ];

  console.log(plays);
  const isMountedRef = useRefMounted();

  const GetAllPlaysByOrgnisation = useCallback(async () => {
    try {
      console.log(organisation.id);
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/AllPlaysByOrganisationId/" +
          organisation.id
      );

      if (isMountedRef.current) {
        setPlays(response.data);
        handleRequestSort(response.data);
      }
      console.log(plays);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(async () => {
    await GetAllPlaysByOrgnisation();
  }, [GetAllPlaysByOrgnisation]);

  if (plays === []) return null;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={"100%"} align="center">
                <Typography
                  sx={{ flex: "100%", textAlign: "center", fontWeight: "bold" }}
                  variant="h6"
                  id="playsTableTitle"
                  component="div"
                >
                  {t("All Board Game Plays")}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((headCell) => (
                <TableCell
                  size="small"
                  key={headCell.id}
                  align="center"
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    sx={{ fontWeight: "bold" }}
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={(e) => {
                      handleRequestSort(headCell.id);
                    }}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" size="small">
                  {row.boardGameName}
                </TableCell>
                <TableCell align="left" size="small">
                  {row.boardGameType}
                </TableCell>
                <TableCell align="center" size="small">
                  {row.playersCount}
                </TableCell>
                <TableCell align="left" size="small">
                  {row.winner}
                </TableCell>
                <TableCell align="center" size="small">
                  {row.winnerPoints}
                </TableCell>
                <TableCell align="left" size="small">
                  {row.datePlayed.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        labelRowsPerPage={t("Rows per page")}
        labelDisplayedRows={({ from, to, count }) => {
          return "" + from + "-" + to + " " + t("of") + " " + count;
        }}
        count={plays.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
}
