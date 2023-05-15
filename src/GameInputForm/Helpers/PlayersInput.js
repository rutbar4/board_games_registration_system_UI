import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";
import Paper from "@mui/material/Paper";
import { Autocomplete } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
export default function PlayersInput({ ...props }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { setFormData, formData, placeholder, ...other } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [selectedPlayers, setSelectedItem] = React.useState([]);

  const handlePlayers = (newPlayers) => {
    setSelectedItem(newPlayers);
    setFormData({ ...formData, players: newPlayers });
  };

  useEffect(() => {
    console.log("formadata", formData);
  });

  function handleChange(event, value) {
    handlePlayers(value);
    console.log(value);
  }

  return (
    <React.Fragment>
      <Autocomplete
        clearIcon={false}
        freeSolo
        options={[]}
        value={selectedPlayers}
        multiple
        onChange={handleChange}
        autoComplete={false}
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip label={option} {...props({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            label="Players"
            placeholder={t("Add Players (Link to account like '@username')")}
            {...params}
          />
        )}
      />
    </React.Fragment>
  );
}
// PlayersInput.defaultProps = {
//   players: [],
// };
// PlayersInput.propTypes = {
//   handleSelectedPlayersTags: PropTypes.func.isRequired,
//   players: PropTypes.arrayOf(PropTypes.string),
// };
