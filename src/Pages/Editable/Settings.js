import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../Context/Context";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { GInput } from "../../Components/Settings/GInput";
import { GButton } from "../../Components/Settings/GButton";
import { ReactComponent as EditIcon } from "../../Assests/pencil.svg";
import Loader from "../../loader/Loader";
const useStyles = makeStyles({
  root: {
    width: "70%",
    margin: "auto",
    borderBottom: "1px solid #E8E8E8",
    padding: "3rem 0",
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },
  label: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "1rem",
    color: "#929292",
    "& p": {
      margin: 0,
      color: "#929292",
      width: "50%",
      fontSize: "0.9rem",
    },
  },
  input: {
    width: "60%",
    padding: "0 2rem",
  },
  inputField: {
    marginBottom: "1rem",
  },
  actions: {
    width: "10%",
    cursor: "pointer",

    "& svg": {
      width: "0.75rem",
      height: "0.75rem",
    },
  },
  errorMsg: {
    fontSize: "0.75rem",
    position: "absolute",
    top: "-2.75rem",
    right: 0,
    color: "#dc3545",
  },
});

const Settings = () => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    ctx.updateIsEditable(false);
  }, []);
  const classNamees = useStyles();
  const [formValues, setFormValues] = useState({
    username: ctx.user.username,
    schoolname: ctx.user.schoolname,
    phoneno: ctx.user.phoneno,
    email: ctx.user.email,
    password: ctx.user.password,
    oldPassword: "",
    newPassword: "",
  });
  const [enableUsername, setEnableUsername] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const submitHandler = () => {
    if (formValues.username === "") {
      setError("User Name cannot be empty");
    } else if (formValues.schoolname === "") {
      setError("School Name cannot be empty");
    } else if (formValues.oldPassword === "" && formValues.newPassword === "") {
      console.log("no password change");
      setloading(true)
      ctx.updateUser({
        ...formValues,
        username: formValues.username,
        schoolname: formValues.schoolname,
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
      formValues.schoolname === ctx.user.schoolname
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
        schoolname: formValues.schoolname,
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
      ...formValues,
      [inputObj.id]: inputObj.value,
    });
    setEnableSave(true);
  };
  return (
    <>
     {loading && (
        <>
          <Loader />
        </>
      )}
      <div className={classNamees.root}>
        <div className={classNamees.row}>
          <div className={classNamees.label}>
            <Typography>Username</Typography>
            <span>:</span>
          </div>
          <div className={classNamees.input}>
            <GInput
              id={"username"}
              value={formValues.username}
              onInputChange={handleChange}
              variant="standard"
              disabled={!enableUsername}
              inputclassName={classNamees.inputField}
              placeholder="Username"
            />
          </div>
        </div>
        <div className={classNamees.row}>
          <div className={classNamees.label}>
            <Typography>School Name</Typography>
            <span>:</span>
          </div>
          <div className={classNamees.input}>
            <GInput
              id={"schoolname"}
              value={formValues.schoolname}
              onInputChange={handleChange}
              variant="standard"
              disabled={!enableUsername}
              inputclassName={classNamees.inputField}
              placeholder="Enter School Name"
            />
          </div>
          <div className={classNamees.actions}></div>
        </div>
        <div className={classNamees.row}>
          <div className={classNamees.label}>
            <Typography>Mobile No</Typography>
            <span>:</span>
          </div>
          <div className={classNamees.input}>
            <GInput
              id={"phoneno"}
              value={formValues.phoneno}
              onInputChange={handleChange}
              variant="standard"
              disabled
              inputclassName={classNamees.inputField}
              placeholder="Mobile No"
            />
          </div>
          <div className={classNamees.actions}></div>
        </div>
        <div className={classNamees.row}>
          <div className={classNamees.label}>
            <Typography>Email</Typography>
            <span>:</span>
          </div>
          <div className={classNamees.input}>
            <GInput
              id={"email"}
              value={formValues.email}
              onInputChange={handleChange}
              variant="standard"
              disabled
              inputclassName={classNamees.inputField}
              placeholder="Email"
            />
          </div>
          <div className={classNamees.actions}></div>
        </div>
        <div className={classNamees.row} style={{ marginBottom: "2rem" }}>
          <div className={classNamees.label}>
            <Typography>Change Password</Typography>
            <span>:</span>
          </div>
          <div className={classNamees.input}>
            <GInput
              id={"oldPassword"}
              value={formValues.oldPassword}
              onInputChange={handleChange}
              variant="standard"
              type="password"
              disabled={!enableUsername}
              inputclassName={classNamees.inputField}
              placeholder="Old Password"
              maxLength={15}
            />
            <GInput
              id={"newPassword"}
              value={formValues.newPassword}
              onInputChange={handleChange}
              variant="standard"
              type="password"
              disabled={!enableUsername}
              inputclassName={classNamees.inputField}
              placeholder="New Password"
              maxLength={15}
            />
          </div>
          <div className={classNamees.actions}></div>
        </div>
        <div className="text-center p-2 position-relative">
          {error && (
            <Typography className={classNamees.errorMsg}>{error}</Typography>
          )}
        </div>
        <div className="row">
          <div className="col-md-8">
            <GButton
              onClick={() => submitHandler()}
              label="Save"
              disabled={!enableSave}
              boxShadow
              isLong
            />
          </div>
          <div className="col-md-3">
            <div
              className={classNamees.actions}
              onClick={() => setEnableUsername(!enableUsername)}
            >
              <span
                className="btn px-4 py-1"
                style={{
                  color: !enableUsername ? "#fff" : "#dc3545",
                  background: !enableUsername ? "#dc3545" : "#fff",
                  borderRadius: "20px",
                  boxShadow: "0 3px 6px #00000036",
                }}
              >
                {" "}
                Edit Details
                <EditIcon
                  style={{
                    fill: !enableUsername ? "#fff" : "#dc3545",
                    marginLeft: "10px",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
