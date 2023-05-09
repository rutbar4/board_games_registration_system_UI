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
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";

const theme = createTheme();

export default function BGTable() {
  const { organisation } = useAuth();
  const [games, setGames] = React.useState([]);
  const { t } = useTranslation();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("boardGameName");
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
      stableSort(games, getComparator(order, orderBy)).slice(
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
      id: "count",
      numeric: true,
      disablePadding: false,
      label: t("Plays count"),
    },
    {
      id: "record",
      numeric: true,
      disablePadding: false,
      label: t("Game record"),
    },
    {
      id: "mostWinningPlayer",
      numeric: false,
      disablePadding: true,
      label: t("Most winning player"),
    },
    {
      id: "wins",
      numeric: true,
      disablePadding: false,
      label: t("Win count"),
    },
    {
      id: "mostActivePlayer",
      numeric: false,
      disablePadding: true,
      label: t("Played most"),
    },
    {
      id: "mostActivePlayerPlayCount",
      numeric: true,
      disablePadding: false,
      label: t("Play count"),
    },
  ];

  console.log(games);
  const isMountedRef = useRefMounted();

  const GetAllPlaysByOrgnisation = useCallback(async () => {
    try {
      console.log(organisation.id);
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/BGPlaysByOrganisationId/" +
          organisation.id
      );

      if (isMountedRef.current) {
        setGames(response.data);
        handleRequestSort(response.data);
      }
      console.log(games);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(async () => {
    await GetAllPlaysByOrgnisation();
  }, [GetAllPlaysByOrgnisation]);

  if (games === []) return null;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={"100%"}>
                <Typography
                  sx={{ flex: "100%", textAlign: "center", fontWeight: "bold" }}
                  variant="h6"
                  id="BGTitle"
                  component="div"
                >
                  {t("Board Game Statistic")}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((headCell) => (
                <TableCell
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
                <TableCell component="th" scope="row">
                  {row.boardGameName}
                </TableCell>
                <TableCell align="center">{row.count}</TableCell>
                <TableCell align="center">{row.record}</TableCell>
                <TableCell align="left">{row.mostWinningPlayer}</TableCell>
                <TableCell align="center">{row.wins}</TableCell>
                <TableCell align="left">{row.mostActivePlayer}</TableCell>
                <TableCell align="center">
                  {row.mostActivePlayerPlayCount}
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
        count={games.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
}
