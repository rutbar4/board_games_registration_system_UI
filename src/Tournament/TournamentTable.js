import * as React from "react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import useRefMounted from "../hooks/useRefMounted";
import useAuth from "../Authentication/Auth/useAuth";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import EditMatchDialog from "./EditMatchDialog";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

export default function TournamentTable() {
  const { t } = useTranslation();
  const { tournamentId } = useParams();
  const [tournamentData, setTournamentData] = React.useState();
  const [selectedMatch, setSelectedMatch] = React.useState();
  const isMountedRef = useRefMounted();
  const { organisation } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (match) => {
    setSelectedMatch(match);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getTournament = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/Tournament/" + tournamentId
      );

      if (isMountedRef.current) {
        console.log(response.data);
        setTournamentData(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getTournament();
  }, [getTournament]);

  if (!tournamentData) return null;
  return (
    <Box>
      <Container component="main" maxWidth="lg">
        <SingleEliminationBracket
          theme={GlootTheme}
          matches={tournamentData.matches}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer
              width={1300}
              height={2000}
              background="rgb(255, 255, 255)"
              {...props}
            >
              {children}
            </SVGViewer>
          )}
          onMatchClick={(match) => {
            console.log(match);
            handleClickOpen(match.match);
          }}
          onPartyClick={(match) => console.log(match)}
        />
      </Container>
      {organisation?.name === tournamentData.organsiationName && (
        <EditMatchDialog
          matchDetails={selectedMatch}
          open={open}
          setOpen={setOpen}
          setTournamentData={setTournamentData}
        />
      )}
    </Box>
  );
}

const GlootTheme = createTheme({
  textColor: { main: "#000000", highlighted: "#10131C", dark: "#707580" },
  matchBackground: { wonColor: "#EEEEEE", lostColor: "#EEEEEE" },
  score: {
    background: {
      wonColor: `#EEEEEE`,
      lostColor: "#EEEEEE",
    },
    text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" },
  },
  border: {
    color: "#EEEEEE",
    highlightedColor: "RGBA(152,82,242,0.4)",
  },
  roundHeader: { backgroundColor: "#FFFFFF", fontColor: "#F4F2FE" },
  connectorColor: "#3B3F73",
  connectorColorHighlight: "RGBA(152,82,242,0.4)",
  svgBackground: "#FFFFFF",
});
