import * as React from "react";
import { format } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useCallback } from "react";
import useRefMounted from "../../src/hooks/useRefMounted";
import useAuth from "../../src/Authentication/Auth/useAuth";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import LaunchIcon from "@mui/icons-material/Launch";
import IconButton from "@mui/material/IconButton";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";

const theme = createTheme();

export default function MainTournamentPage() {
  const navigate = useNavigate();
  const { organisation } = useAuth();
  const [tournaments, setTournaments] = React.useState([]);

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
      stableSort(tournaments, getComparator(order, orderBy)).slice(
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
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("Name"),
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: t("Date"),
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "",
    },
  ];

  const today = new Date();
  const cjToday = dayjs(today);
  const [tournamentData, setTournamentData] = React.useState({
    Name: "",
    TournamentDate: today,
  });

  console.log(tournaments);

  const handleOnSubmit = async (event) => {
    {
      const formData = new FormData(event.currentTarget);
      const data = {
        Name: formData.get("tournamentName"),
        TournamentDate: tournamentData.TournamentDate,
        Description: formData.get("description"),
      };

      navigate("/add_new_tournament", {
        state: data,
      });
    }
  };
  const isMountedRef = useRefMounted();

  const GetAllTournamentsByOrgnisation = useCallback(async () => {
    try {
      console.log(organisation.id);
      const response = await axios.get(
        "http://localhost:7293/api/tournament/organisation/" + organisation.id
      );

      if (isMountedRef.current) {
        setTournaments(response.data);
        handleRequestSort(response.data);
      }
      console.log(tournaments);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(async () => {
    await GetAllTournamentsByOrgnisation();
  }, [GetAllTournamentsByOrgnisation]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 7,
          marginBottom: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          component="form"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          onSubmit={handleOnSubmit}
        >
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                sx={{ p: 1 }}
                required
                id="tournamentName"
                name="tournamentName"
                label={t("Tournament name")}
                variant="outlined"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  sx={{ p: 1 }}
                  ampm={false}
                  id="GamePlayDay"
                  name="GamePlayDay"
                  defaultValue={cjToday}
                  format="DD-MM-YYYY HH:mm"
                  label={t("Game play day")}
                  onChange={(value) => {
                    setTournamentData((tournamentData) => ({
                      ...tournamentData,
                      TournamentDate: value === null ? cjToday : value.$d,
                    }));
                  }}
                />
              </LocalizationProvider>
              <TextField
                sx={{ p: 1 }}
                id="description"
                name="description"
                label={t("Description")}
                multiline
                maxRows={10}
              />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                fullWidth
                sx={{
                  marginTop: 2,
                  alignItems: "center",
                }}
              >
                <Button variant="contained" type="submit">
                  {t("Create new tournament")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Box
          sx={{
            marginTop: 5,
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={"100%"}>
                    <Typography
                      sx={{ flex: "100%", textAlign: "center" }}
                      variant="h6"
                      id="tournamentsTitle"
                      component="div"
                    >
                      {t("All my organisations Tournaments")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
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
                {visibleRows.map((row) => {
                  var date = new Date(row.date);
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {format(date, "dd-MM-yyyy H:mm", { timeZone: "GMT+3" })}
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" size="large">
                          <LaunchIcon
                            onClick={() => {
                              navigate("/tournament_table/" + row.id);
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
            count={tournaments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
