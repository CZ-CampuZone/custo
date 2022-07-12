import Marquee from "react-easy-marquee";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../../Context/Context";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Loader from "../../../loader/Loader";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  Checkbox,
} from "@mui/material";

import NewspaperIcon from "@mui/icons-material/Newspaper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  modalWidth: {},
  textPara: {
    fontWeight: "500",
    cursor: "pointer",
    color: "#777",
    fill: "#777",
    display: "inline",
    "&:hover": {
      fill: "#b500b2",
      color: "#b500b2",
    },
  },
  tickerBox: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    backgroundImage:
    "linear-gradient(to right top, #443899, #643393, #7d2d8b, #902882, #a02577)",
    borderBottomLeftRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  btndec: {
    border: "1px solid #6E3666",
  },
  iconAd:{
    marginTop:"10px"
  }
}));

export const Ticker1 = (props) => {
  const classes = useStyles();
  const ctx = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);

  const newsData = [
    {
      para: " Quality education in the early years of preschool sets a firm  foundation in the overall development of a child.",
      id: 1,
    },
  ];
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? newsData
      : ctx.websiteData[props.id]
  );

  const[newsUpdate, setnewsUpdate] = useState();

  const addCard = () => {
    let updatedData = { 
      para: newsUpdate,
      id: localData.length,
    };
    setLocalData((prevState) => {
      return [...prevState, updatedData];
    }); 
    setnewsUpdate("")


  };

  const removeCard = (value) => {
    setLocalData((prevState) => {
      prevState = prevState.filter((item) => item.id !== value);
      return [...prevState];
    });
  };



  let editable = (
    <>
      <div className="container">
        <div>
          <button onClick={addCard} type="button" class={clsx(classes.btndec, "btn btn-light")}>
            Add news
          </button>
        </div>
        <div>
          
            <>
              <form className="mt-4" >
                <div class="form-row">
                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Put news here!!"
                      id=""
                      value={newsUpdate}
                      onChange={(e)=>setnewsUpdate(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </>
      
        </div>
        <div className="mt-4">
          <ul class="list-group list-group-flush">
            {localData.map((data,index)=>(
              <>
              <li class="list-group-item list-group-item-action">
              {data.para} <RemoveCircleIcon onClick={()=>removeCard(data.id)} className="float-right"  />
            </li>
              </>
            ))}
            
          
          </ul>
        </div>
      </div>
    </>
  );

  const onSaveHandler = () => {
    setloading(true);
    ctx.updateData(localData, props.id);
    setTimeout(() => {
      setloading(false);
      setUpdatestatus(true);
    }, 2000).then(
      setTimeout(() => {
        setUpdatestatus(false);
      }, 4000)
    );
  };

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
      {loading && (
        <>
          <Loader />
        </>
      )}
      {ctx.isEditable ? (
        editable
      ) : (
        <>
          <ThemeProvider theme={theme}>
            {/* <div className="">
          <div
            className={clsx(
             
              "shadow rounded positon-relative w-75  p-3"
            )}
          >
            <XIcon
              className="m-2"
              style={{
                width: "0.8rem",
                height: "0.8rem",
                fill: "#777",
                position: "absolute",
                right: "1.25rem",
                top: "1.25rem",
                cursor: "pointer",
              }}
              onClick=""
            />
            <div className="p-2 pb-3  mb-3 border-bottom">
              <h4
                className="text-center"
                style={{ color: "#b500b2", textDecoration: "underline" }}
              >
                {" "}
                <AssignmentTurnedInIcon className="mb-1" />
                Add / Remove News
              </h4>

              <div className="row m-0 shadow rounded p-2 ">
                <div className="col-1 d-flex align-items-center justify-content-center">
                  <button
                    className="btn text-white px-3"
                    style={{ background: "#b500b2" }}
                    onClick=""
                  >
                    Add
                  </button>
                </div>
                <div className="col">
                  <input
                    placeholder=" Add News.."
                    className="w-100 form-control border-0"
                    onChange=""
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between px-4">
              <div>
                <h4 className="mx-2 d-inline">News Lists</h4>

                <Badge
                  badgeContent=""
                  color="primary"
                  className="mb-1"
                >
                  <NewspaperIcon color="action" />
                </Badge>
              </div>
              <div>
                <input
                  type=""
                  className="form-control "
                  id="filternews"
                  onChange=""
                  style={{ zIndex: "999999" }}
                />
              </div>
              <div>
                <FormGroup className="d-inline">
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="allselect"
                        onChange=""
                        // checked={newsData.map(
                        //   (data) => data.ischecked === true
                        // )}
                      />
                    }
                    label="Select all"
                  />
                </FormGroup>

                <DeleteSweepIcon
                  className={classes.textPara}
                  onClick=""
                />
              </div>
            </div>

            <div
              style={{
                height: "300px",
                overflowY: "scroll",
              }}
            >
                <div key="">
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AssignmentTurnedInIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        style={{ overflowWrap: "break-word" }}
                        primary=""
                        secondary=""
                      ></ListItemText>
                      <ListItemAvatar>
                        <Checkbox
                          name=""
                          id=""
                          // checked={data.ischecked || false}
                          onChange="{checkedChange}"
                          className={classes.textPara}
                          style={{
                            width: "1.2rem",

                            height: "1.2rem",
                          }}
                        />
                      </ListItemAvatar>
                    </ListItem>
                  </List>
                </div>
             
            </div>
          </div>
        </div> */}

            {/* <small
        className={classes.textPara}
        onClick=""
      >
        <EditIcon className="mb-1" style={{ fontSize: "17px" }} /> Add / Remove
        News{" "}
      </small> */}
            <div className="d-flex mb-2">
              <div
                className={clsx(
                  classes.tickerBox,
                  "col-1 p-0 d-flex   justify-content-center align-items-center"
                )}
              >
                <h6 className="text-white mb-0">
                  {" "}
                  <AssignmentTurnedInIcon className={classes.iconAd} />
                  News
                </h6>
              </div>
              <div className="col p-0 ">
                <Marquee
                  reverse={true}
                  duration={20000}
                  height="3rem"
                  pauseOnHover={true}
                  className=" bg-white"
                >
                  {localData.map((data, index) => (<>
                  <p key={index}>{data.para}</p>
                  </>))}
                </Marquee>
              </div>
            </div>
          </ThemeProvider>
        </>
      )}
    </>
  );
};
