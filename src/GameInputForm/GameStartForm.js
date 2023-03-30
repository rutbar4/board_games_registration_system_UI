import * as React from "react";
import ReactDOM from "react-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PlayersInput from "./Helpers/PlayersInput";
import useRefMounted from "../hooks/useRefMounted";
import { useEffect, useCallback } from "react";
import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
  }
);

export default function GameStartForm({ setFormData, formData }) {
  const [organisations, setOrganisations] = React.useState([]);

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

  // const [selected, setSelected] = React.useState("");
  const changeSelectOptionHandler = (event) => {
    // setSelected(event.target.innerText);
    getBGByOrganisation(event.target.innerText);
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

  const boardGameTypes = ["Co-op", "Classic", "Solo"];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Starting board game
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            required
            id="organisationName"
            name="organisationName"
            options={organisations}
            // defaultValue={formData.organisation}
            renderInput={(params) => (
              <TextField {...params} label="Organisation" />
            )}
            onChange={(e) => {
              changeSelectOptionHandler(e);
              setFormData((data) => ({
                ...data,
                organisation: e.target.innerText,
              }));
            }}
          />
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
            placeholder="add Players"
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
