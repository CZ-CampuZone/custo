
import React, { useContext, useState } from "react";
import styles from "./Footer.module.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import { createStyles, makeStyles } from "@mui/styles";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#555",
    },
    editable: {
      textAlign:"center",
      color:"white",
      background: "transparent",
      outline: "0",
      border: "none",
    },
    
   
    "@media (max-width: 600px)": {
      col: {
        width: "100%",
      },
    },
  })
);

const Footer1 = (props) => {
  const classes= useStyles();
  const [loading, setloading] = useState(false);
  const ctx = useContext(AuthContext);
  const data = 
    {
    
     header: "Copyrights©Divicare",
    }
  
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
  );
  const onChangeHandler = (event) => {
    let val = event.target.value;
    setLocalData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val,
      };
    });
  };
  
  let editable = (
    <>
      <input
        onChange={(e) => onChangeHandler(e)}
        className={classes.editable}
        id="header"
        placeholder="header"
        value={localData.header}
        style={{ width: "75%", fontSize: "30px" }}
      />
    </>
  );
  const onSaveHandler = () => {
    setloading(true);
    ctx.updateData(localData, props.id);
    setTimeout(() => {
      setloading(false);
    }, 2000);
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
                background: "#fff",
                fontSize: "20px",
                color: "#dc3545",
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
      <footer>
        <div className={styles.ftcol}>
          {ctx.isEditable ? (

            editable
          ) : (<>
            <h2>{data.header}</h2>
          </>
          )}

        </div>
      </footer >
    </>
  );
};

export default Footer1;
