import * as React from "react";
import ReactDOM from "react-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PlayersInput from "./Helpers/PlayersInput";
import useRefMounted from "../hooks/useRefMounted";
import { useEffect, useCallback } from "react";
import useAuth from "../Authentication/Auth/useAuth";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useTranslation } from "react-i18next";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
  }
);

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function GameStartForm({ setFormData, formData }) {
  const auth = useAuth();
  const { t } = useTranslation();

  console.log(auth.user);
  const [organisations, setOrganisations] = React.useState([]);
  const [toggled, setToggled] = React.useState(false);

  const isMountedRef = useRefMounted();
  const getAllOrganisationsNames = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/GetAllOrganisationsNames"
      );

      if (isMountedRef.current) {
        setOrganisations(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllOrganisationsNames();
  }, [getAllOrganisationsNames]);

  const changeSelectOptionHandler = (event) => {
    if (!toggled) getBGByOrganisation(event.target.innerText);
  };

  const [games, setGames] = React.useState([]);
  const getBGByOrganisation = async (orgName) => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/GetAllBGDataByOrganisationName/" +
          orgName
      );

      if (isMountedRef.current) {
        let names = response.data.map((n) => n.name);
        console.log(names);
        setGames(names);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getBGByUser = async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:7293/api/BoardGamePlay/GetBGByUserId/" + userId
      );

      if (isMountedRef.current) {
        setGames(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const boardGameTypes = ["Co-op", "Classic", "Solo"];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("Starting board game")}
      </Typography>{" "}
      <Grid container spacing={3}>
        <Grid item xs={12} component="form">
          {auth.isAuthenticated && auth.user && (
            <Grid>
              <Typography gutterBottom>
                <Switch
                  {...label}
                  defaultChecked
                  checked={toggled}
                  onChange={(e) => {
                    getBGByUser(auth.user.id);
                    setToggled(e.target.checked);
                    setFormData((data) => ({
                      ...data,
                      organisation: auth.user.name,
                      boardGameName: null,
                    }));
                  }}
                />
                {t("I am playing my board game")}
              </Typography>{" "}
            </Grid>
          )}
          {!toggled && (
            <Autocomplete
              required
              id="organisationName"
              name="organisationName"
              options={organisations}
              renderInput={(params) => (
                <TextField {...params} label={t("Organisation")} />
              )}
              onChange={(e) => {
                changeSelectOptionHandler(e);
                setFormData((data) => ({
                  ...data,
                  organisation: e.target.innerText,
                }));
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            required
            id="boardGameName"
            name="boardGameName"
            options={games}
            renderInput={(params) => (
              <TextField {...params} label={t("Board game name")} />
            )}
            onChange={(e) =>
              setFormData((data) => ({
                ...data,
                boardGameName: e.target.innerText,
              }))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            required
            id="boardGameType"
            name="boardGameType"
            variant="standard"
            options={boardGameTypes}
            renderInput={(params) => (
              <TextField {...params} label={t("Board game type")} />
            )}
            onChange={(e) =>
              setFormData((data) => ({
                ...data,
                boardGameType: e.target.innerText,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <PlayersInput
            setFormData={setFormData}
            formData={formData}
            id="Players"
            name="Players"
            label={t("Players")}
            fullWidth
            placeholder={t("Add Players (Link to account like '@username')")}
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<GameStartForm />, rootElement);
