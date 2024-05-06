import { useState } from "react";
import { Autocomplete, Chip, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import selectClass from "./MultiSelect.module.css";

// const options = [
//   { name: "frontend", category: "engineering" },
//   { name: "Backend", category: "engineering" },
//   { name: "Product Manager", category: "product" },
// ];
const MultiSelect = (props) => {
  //   const [value, setValue] = useState([]);
  //   const [inputValue, setInputValue] = useState("");

  const {
    value,
    inputValue,
    options,
    optionLabel,
    optionKey,
    onChange,
    onChangeInput,
    label,
    groupBy,
    single,
  } = props;

  return (
    <div className="">
      <div className={" h-24"}>
        {value?.length > 0 || (single && value !== null) ? (
          <p className="m-0 fs-13">{label}</p>
        ) : null}
      </div>
      <Autocomplete
        multiple={!single ? true : false}
        id="combo-box-demo"
        className={`autocomplete font-lexend`}
        filterSelectedOptions
        value={value}
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => {
          return option?.[optionKey] === value?.[optionKey];
        }}
        onChange={onChange}
        onInputChange={onChangeInput}
        options={options}
        groupBy={(option) => option?.[groupBy]} // to group by
        getOptionLabel={(option) => option?.[optionLabel]} //   to show label
        getOptionKey={(option) => option?.[optionKey]}
        // sx={{ width: 300 }} // width
        renderInput={(params) => {
          // console.log("params", params);
          return (
            <TextField
              {...params}
              className={`   ${
                value?.length === 0 ? "popupIndicator-separator" : ""
              }`}
              placeholder={value?.length === 0 || single ? label : ""}
            />
          );
        }} // render input
        renderTags={(eachValue, getTagProps) =>
          eachValue.map((option, index) => (
            // <div key={index}>
            <Chip
              // variant="outlined"
              {...getTagProps({ index })}
              className={` autocomplete-chip ${
                value?.length !== index - 1
                  ? "autocomplete-chip-margin-right"
                  : "autocomplete-chip-margin-right-0"
              } `}
              key={option?.name}
              deleteIcon={<CloseIcon className="" />}
              label={option?.name}
            />
            // </div>
          ))
        } //  to display individual
        clearIcon={<CloseIcon className="w-20 h-20  " />}
        componentsProps={{
          popupIndicator: {
            disableRipple: true,
          },
          clearIndicator: {
            className: `${
              value?.length > 0
                ? "popupIndicator-separator-after-clear-indicator"
                : ""
            } MuiAutocomplete-clearIndicator`,
          },
        }}
        //   openText="test2"
      />
    </div>
  );
};

export default MultiSelect;
