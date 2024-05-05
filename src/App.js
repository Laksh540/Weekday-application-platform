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
        id="combo-box-demo"
        className=" autocomplete "
        filterSelectedOptions // to filter selected options
        value={value}
        inputValue={inputValue}
        // isOptionEqualToValue={(option, value) => option.name === value?.name}
        onChange={onChange}
        onInputChange={onChangeInputChange}
        options={options}
        groupBy={(option) => option.category} // to group by
        getOptionLabel={(option) => option.name} //   to show label
        getOptionKey={(option) => option.name}
        // sx={{ width: 300 }} // width
        renderInput={(params) => {
          // console.log("params", params);
          return <TextField {...params} label="Movie" />;
        }} // render input
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            // <div key={index}>
            <Chip
              // variant="outlined"
              {...getTagProps({ index })}
              className=" autocomplete-chip"
              key={option?.name}
              deleteIcon={<CloseIcon className=" " />}
              label={option?.name}
            />
            // </div>
          ))
        } //  to display individual
        clearIcon={<CloseIcon className=" " />}
        componentsProps={{
          popupIndicator: {
            disableRipple: true,
          },
          // clearIndicator: {vis},
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
