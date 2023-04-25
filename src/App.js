import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import BGamePlayInputForm from "./GameInputForm/RegisterPlayForm";
import LogIn from "./Authentication/log-in/LogIn";
import SignUp from "./Authentication/sign-up/SignUp";
import OrganisationTableStat from "./Statistics/Organisation/OrganisationTableStat";
import UserTableStat from "./Statistics/User/UserTableStat";
import OrganisationSignUp from "./Authentication/sign-up/OrganisationSignUp";
import MeniuToolbar from "./Toolbars/MeniuToolbar";
import OrganisationProfile from "./Profiles/OrganisationProfile";
import UserProfile from "./Profiles/UserProfile";
import OrganisationBoardGamesTable from "./MyBoardGames/OrganisationsBoardGamesTable";
import UserBoardGamesTable from "./MyBoardGames/UserBoardGamesTable";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRoutes } from "react-router-dom";
import Authenticated from "./Authentication/Auth/Authenticated";
import { StyledEngineProvider } from "@mui/material/styles";
import useAuth from "./Authentication/Auth/useAuth";
import { useTranslation } from "react-i18next";

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
  {
    path: "/org_stat",
    element: (
      <Authenticated>
        <OrganisationTableStat />
      </Authenticated>
    ),
  },
  {
    path: "/user_stat",
    element: (
      <Authenticated>
        <UserTableStat />
      </Authenticated>
    ),
  },
  {
    path: "organisation_profile",
    element: (
      <Authenticated>
        <OrganisationProfile />
      </Authenticated>
    ),
  },
  {
    path: "user_profile",
    element: (
      <Authenticated>
        <UserProfile />
      </Authenticated>
    ),
  },
  {
    path: "organisation_board_games",
    element: (
      <Authenticated>
        <OrganisationBoardGamesTable />
      </Authenticated>
    ),
  },
  {
    path: "user_board_games",
    element: (
      <Authenticated>
        <UserBoardGamesTable />
      </Authenticated>
    ),
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
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledEngineProvider>
        <MeniuToolbar />
        {auth.isInitialized ? content : null}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
export default App;
