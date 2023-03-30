import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
}));

export default function PlayersInput({ ...props }) {
  const classes = useStyles();
  const { setFormData, formData, placeholder, ...other } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [selectedPlayers, setSelectedItem] = React.useState([]);

  const handlePlayers = (newPlayers) => {
    setFormData({ ...formData, players: newPlayers });
  };

  useEffect(() => {
    console.log("formadata", formData);
  });

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedPlayers];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);

      console.log("enter players", selectedPlayers);
      handlePlayers(newSelectedItem);

      setInputValue("");
    }
    if (
      selectedPlayers.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedPlayers.slice(0, selectedPlayers.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedPlayers];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
      console.log({
        handleChange: formData,
        selektintiplaueriai: selectedPlayers,
      });
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedPlayers];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedPlayers={selectedPlayers}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: selectedPlayers.map((item) => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
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
