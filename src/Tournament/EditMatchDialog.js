import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import useRefMounted from "../hooks/useRefMounted";
import { useCallback } from "react";
import axios from "axios";

const theme = createTheme();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, minWidth: 500 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 9,
            top: 9,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function EditMatchDialog({
  matchDetails,
  open,
  setOpen,
  setTournamentData,
}) {
  const { t } = useTranslation();
  const [winnnerName, setWinnnerName] = React.useState([]);
  const [winnnerPoints, setWinnnerPoints] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const editMatch = async () => {
    try {
      console.log(matchDetails);

      const response = await axios.put(
        "http://localhost:7293/api/Tournament/UpdateMatch",
        {
          Id: matchDetails.id,
          WinnerName: winnnerName,
          WinnerPoints: winnnerPoints,
        }
      );
      console.log(response.data);
      setTournamentData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {t("Select winner:")} { }
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Container>
            {matchDetails?.state !== "PLAYED" && (
              <>
                <Autocomplete
                  required
                  id="winner"
                  name="winner"
                  options={matchDetails?.participants.map((p) => p.name)}
                  renderInput={(params) => (
                    <TextField {...params} label={t("Winner")} />
                  )}
                  onChange={(e) => {
                    setWinnnerName(e.target.innerText);
                  }}
                ></Autocomplete>
                <TextField
                  type="number"
                  label={t("Victory points")}
                  onChange={(e) => {
                    setWinnnerPoints(e.target.value);
                  }}
                />
              </>
            )}
            {matchDetails?.state === "PLAYED" && (
              <Typography>Game is already played</Typography>
            )}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              if (matchDetails?.state !== "PLAYED") editMatch();
            }}
          >
            {t("Ok")}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
