import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import Cat1 from "../../../Assests/images/cat1.jpg";
import Cat2 from "../../../Assests/images/cat2.jpg";
import Cat3 from "../../../Assests/images/cat3.jpg";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Update } from "../../../loader/Update";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#fff",
      display: "flex",
      padding: "1rem",
      flexWrap: "wrap",
      position: "relative",
    },

    editable: {
      width: "100%",
      background: "transparent",
      outline: 0,
      border: "none",
      textAlign: "center",
    },
    addCard: {
      fontSize: "25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "1rem",
      background: "#fff",
      cursor: "pointer",
      color:"#9e3a8ccc",
      position: "relative",
      width: "33.33%",
      padding: "1rem",
      boxShadow: "2px 2px 2px 3px #ccc",
    },
    card: {
      position: "relative",
      width: "33.33%",
      padding: "1rem",
      "& img": {
        width: "100%",
        height: "auto",
        objectFit: "cover",
      },
    },

    overlay: {
      position: "absolute",
      display: "flex",
      flexWrap: "wrap",
      width: "85%",
      height: "fit-content",
      margin: "auto",
      left: 0,
      right: 0,
      bottom: "2rem",
      padding: "2rem",
      background: "#fff",
      "& h6": {
        color: "#000",
        textTransform: "uppercase",
        textAlign: "center",
        width: "100%",
        paddingBottom: "0.5rem",
      },
      "& p": {
        color: "#ccc",
        width: "100%",
        textAlign: "center",
      },
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
      top: "0",
      right: "0",
      zIndex: 20,
      textAlign: "center",
      cursor: "pointer",
      "& i": {
        fontSize: "1.75rem",
      },
    },
    "@media (max-width: 900px)": {
      card: {
        width: "50%",
      },
    },
    "@media (max-width: 600px)": {
      card: {
        width: "100%",
      },
    },
  })
);

export const Card1 = (props) => {
  console.log(props.id);
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const ctx = useContext(AuthContext);
  const cardData = [
    {
      img: Cat1,
      title: "Casual Dresses",
      count: "1",
      id: "0",
    },
    {
      img: Cat2,
      title: "Evening Dresses",
      count: "1",
      id: "1",
    },
    {
      img: Cat3,
      title: "Summer Dresses",
      count: "1",
      id: "2",
    },
  ];
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
  );
  const onChangeHandler = (e, details, index) => {
    setLocalData((prevState) => {
      let updatedData = null;
      if (e.target.id === "title") {
        updatedData = {
          ...details,
          title: e.target.value,
        };
      } else {
        updatedData = {
          ...details,
          count: e.target.value,
        };
      }
      prevState[index] = updatedData;
      return [...prevState];
    });
  };
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
    const uploadPath = `images/${localData[i].title + localData[i].id}`; // upload path
    const storageRef = ref(storage, uploadPath); // create refernce to store data

    uploadBytes(storageRef, selected).then((snapshot) => {
      // console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
        setLocalData((prevState) => {
          let updatedData = null;
          updatedData = {
            ...prevState[i],
            img: url,
          };
          prevState[i] = updatedData;
          return [...prevState];
        });
      });
    });
    // setError(null);
  };
  const addCard = () => {
    let updatedData = {
      img: Cat1,
      title: "",
      count: "",
      id: localData.length,
    };
    setLocalData((prevState) => {
      return [...prevState, updatedData];
    });
  };
  const removeCard = (value) => {
    setLocalData((prevState) => {
      prevState = prevState.filter((item) => item.id !== value);
      return [...prevState];
    });
  };
  let editable = (
    <div className="container">
      {updatestatus === true && <Update />}

      {localData?.map((details, index) => (
        <div className={classes.card} key={index}>
          <div
            onClick={() => removeCard(details.id)}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: 20,
              cursor: "pointer",
            }}
          >
            <DeleteIcon
              style={{
                width: "2rem",
                height: "2rem",
                fill: "#dc3545",
                padding: "5px",
              }}
            />
          </div>
          <input
            type="file"
            onChange={(e) => onImageChange(e, index)}
            className={classes.inputFile}
            id={details.id}
            name={details.title}
          />
          <label className={classes.inputLabel} htmlFor={details.id}>
            <i className="fa fa-upload"></i>
          </label>

          <img src={details.img} alt={details.title} />
          <div className={classes.overlay}>
            <input
              onChange={(e) => onChangeHandler(e, details, index)}
              className={classes.editable}
              id="title"
              placeholder="title"
              value={details.title}
            />
            <input
              onChange={(e) => onChangeHandler(e, details, index)}
              className={classes.editable}
              id="count"
              placeholder="count"
              value={details.count}
            />
          </div>
        </div>
      ))}
      <div className={classes.addCard} onClick={addCard}>
        <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
      </div>
    </div>
  );
  const onSaveHandler = () => {
    setloading(true);
    ctx.updateData(localData, props.id);
    setTimeout(() => {
      setloading(false);
      setUpdatestatus(true)
    }, 2000).then(
      setTimeout(() => {

        setUpdatestatus(false)
      }, 4000)
    )
  };

  return (
    <>

      {ctx.isEditable ? (
        <div className="row py-3 justify-content-end">
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
        </div>
      ) : (
        <></>
      )}
      {loading && (
        <>
          <Loader />
        </>
      )}

      {ctx.isEditable ? (
        editable
      ) : (
        <div className={classes.root}>
          {localData.map((item, index) => (
            <div className={classes.card} key={index}>
              <img src={item.img} alt={item.title} />
              <div className={classes.overlay}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1">{item.count}&ensp;items</Typography>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
