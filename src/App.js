import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  return (
    <div className="App ">
      <Autocomplete
        disablePortal
        multiple
        id="combo-box-demo"
        className=" autocomplete-width "
        filterSelectedOptions // to filter selected options
        options={[
          { name: "frontend", category: "engineering" },
          { name: "Backend", category: "engineering" },
          { name: "Product Manager", category: "product" },
        ]}
        groupBy={(option) => option.category} // to group by
        getOptionLabel={(option) => option.name} //   to show label
        // sx={{ width: 300 }} // width
        renderInput={(params) => {
          console.log("params", params);
          return <TextField {...params} label="Movie" />;
        }} // render input
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              // variant="outlined"
              deleteIcon={<CloseIcon className=" " />}
              label={option?.name}
              {...getTagProps({ index })}
              className=" autocomplete-chip"
            />
          ))
        } //  to display individual
      />
    </div>
  );
}

export default App;
