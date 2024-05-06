import { useState } from "react";
import { Autocomplete, Chip, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// const options = [
//   { name: "frontend", category: "engineering" },
//   { name: "Backend", category: "engineering" },
//   { name: "Product Manager", category: "product" },
// ];
const InputText = (props) => {
  //   const [value, setValue] = useState([]);
  //   const [inputValue, setInputValue] = useState("");

  const { value, onChange, label } = props;

  return (
    <div className="m-width-100">
      <div className="h-24">
        {value?.length > 0 ? <p className="m-0 fs-13">{label}</p> : null}
      </div>
      <TextField
        // {...params}
        // className={}
        value={value ?? ""}
        onChange={onChange}
        placeholder={value?.length === 0 ? label : ""}
      />
    </div>
  );
};

export default InputText;
