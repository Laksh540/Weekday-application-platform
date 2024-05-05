import { useState } from "react";
import { Autocomplete, Chip, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import selectClass from "./MultiSelect.module.css";

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
  } = props;

  return (
    <div className="">
      <div className={selectClass?.["autocomplete-label"]}>
        {value?.length > 0 ? (
          <Typography className="">{label}</Typography>
        ) : null}
      </div>
      <Autocomplete
        multiple
        id="combo-box-demo"
        className={selectClass?.autocomplete}
        filterSelectedOptions
        value={value}
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => {
          console.log(" isOptionEqualToValue value ", value);
          console.log(" isOptionEqualToValue option ", option);
          return option?.name === value?.name;
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
                value?.length === 0
                  ? selectClass?.["popupIndicator-separator"]
                  : selectClass?.["popupIndicator-separator"]
              }`}
              placeholder={value?.length === 0 ? label : ""}
            />
          );
        }} // render input
        renderTags={(eachValue, getTagProps) =>
          eachValue.map((option, index) => (
            // <div key={index}>
            <Chip
              // variant="outlined"
              {...getTagProps({ index })}
              className={`${selectClass?.["autocomplete-chip"]} ${
                value?.length !== index - 1
                  ? selectClass?.["autocomplete-chip-margin-right"]
                  : selectClass?.["autocomplete-chip-margin-right-0"]
              } `}
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
          clearIndicator: {
            className: `${
              value?.length > 0
                ? selectClass?.[
                    "popupIndicator-separator-after-clear-indicator"
                  ]
                : ""
            } ${selectClass?.["MuiAutocomplete-clearIndicator"]}`,
          },
        }}
        //   openText="test2"
      />
    </div>
  );
};

export default MultiSelect;
