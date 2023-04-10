import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import BGamePlayInputForm from "./GameInputForm/BGamePlayInputForm";
import LogIn from "./Authentication/log-in/LogIn";
import SignUp from "./Authentication/sign-up/SignUp";
import OrganisationSignUp from "./Authentication/sign-up/OrganisationSignUp";
import MeniuToolbar from "./Toolbars/MeniuToolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRoutes } from "react-router-dom";
import Authenticated from "./Authentication/Auth/Authenticated";

const router = [
  {
    path: "",
    element: (
      <Authenticated>
        <BGamePlayInputForm />
      </Authenticated>
    ),
  },
  {
    path: "log_in",
    element: <LogIn />,
  },
  {
    path: "sign_up",
    element: <SignUp />,
  },
  {
    path: "organisation_sign_up",
    element: <OrganisationSignUp />,
  },
];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Board Game Registration System</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function App() {
  const content = useRoutes(router);
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MeniuToolbar />
      {content}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
export default App;
