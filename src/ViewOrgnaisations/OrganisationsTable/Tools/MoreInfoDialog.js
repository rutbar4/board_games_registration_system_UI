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
import { Container, IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import useRefMounted from "../../../hooks/useRefMounted";
import BoardGameTable from "./BoardGameTable";
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

export default function MoreInfoDialog({ organisationName }) {
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [bGames, setGames] = React.useState([]);
  const getAllBGByOrganisation = async (organisationName) => {
    try {
      console.log("aaaaaaaaaaaaaaaaaaaaa");
      console.log(organisationName);
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/GetAllBGDataByOrganisationName/" +
          organisationName
      );

      console.log(response.data);
      if (isMountedRef.current) {
        setGames(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Tooltip title={t("More info")}>
        <IconButton
          color="secondary"
          aria-label="more info"
          onClick={() => {
            handleClickOpen();
            getAllBGByOrganisation(organisationName);
          }}
        >
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {t("Information about organisation:")}
          {}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Container>
            <BoardGameTable games={bGames} />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
MoreInfoDialog.propTypes = { organisationName: PropTypes.string.isRequired };
