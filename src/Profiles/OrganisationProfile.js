import * as React from "react";
import ReactDOM from "react-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useRefMounted from "../hooks/useRefMounted";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import useAuth from "../Authentication/Auth/useAuth";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const sample = [
  ["Stalo zaidimas2", 159],
  ["Stalo zaidimas2", 237],
  ["Stalo zaidimas2", 262],
];
function createData(id, dessert, calories) {
  return { id, dessert, calories };
}
const columns = [
  {
    width: 200,
    label: "Board Game",
    dataKey: "dessert",
  },
  {
    width: 120,
    label: "Times Played",
    dataKey: "calories",
    numeric: true,
  },
];
const rows = Array.from({ length: 1 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}
function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

const theme = createTheme();
export default function OrganisationProfile() {
  const { organisation } = useAuth();
  console.log(organisation);
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" gutterBottom align="center" mt={2}>
        My Profile
      </Typography>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={6} item xs={11}>
            <Grid container spacing={2} item xs={7}>
              <Grid item xs={9}>
                <TextField
                  name="organisationName"
                  fullWidth
                  id="organisationName"
                  label="Name of organisation"
                  defaultValue={organisation.organisation.name}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  name="organisationUsername"
                  fullWidth
                  id="organisationUsername"
                  label="Username"
                  defaultValue={organisation.organisation.username}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  id="email"
                  label="E-mail address"
                  name="email"
                  defaultValue={organisation.organisation.email}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  id="organisationAddress"
                  label="Address of location"
                  name="organisationAddress"
                  defaultValue={organisation.organisation.address}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  id="organisationCity"
                  label="City"
                  name="organisationCity"
                  defaultValue={organisation.organisation.city}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  defaultValue="Password"
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  type="description"
                  id="description"
                  multiline
                  rows={4}
                  defaultValue="Description"
                />
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem>
              AA
            </Divider>
            <Grid item xs={4}>
              <Paper style={{ height: 500, width: "100%" }}>
                <TableVirtuoso
                  data={rows}
                  components={VirtuosoTableComponents}
                  fixedHeaderContent={fixedHeaderContent}
                  itemContent={rowContent}
                />
              </Paper>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
