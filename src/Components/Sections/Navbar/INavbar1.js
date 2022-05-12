import React, { useContext, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import Loader from "../../../loader/Loader";
import HeaderLogo from "../../../Assests/images/headerlogo.png";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import Select from "react-select";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AuthContext from "../../../Context/Context";
import { Update } from "../../../loader/Update";

const useStyles = makeStyles(() =>
  createStyles({
    rootNav: {
      backgroundColor: "#fff",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
    },
    logoContainer: {
      width: "10%",
      position: "relative",
      "& img": {
        width: "100%",
        height: "3rem",
        objectFit: "contain",
      },
    },
    menuList: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      width: "65%",
    },
    menuItems: {
      fontItems: "0.9rem",
      color: "#000",

      textTransform: "uppercase",
      padding: "0.5rem 0.75rem",
      marginRight: "0.5rem",
    },
    inputHeader: {
      width: "100%",
      background: "none",
      border: 0,
      outline: 0,
      fontItems: "0.9rem",
    },
    inputFile: {
      width: 0,
      height: 0,
      opacity: 0,
      zIndex: "0",
    },
    inputLabel: {
      position: "absolute",
      background: "#fff",
      width: "2.5rem",
      height: "2.5rem",
      padding: "0.3rem",
      bottom: "0",
      right: "0",
      zIndex: 20,
      textAlign: "center",
      cursor: "pointer",
      "& i": {
        fontSize: "1.75rem",
      },
    },
    pathSelector: {
      padding: "1rem 0",
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      padding: "1rem",
      "& p": {
        fontSize: "1.2rem",
        width: "15%",
        textTransform: "uppercase",
        color: "#000",
      },
    },

    "@media (max-width: 600px)": {
      rootNav: {
        padding: "0",
        paddingLeft: "2px",
      },
      menuItem:{
        fontSize:"8px"
      }
    },
  })
);

 const INavbar1 = (props) => {
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  const headerData = {
    logo: HeaderLogo,
    menuItem: [
      {
        label: "home",
        path: "",
      },
      {
        label: "About",
        path: "",
      },
      {
        label: "Gallery",
        path: "",
      },
      {
        label: "Curriculam",
        path: "",
      },
      {
        label: "contact Us",
        path: "",
      },
    ],
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? headerData
      : ctx.websiteData[props.id]
  );
  const [updatestatus, setUpdatestatus] = useState(false);
  const [menuItem, setMenuItem] = useState(localData.menuItem);
  const rename = (name, i) => {
    let firstName = name.substring(0, name.length - 2);
    let lastName = name.charAt(name.length - 1);
    let newName = firstName + " " + lastName;
    return newName;
  };
  var PathArray = ctx.layoutFlow?.map(function (mopt) {
    var info = {
      value: mopt.uniqId,
      label: rename(mopt.uniqId),
    };
    return info;
  });
  const onImageChange = (e, i) => {
    // setError(null);

    let selected = e.target.files[0];

    if (!selected) {
      // setError("Please select file");
      return;
    }

    if (!selected.type.includes("image")) {
      // setError("Please select image file");
      return;
    }
    const storage = getStorage();
    const uploadPath = `images/headerLogo`; // upload path
    const storageRef = ref(storage, uploadPath); // create refernce to store data

    uploadBytes(storageRef, selected).then((snapshot) => {
      // console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
        setLocalData((prevState) => {
          return {
            ...prevState,
            logo: url,
          };
        });
      });
    });
    // setError(null);
  };
  const onChangeHandler = (e, details, index) => {
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    if (e.target) {
      tempEventInputs[e.target.name] = e.target.value;
    } else {
      tempEventInputs["path"] = e.value;
    }
    setMenuItem((prevState) => {
      prevState[index] = tempEventInputs;
      return [...prevState];
    });
  };
  const onSaveHandler = () => {
    setloading(true);
    let data = {
      logo: localData.logo,
      menuItem: menuItem,
    };
    ctx.updateData(data, props.id);
    setTimeout(() => {
      setloading(false);
      setUpdatestatus(true)
    }, 2000).then(
      setTimeout(() => {

        setUpdatestatus(false)
      }, 4000)
    )
  };
  console.log(menuItem);
  return (
    <>
      {ctx.isEditable ? (
        <div className="row py-3 justify-content-end">
          <button
            className="btn px-5"
            onClick={onSaveHandler}
            style={{
              background: "#9e3a8ccc",
              fontSize: "20px",
              color: "#fff",
              borderRadius: "20px",
              boxShadow: "0 3px 6px #00000036",
            }}
          >
            Save<i className="fa fa-save mx-2"></i>{" "}
          </button>
        </div>
      ) : (
        <></>
      )}
      {loading && <Loader />}

      {ctx.isEditable ? (
        <>
          {updatestatus === true && <Update />}
          <div className={classes.rootNav}>
            <div className={classes.logoContainer}>
              <input
                type="file"
                onChange={(e) => onImageChange(e)}
                className={classes.inputFile}
                id="logo"
                name="logo"
              />
              <label className={classes.inputLabel} htmlFor="logo">
                <i className="fa fa-upload"></i>
              </label>
              <img src={localData.logo} alt="headerLogo" />
            </div>
            <div className={classes.menuList}>
              {menuItem.map((item, index) => (
                <div className={classes.menuItems} key={index}>
                  <input
                    className={classes.inputHeader}
                    id="label"
                    name="label"
                    onChange={(e) => onChangeHandler(e, item, index)}
                    value={item.label}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.pathSelector}>
            {menuItem.map((item, index) => (
              <div className={classes.row} key={index}>
                <Typography>{item.label}</Typography>
                <Select
                  id="path"
                  name="path"
                  options={PathArray}
                  value={PathArray.filter(function (option) {
                    return option.value === item.path;
                  })}
                  onChange={(e) => onChangeHandler(e, item, index)}
                  styles={{ width: "20%" }}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={classes.rootNav}>
          <div className={classes.logoContainer}>
            <img src={localData.logo} alt="headerLogo" />
          </div>
          <div className={classes.menuList}>
            {menuItem.map((item, index) => (
              <HashLink to={`#${item.path}`} key={index}>
                <p className={classes.menuItems}>
                  {item.label}
                </p>
              </HashLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar1;
