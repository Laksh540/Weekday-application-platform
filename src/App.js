import logo from "./logo.svg";
import { useEffect, useState } from "react";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import {
  Autocomplete,
  Chip,
  Grid,
  TextField,
  Typography,
  item,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MultiSelect from "./Components/MultiSelect/MultiSelect";
import "./App.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputText from "./Components/InputText/InputText";
import JobService from "./Services/JobService";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

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
let isFirstRenderCheckToGetJobList = true;
const App = () => {
  // let isFirstRenderCheckToGetJobList = true;
  //  states
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
    jobList: [],
    jobListOffset: 0,
    jobListCount: 0,
  });
  const [toggleToRequestMoreData, setToggleToRequestMoreData] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);

  // useEffect
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      // console.log("scrollTop", scrollTop);
      // console.log("clientHeight", clientHeight);
      // console.log("scrollHeight", scrollHeight);
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setToggleToRequestMoreData((prev) => !prev);
      }
    };

    getJobList();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let getData;
    // ignore for first render
    if (!isFirstRenderCheckToGetJobList) {
      setIsListLoading(true);
      getData = setTimeout(() => {
        if (pageObj?.jobListCount > pageObj?.jobList.length) {
          getJobList();
        }
      }, 2000);
    }
    if (isFirstRenderCheckToGetJobList) {
      isFirstRenderCheckToGetJobList = false;
    }

    return () => {
      clearTimeout(getData);
    };
  }, [toggleToRequestMoreData]);

  // services

  const getJobList = async () => {
    const body = JSON.stringify({
      limit: 10,
      offset: pageObj?.jobListOffset,
    });
    setIsListLoading(true);
    try {
      const res = await JobService.getList(body).then((response) =>
        response.text()
      );
      setIsListLoading(false);
      const parsedResponse = JSON.parse(res);
      setPageObj((prevPageObj) => ({
        ...prevPageObj,
        jobList: updatedJobList(prevPageObj.jobList, parsedResponse?.jdList),
        jobListOffset: pageObj?.jobListOffset + 1,
        jobListCount: parsedResponse?.totalCount,
      }));
      console.log("res", res);
    } catch (error) {
      setIsListLoading(false);
      console.log(error);
    }
  };

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

  const onChangeCompanyNameInput = (e) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      companyName: e?.target?.value,
    }));
  };
  // helper
  const updatedJobList = (oldData, newData) => {
    let updatedList = [...oldData];
    // updatedList
    newData?.forEach((record) => {
      updatedList.push({
        companyName: record?.companyName ?? "",
        jdLink: record?.jdLink ?? "",
        jobDetailsFromCompany: record?.jobDetailsFromCompany ?? "",
        jobRole: record?.jobRole ?? "",
        location: record?.location ?? "",
        logoUrl: record?.logoUrl ?? "",
        maxExp: record?.maxExp ?? "",
        maxJdSalary: record?.maxJdSalary ?? "",
        minJdSalary: record?.minJdSalary ?? "",
        minExp: record?.minExp ?? "",
        salaryCurrencyCode: record?.salaryCurrencyCode ?? "",
      });
    });

    return updatedList;
  };

  console.log("pageObj", pageObj);
  return (
    <div className="App ">
      <div className="filter-container one-rem-mb">
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

        <InputText
          value={pageObj?.companyName}
          label={"Company Name"}
          onChange={onChangeCompanyNameInput}
        />
      </div>

      <Grid container spacing={2} className="">
        {/* pageObj?.jobList?.length === 0 && isListLoading */}
        {pageObj?.jobList?.length === 0 && isListLoading ? (
          <div className=" flex justify-center w-100 five-rem-mt">
            <div className="item-center">
              <HourglassBottomIcon className=" w-30 h-30 icn-spinner" />
            </div>
          </div>
        ) : (
          pageObj?.jobList?.map((job, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="card-layout shadow-2 border-radius-20">
                <CardContent>
                  <div className="w-fit py-4 px-6 fs-9  b-1-gray shadow border-radius-10 one-rem-mb">
                    <span>⏳ Posted a month ago</span>
                  </div>
                  <div className="flex  item-start">
                    <div className="w-38 h-38 half-rem-mr">
                      <img
                        src={`${job?.logoUrl ?? ""}`}
                        className="w-38 h-38"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="fs-13 fw-600 light-grey mt-0  half-rem-mb">
                        {job?.companyName}
                      </p>
                      <p
                        // color="subtitle1"
                        // gutterBottom
                        className="fs-14 fw-400  mt-0 half-rem-mb"
                      >
                        {job?.jobRole}{" "}
                      </p>
                      <p className="fs-11 fw-500  mt-0 half-rem-mb">
                        {job?.location}{" "}
                      </p>
                    </div>
                  </div>
                  <p
                    color=""
                    // variant="body1"
                    // gutterBottom
                    className="fs-14 dark-grey fw-400"
                  >
                    {`Estimated Salary: ${
                      job?.minJdSalary || job?.minJdSalary === 0
                        ? job?.minJdSalary
                        : "N/A"
                    } -${
                      job?.maxJdSalary || job?.maxJdSalary === 0
                        ? job?.maxJdSalary
                        : "N/A"
                    } LPA ✅`}
                  </p>
                  <div className="card-content one-rem-mb">
                    <p
                      // variant="h6"
                      component="div"
                      className="fs-16 mb-0"
                    >
                      About Company
                    </p>
                    <p
                      color=""
                      // variant="subtitle2"
                      className="fs-14 fw-500 half-rem-mt half-rem-mb"
                    >
                      About Us
                    </p>
                    <p className="content-fade m-0 fs-14">
                      {job?.jobDetailsFromCompany}
                    </p>
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      className="text-capitalize"
                      disableRipple
                    >
                      View Job
                    </Button>
                  </div>
                  <div
                    className={
                      parseFloat(job?.minExp) >= 0
                        ? ""
                        : "visibility-hidden h-42-point-667 half-rem-mb"
                    }
                  >
                    <p
                      color=""
                      // variant="body1"
                      // gutterBottom
                      className="fs-14 dark-grey fw-400 mt-0 half-rem-mb"
                    >
                      Minimum Experience
                    </p>
                    <p className="fs-14 fw-400 mt-0 half-rem-mb">
                      {job?.minExp ? `${job?.minExp} Years` : ""}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      // color="success"
                      fullWidth
                      className="half-rem-mb half-rem-mt text-light-green text-1000 font-lexend text-capitalize"
                      disableRipple
                    >
                      ⚡ Easy Apply
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className=" text-capitalize font-lexend fw-200"
                      fullWidth
                      startIcon={
                        <div className="flex">
                          <AccountCircleIcon className="half-rem-mr " />
                          <AccountCircleIcon className=" " />
                        </div>
                      }
                      disableRipple
                    >
                      Unlock Referral Asks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {pageObj?.jobList?.length > 0 && isListLoading ? (
        <div className=" flex justify-center h-38 one-rem-mt">
          <div className="">
            <HourglassBottomIcon className=" w-30 h-30 icn-spinner" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
