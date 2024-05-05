import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const options = [
  { name: "frontend", category: "engineering" },
  { name: "Backend", category: "engineering" },
  { name: "Product Manager", category: "product" },
];
function App() {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const onChange = (e, newValue) => {
    console.log("value ", newValue);
    setValue(newValue);
  };

  const onChangeInputChange = (e, newValue) => {
    console.log("value ", newValue);
    setInputValue(newValue);
  };

  return (
    <div className="App ">
      <Autocomplete
        // disablePortal
        // defaultValue={null}
        multiple
        // autoHighlight
        // autoSelect
        id="combo-box-demo"
        className=" autocomplete"
        filterSelectedOptions // to filter selected options
        value={value}
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => {
          console.log(" isOptionEqualToValue value ", value);
          console.log(" isOptionEqualToValue option ", option);
          return option?.name === value?.name;
        }}
        onChange={onChange}
        onInputChange={onChangeInputChange}
        options={options}
        groupBy={(option) => option.category} // to group by
        getOptionLabel={(option) => option.name} //   to show label
        getOptionKey={(option) => option.name}
        // sx={{ width: 300 }} // width
        renderInput={(params) => {
          // console.log("params", params);
          return (
            <div className=" test1">
              <TextField
                {...params}
                label="test"
                className={` test  ${
                  value?.length === 0 ? "popupIndicator-separator" : ""
                }`}
              />
            </div>
          );
        }} // render input
        renderTags={(eachValue, getTagProps) =>
          eachValue.map((option, index) => (
            // <div key={index}>
            <Chip
              // variant="outlined"
              {...getTagProps({ index })}
              className={`${
                value?.length !== index - 1
                  ? "autocomplete-chip-margin-right"
                  : "autocomplete-chip-margin-right-0"
              } autocomplete-chip`}
              key={option?.name}
              deleteIcon={<CloseIcon className=" " />}
              label={option?.name}
            />
            // </div>
          ))
        } //  to display individual
        clearIcon={<CloseIcon className=" test-clear " />}
        componentsProps={{
          popupIndicator: {
            disableRipple: true,
            className: " pop-indicator-padding",
          },
          clearIndicator: {
            className: `${
              value?.length > 0
                ? "popupIndicator-separator-after-clear-indicator"
                : ""
            }`,
          },
        }}
        onFocus={() => {
          console.log("focus");
        }}
        onBlur={() => {
          console.log("onBlur");
        }}
      />
    </div>
  );
}

export default App;
