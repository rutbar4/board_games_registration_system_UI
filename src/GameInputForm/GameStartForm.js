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
        "http://localhost:7293/api/BoardGamePlay/GetBGByOrganisation/" + orgName
      );

      if (isMountedRef.current) {
        setGames(response.data);
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
        Starting board game
      </Typography>{" "}
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                I am playing my board game
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
                <TextField {...params} label="Organisation" />
              )}
              onChange={(e) => {
                changeSelectOptionHandler(e);
                console.log("aaaaaaa");
                console.log(auth.user.name);
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
              <TextField {...params} label="Board game name" />
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
            //padaryti kad būtų galima pasirinkti tipą ar įrašyti iš esamų
            required
            id="boardGameType"
            name="boardGameType"
            variant="standard"
            options={boardGameTypes}
            renderInput={(params) => (
              <TextField {...params} label="Board game type" />
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
          <PlayersInput //PRIDETI SOLO ZAIDIMAM
            setFormData={setFormData}
            formData={formData}
            id="Players"
            name="Players"
            label="Players"
            fullWidth
            placeholder="Add Players"
            variant="standard"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<GameStartForm />, rootElement);
