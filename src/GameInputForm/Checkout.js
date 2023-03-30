import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GameStartForm from "./GameStartForm";
import GameResults from "./GameResults";
import Review from "./Review";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Starting board game", "Game results", "Review played game"];

const theme = createTheme();

export default function Checkout() {
  const [formData, setFormData] = useState({
    organisation: "",
    boardGameName: "",
    boardGameType: "",
    players: [],
    winner: "",
    winnerPoints: "",
    time_h: "",
    time_m: "",
  });

  React.useEffect(() => {
    console.log("Debug from Checkout.js");
    console.log(formData);
    console.log("End of debug from Checkout.js");
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <GameStartForm setFormData={setFormData} formData={formData} />;
      case 1:
        return <GameResults setFormData={setFormData} formData={formData} />;
      case 2:
        return <Review setFormData={setFormData} formData={formData} />;
      default:
        throw new Error("Unknown step");
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleFinish = async () => {
    if (activeStep === 2) {
      const response = await axios.post(
        "http://localhost:7293/api/BoardGamePlay/register",
        formData
      );
      console.log("Game play registered");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Board Game Registration System
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Board Game Play
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your input.
              </Typography>
              <Typography variant="subtitle1">
                Your board game play has been recorded
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && activeStep !== 3 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => {
                    handleNext();
                    handleFinish();
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {/* {activeStep === steps.length - 2 ? "Complete Play" : "Next"} */}
                  {activeStep === steps.length - 1 ? "Finish" : ""}
                  {activeStep === steps.length - 2 ? "Complete Play" : ""}
                  {activeStep === steps.length - 3 ? "Next" : ""}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
