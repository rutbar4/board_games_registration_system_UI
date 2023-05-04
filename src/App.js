import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import BGamePlayInputForm from "./GameInputForm/RegisterPlayForm";
import LogIn from "./Authentication/log-in/LogIn";
import SignUp from "./Authentication/sign-up/SignUp";
import OrganisationTableStat from "./Statistics/Organisation/OrganisationTableStat";
import UserTableStat from "./Statistics/User/UserTableStat";
import OrganisationSignUp from "./Authentication/sign-up/OrganisationSignUp";
import MainTournamentPage from ".//Tournament/MainTournamentPage";
import TournamentTable from "./Tournament/TournamentTable";
import AddNewTournament from "./Tournament/AddNewTournament";
import MeniuToolbar from "./Toolbars/MeniuToolbar";
import OrganisationProfile from "./Profiles/OrganisationProfile";
import UserProfile from "./Profiles/UserProfile";
import OrganisationBoardGamesTable from "./MyBoardGames/OrganisationsBoardGamesTable";
import UserBoardGamesTable from "./MyBoardGames/UserBoardGamesTable";
import Organisations from "./ViewOrgnaisations/Organisations";
import OrganisationPage from "./OrganisationPage/OrganisationPage";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRoutes } from "react-router-dom";
import Authenticated from "./Authentication/Auth/Authenticated";
import { StyledEngineProvider } from "@mui/material/styles";
import useAuth from "./Authentication/Auth/useAuth";
import { useTranslation } from "react-i18next";
import * as moment from "moment-timezone";

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
  {
    path: "main_tournament_page",
    element: (
      <Authenticated>
        <MainTournamentPage />
      </Authenticated>
    ),
  },
  {
    path: "tournament_table",
    children: [
      {
        path: ":tournamentId",
        element: (
          <Authenticated>
            <TournamentTable />
          </Authenticated>
        ),
      },
    ],
  },
  {
    path: "add_new_tournament",
    element: (
      <Authenticated>
        <AddNewTournament />
      </Authenticated>
    ),
  },
  {
    path: "organisations",
    element: <Organisations />,
  },
  {
    path: "organisations_page",
    element: <Organisations />,
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
  moment.tz.setDefault("Etc/UTC");
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
