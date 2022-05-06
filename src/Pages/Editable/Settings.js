import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../Context/Context";
import { ReactComponent as Bgicon1 } from "../../Assests/xd1.svg";
import { ReactComponent as Bgicon2 } from "../../Assests/xd4.svg";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { GInput } from "../../Components/Settings/GInput";
import { GButton } from "../../Components/Settings/GButton";
import { ReactComponent as EditIcon } from "../../Assests/pencil.svg";
import Loader from "../../loader/Loader";
import clsx from "clsx";
const useStyles = makeStyles({
  actions: {
    width: "10%",
    cursor: "pointer",

    "& svg": {
      width: "0.75rem",
      height: "0.75rem",
    },
  },
  Bg1: {
    position: "absolute", bottom: "-23%",
    left: "-15%",
    fill: "rgba(158, 58, 140, 0.8)",
  },
  Bg2: {
    position: "absolute", top: "1%",
    left: "-50%",
  },
  errorMsg: {
    fontSize: "0.75rem",
    position: "absolute",
    top: "-2.75rem",
    right: 0,
    color: "#dc3545",
  },
  "@media (max-width: 1200px)": {
    Bg2: {
      left: "-73% "
    }
  }

});

const Settings = () => {

  const ctx = useContext(AuthContext);
  let name = ctx.user.username;

  let [updatedvalue, setUpdatedvalue] = useState({})
  const ProfilePic = (name) => {
    var FirstLetter = name.match(/\b(\w)/g); // returns an array of first letter of each word
    var Profile = FirstLetter.join(""); // joins each letter in an array to form a single word
    return Profile.toUpperCase();
    // console.log(Profile);
  };
  useEffect(() => {
    ctx.updateIsEditable(false);
  }, []);
  const classes = useStyles();
  const defaultvalues = {
    username: ctx.user.username,
    websitename: ctx.user.websitename,
    phoneno: ctx.user.phoneno,
    email: ctx.user.email,
    password: ctx.user.password,
    oldPassword: "",
    newPassword: "",
  }
  const [formValues, setFormValues] = useState(defaultvalues);

  const [enableUsername, setEnableUsername] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const submitHandler = () => {
    if (formValues.username === "") {
      setError("User Name cannot be empty");
    } else if (formValues.websitename === "") {
      setError("School Name cannot be empty");
    } else if (formValues.oldPassword === "" && formValues.newPassword === "") {
      console.log("no password change");
      setloading(true)
      ctx.updateUser({
        ...formValues,
        username: formValues.username,
        websitename: formValues.websitename,
      });
      setError();
      setEnableSave(false);
      setEnableUsername(!enableUsername);
    } else if (formValues.oldPassword === "" && formValues.newPassword !== "") {
      setError("Enter old password");
    } else if (formValues.oldPassword !== formValues.password) {
      setError("Incorrect password");
    } else if (formValues.oldPassword !== "" && formValues.newPassword === "") {
      setError("Create a new password to continue");
    } else if (formValues.newPassword === formValues.oldPassword) {
      setError("New password cannot be your old password");
    } else if (
      formValues.oldPassword !== "" &&
      formValues.newPassword !== "" &&
      formValues.username === ctx.user.username &&
      formValues.websitename === ctx.user.websitename
    ) {

      setloading(true)
      ctx.updateUser({
        ...formValues,
        password: formValues.newPassword,
      });
      setFormValues({
        ...formValues,
        newPassword: "",
        oldPassword: "",
      });
      setError();
      setEnableSave(false);
      setEnableUsername(!enableUsername);
    } else {

      setloading(true)
      ctx.updateUser({
        ...formValues,
        username: formValues.username,
        websitename: formValues.websitename,
        password: formValues.newPassword,
      });
      setFormValues({
        ...formValues,
        newPassword: "",
        oldPassword: "",
      });
      setError();
      setEnableSave(false);
      setEnableUsername(!enableUsername);
    }
    setTimeout(() => {
      setloading(false)
    }, 3000);

  };
  const handleChange = (inputObj) => {
    setFormValues({
      ...updatedvalue,
      [inputObj.id]: inputObj.value,
    });
    setEnableSave(true);
  };


  const handleCancel = () => {
    setFormValues(defaultvalues)
    setEnableSave(false);
    setEnableUsername(false);
  }
  console.log(updatedvalue)
  return (
    <>
      {loading && (
        <>
          <Loader />
        </>
      )}

      <div class=" settings page-content page-container py-2" id="page-content">

        <div class="row container d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
          <div class="col-xl-12 p-0 col-md-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-3 postion-relative border-right bg-c-lite-green d-flex align-items-center justify-content-center user-profile">
                  <Bgicon1 className={classes.Bg1} />
                  <Bgicon2 className={classes.Bg2} />
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <div className="d-flex justify-content-center text-center ml-2">
                        <div className="profile_img_top">{name && ProfilePic(name)}</div>
                      </div></div>
                    <h5 class="f-w-600" style={{ color: "var(--primary)" }}>{formValues.username}</h5>
                    <p style={{ color: "var(--primary)" }}>{formValues.websitename}</p> <i class=" fa fa-pencil-square-o feather pl-2 py-2 my-3 icon-edit  m-t-10 f-16" style={{
                      color: !enableUsername ? "#fff" : "var(--primary)",
                      background: !enableUsername ? "var(--primary)" : "#fff",
                      borderRadius: "20px",
                      padding: "5px",
                    }} onClick={() => setEnableUsername(!enableUsername)}></i>
                  </div>
                </div>
                <div class="col-sm-9 p-0">
                  <div class="card-block ">
                    <h5 class="m-b-20  w-50 text-white pl-2  py-1 p-b-5 b-b-default f-w-600" style={{ backgroundColor: "rgba(158, 58, 140, 0.8)", borderBottomRightRadius: "15px" }}>Profile Information</h5>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600" >User Name</p>
                        <div className={classes.input}>
                          <GInput
                            id={"username"}
                            value={formValues.username}
                            onInputChange={handleChange}
                            variant="standard"
                            disabled={!enableUsername}
                            inputclassName={classes.inputField}
                            placeholder="Username"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Company Name</p>
                        <div className={classes.input}>
                          <GInput
                            id={"websitename"}
                            value={formValues.websitename}
                            onInputChange={handleChange}
                            variant="standard"
                            disabled={!enableUsername}
                            inputclassName={classes.inputField}
                            placeholder="Enter company Name"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Phone No</p>
                        <div className={classes.input}>
                          <GInput
                            id={"phoneno"}
                            value={formValues.phoneno}
                            onInputChange={handleChange}
                            variant="standard"
                            disabled
                            inputclassName={classes.inputField}
                            placeholder="Mobile No"
                          />
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email</p>
                        <div className={classes.input}>
                          <GInput
                            id={"email"}
                            value={
                              formValues.email}
                            onInputChange={handleChange}
                            variant="standard"
                            disabled
                            inputclassName={classes.inputField}
                            placeholder="Email"
                          />
                        </div>
                      </div>

                    </div>
                    <h5 class="m-b-20 mt-3 w-50 text-white pl-2  py-1 p-b-5 b-b-default f-w-600" style={{ backgroundColor: "rgba(158, 58, 140, 0.8)", borderBottomRightRadius: "15px" }}>Password Reset</h5>
                    <div class="row">
                      <div class="col-sm-6 my-4">
                        <p class="m-b-10 f-w-600">Old Password</p>
                        <GInput
                          id={"oldPassword"}
                          value={
                            formValues.oldPassword}
                          onInputChange={handleChange}
                          variant="standard"
                          type="password"
                          disabled={!enableUsername}
                          inputclassName={classes.inputField}
                          placeholder="Old Password"
                          maxLength={15}
                        />
                      </div>
                      <div class="col-sm-6 my-4">
                        <p class="m-b-10 f-w-600">New Password</p>
                        <GInput
                          id={"newPassword"}
                          value={

                         formValues.newPassword}
                          onInputChange={handleChange}
                          variant="standard"
                          type="password"
                          disabled={!enableUsername}
                          inputclassName={classes.inputField}
                          placeholder="New Password"
                          maxLength={15}
                        />
                      </div>
                    </div>
                    {error && (
                      <Typography className={classes.errorMsg}>{error}</Typography>
                    )}
                    <GButton

                      onClick={() => submitHandler()}
                      label="Save"
                      disabled={!enableSave}
                      boxShadow
                      isLong
                    />
                    <GButton

                      onClick={() => handleCancel()}
                      label="cancel"
                      disabled={!enableSave}
                      boxShadow
                      isLong
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Settings;
