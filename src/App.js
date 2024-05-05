import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Autocomplete,
  Chip,
  Grid,
  TextField,
  Typography,
  item,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MultiSelect from "./Components/MultiSelect/MultiSelect";

const roleOptions = [
  { name: "frontend", category: "engineering" },
  { name: "Backend", category: "engineering" },
  { name: "Product Manager", category: "product" },
];

const noOfEmployeeOptions = [
  { name: "1-10" },
  { name: "10-50" },
  { name: "50-200" },
];

const experienceOptions = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
];

const RemoteOptions = [
  { name: "Remote" },
  { name: "Hybrid" },
  { name: "In-Office" },
];

const minBasePayOptions = [{ name: "6" }, { name: "8" }, { name: "10" }];
function App() {
  const [pageObj, setPageObj] = useState({
    role: {
      selected: [],
      inputValue: "",
    },
    noOfEmployees: {
      selected: [],
      inputValue: "",
    },
    experience: {
      selected: [],
      inputValue: "",
    },
    remote: {
      selected: [],
      inputValue: "",
    },
    minimumBasePay: {
      selected: null,
      inputValue: "",
    },
    companyName: "",
  });

  // OnChange

  const onChangeRole = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      role: {
        ...prevObj.role,
        selected: newValue,
      },
    }));
  };

  const onChangeRoleInput = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      role: {
        ...prevObj.role,
        inputValue: newValue,
      },
    }));
  };

  const onChangeNoOfEmployee = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      noOfEmployees: {
        ...prevObj.noOfEmployees,
        selected: newValue,
      },
    }));
  };

  const onChangeNoOfEmployeeInput = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      noOfEmployees: {
        ...prevObj.noOfEmployees,
        inputValue: newValue,
      },
    }));
  };

  const onChangeExperience = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      experience: {
        ...prevObj.experience,
        selected: newValue,
      },
    }));
  };

  const onChangeExperienceInput = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      experience: {
        ...prevObj.experience,
        inputValue: newValue,
      },
    }));
  };

  const onChangeRemote = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      remote: {
        ...prevObj.remote,
        selected: newValue,
      },
    }));
  };

  const onChangeRemoteInput = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      remote: {
        ...prevObj.remote,
        inputValue: newValue,
      },
    }));
  };

  const onChangeMinBasePay = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      minimumBasePay: {
        ...prevObj.minimumBasePay,
        selected: newValue,
      },
    }));
  };

  const onChangeMinBasePayInput = (e, newValue) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      minimumBasePay: {
        ...prevObj.minimumBasePay,
        inputValue: newValue,
      },
    }));
  };
  return (
    <div className="App ">
      <div className="filter-container">
        <MultiSelect
          value={pageObj?.role?.selected}
          options={roleOptions}
          inputValue={pageObj?.role?.inputValue}
          optionLabel={"name"}
          optionKey={"name"}
          onChange={onChangeRole}
          onChangeInput={onChangeRoleInput}
          groupBy={"category"}
          label={"Role"}
        />

        <MultiSelect
          value={pageObj?.noOfEmployees?.selected}
          options={noOfEmployeeOptions}
          inputValue={pageObj?.noOfEmployees?.inputValue}
          optionLabel={"name"}
          optionKey={"name"}
          onChange={onChangeNoOfEmployee}
          onChangeInput={onChangeNoOfEmployeeInput}
          // groupBy={"category"}
          label={"No Of Employees"}
        />

        <MultiSelect
          value={pageObj?.experience?.selected}
          options={experienceOptions}
          inputValue={pageObj?.experience?.inputValue}
          optionLabel={"name"}
          optionKey={"name"}
          onChange={onChangeExperience}
          onChangeInput={onChangeExperienceInput}
          // groupBy={"category"}
          label={"Experience"}
        />

        <MultiSelect
          value={pageObj?.remote?.selected}
          options={RemoteOptions}
          inputValue={pageObj?.remote?.inputValue}
          optionLabel={"name"}
          optionKey={"name"}
          onChange={onChangeRemote}
          onChangeInput={onChangeRemoteInput}
          // groupBy={"category"}
          label={"Remote"}
        />

        <MultiSelect
          value={pageObj?.minimumBasePay?.selected}
          options={minBasePayOptions}
          inputValue={pageObj?.minimumBasePay?.inputValue}
          optionLabel={"name"}
          optionKey={"name"}
          onChange={onChangeMinBasePay}
          onChangeInput={onChangeMinBasePayInput}
          // groupBy={"category"}
          label={"Minimum Base pay Salary"}
          single={true}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          xs=8
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={8}>
          xs=8
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
