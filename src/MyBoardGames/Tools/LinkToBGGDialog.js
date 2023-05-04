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
import Autocomplete from "@mui/material/Autocomplete";
import { useTranslation } from "react-i18next";
import useRefMounted from "../../hooks/useRefMounted";
import AddIcon from "@mui/icons-material/Add";
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
    console.log("aaaaaaaaaaaaaaaaaaaaa");
    console.log(organisationName);

    // axios
    //   .get(`https://api.geekdo.com/xmlapi2/search?type=boardgame&query=wonders`)
    //   .then(function (response) {
    //     parseString(xmldata, function (err, results) {
    //       // parsing to json
    //       let data = JSON.stringify(response.data);

    //       // display the json data
    //       console.log("results", data.items);
    //     });

    //     // if (isMountedRef.current) {
    //     //   setGames(response.data);
    //     // }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    console.log(response.data);
  };

  return (
    <ThemeProvider theme={theme}>
      <IconButton
        id="addBoardGame"
        type="submit"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <AddIcon />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Link to BoardGameGeeks.com: {}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Container>{/* <Autocomplete></Autocomplete> */}</Container>
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
