import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GameStartForm from "./GameStartForm";
import GameResults from "./GameResults";
import Review from "./Review";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function RegisterPlayBox() {
  const [formData, setFormData] = useState({
    organisation: "",
    boardGameName: "",
    boardGameType: "",
    players: [],
    winner: "",
    winnerPoints: "",
    time_h: "",
    time_m: "",
    DatePlayed: "",
  });
  const { t } = useTranslation();

  const steps = [
    t("Starting board game"),
    t("Game results"),
    t("Review played game"),
  ];
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

  // const handleFinishByUser = async () => {
  //   if (activeStep === 2) {
  //     const response = await axios.post(
  //       "http://localhost:7293/api/BoardGamePlay/registerByUser",
  //       formData
  //     );
  //     console.log("Game play registered");
  //   }
  // };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}
        component="form"
      >
        <Typography component="h1" variant="h4" align="center">
          {t("Board Game Play")}
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
              {t("Thank you for your input.")}
            </Typography>
            <Typography variant="subtitle1">
              {t("Your board game play has been recorded")}
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && activeStep !== 3 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  {t("Back")}
                </Button>
              )}

              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  handleNext();
                  handleFinish();
                }}
              >
                {activeStep === steps.length - 1 ? t("Finish") : ""}
                {activeStep === steps.length - 2 ? t("Complete play") : ""}
                {activeStep === steps.length - 3 ? t("Next") : ""}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
}
