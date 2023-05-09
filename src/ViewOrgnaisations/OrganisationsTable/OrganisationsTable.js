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
import { Typography } from "@mui/material";
import MoreInfoDialog from "./Tools/MoreInfoDialog";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";

const theme = createTheme();

export default function OrganisationsTable() {
  const isMountedRef = useRefMounted();
  const [organisations, setOrganisations] = React.useState([]);
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
      stableSort(organisations, getComparator(order, orderBy)).slice(
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
      label: t("Name of organisation"),
    },
    {
      id: "city",
      numeric: false,
      disablePadding: false,
      label: t("City"),
    },
    {
      id: "description",
      numeric: true,
      disablePadding: false,
      label: t("Description"),
    },
  ];

  const getAllOrganisations = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/AllOrganisations"
      );

      if (isMountedRef.current) {
        setOrganisations(response.data);
        handleRequestSort(response.data);
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
                  sx={{
                    flex: "100%",
                    textAlign: "center",
                    mb: 2,
                    fontWeight: "bold",
                  }}
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
              {columns.map((headCell) => (
                <TableCell
                  size="small"
                  key={headCell.id}
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        labelRowsPerPage={t("Rows per page")}
        labelDisplayedRows={({ from, to, count }) => {
          return "" + from + "-" + to + " " + t("of") + " " + count;
        }}
        count={organisations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
}
