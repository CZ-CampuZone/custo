import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import Dress1 from "../../../Assests/images/dress1.jpg";
import Dress2 from "../../../Assests/images/dress2.jpg";
import Dress3 from "../../../Assests/images/dress3.jpg";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Update } from "../../../loader/Update";
import clsx from "clsx"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      backgroundColor: "#efefef",
      padding: "1rem",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      // justifyContent:"space-between"
    },
    card: {
      position: "relative",
      background: "#fff",
      padding: "1rem",
      marginBottom: "0.5rem",
      "& img": {
        maxWidth: "100%",
        height: "auto",
      },
      border:"10px solid transparent",

    },
    introHeader: {
      fontSize: "1.75rem !important",
      color: "#000",
      textTransform: "capitalize",
      textAlign: "center",
      paddingBottom: "1.5rem",
      background: "transparent",
      outline: 0,
      border: "none",
      width: "100%",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    imgText: {
      fontSize: "0.75rem",
      color: "#333",
      fontWeight: "200",
      padding: "0.75rem 0",
      textTransform: "capitalize",
      background: "transparent",
      outline: 0,
      border: "none",
    },
    rate: {
      background: "transparent",
      outline: 0,
      border: "none",
      fontSize: "0.85rem",
      color: "#000",
      fontWeight: "500",
    },
    addCard: {
      borderRadius: "1rem",
      position: "absolute",
      background: "#fff",
      padding: "1rem 2rem",
      top: "1rem",
      color:"#9e3a8ccc",
      cursor: "pointer",
      right: "1rem",
      boxShadow: "2px 2px 3px 0 #ccc",
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
      owlSlide:{
        ".owl-nav":{
          top:"16px"
        },
         "& .owl-nav.disabled":{
           display:"blockn",
  
         } 
      },
      "@media (max-width: 600px)": {
        owlSlide:{
          ".owl-nav":{
            top:"20px"
          },
      },
    },
  }
   
  })
);

export const Gallery2 =(props)=>{
    const classes = useStyles();
    const [loading, setloading] = useState(false);
    const ctx = useContext(AuthContext);

    const options = {
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplaySpeed: 2000,
        autoplayHoverPause: true,
       
        responsive: {
          0: {
            items: 1,
          },
          450: {
            items: 2,
          },
          750: {
            items: 3,
          },
          1200: {
            items: 4,
          },
        },
      };
      
      const cardData = {
        header: "New Arrivals",
        data: [
          {
            img: Dress1,
            id: "0",
          },
          {
            img: Dress2,
            id: "1",
          },
          {
            img: Dress3,
            id: "2",
          },
        ],
      };

      const [localData, setLocalData] = useState(
        ctx.websiteData[props.id] === undefined
          ? cardData
          : ctx.websiteData[props.id]
      );

      const [updatestatus, setUpdatestatus] = useState(false);
      const [card, setCard] = useState(localData.data);
      const onChange = (event) => {
        let val = event.target.value;
        setLocalData((prevState) => {
          return {
            ...prevState,
            [event.target.id]: val,
          };
        });
      };

      const onImageChange = (e, i) => {
        // setError(null);
        let selected = e.target.files[0];
        if (card[i].title === "") {
          alert("Image name cannot be Empty")
        }
        else {
          const storage = getStorage();
          const uploadPath = `images/${card[i].title + i}`;
          // upload path
          const storageRef = ref(storage, uploadPath); // create refernce to store data
          uploadBytes(storageRef, selected).then((snapshot) => {
            // console.log(snapshot);
            getDownloadURL(storageRef).then((url) => {
              setCard((prevState) => {
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
        }
    
      };

      const addCard = () => {
        let updatedData = {
          img: Dress1,
          title: "",
          rate: "",
          id: card.length,
        };
        setCard((prevState) => {
          return [...prevState, updatedData];
        });
      };
      const removeCard = (value) => {
        setCard((prevState) => {
          prevState = prevState.filter((item) => item.id !== value);
          return [...prevState];
        });
      };

      let editable =(
        <>
        {updatestatus === true && <Update />}

        <div className={classes.row}>
        {card.map((details, index) => (
          <div
            key={index}
            className={classes.card}
            style={{ width: "24%", marginRight: "1%" }}
          >
            <div
              onClick={() => removeCard(details.id)}
              style={{
                position: "absolute",
                background: "#fff",
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
            
          </div>
        ))}
      </div>
      <div className={classes.addCard} onClick={addCard}>
      <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
      </div>
        </>
      );

      const onSaveHandler = () => {
        setloading(true);
        let data = {
          header: localData.header,
          data: card,
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

    return(
        <>
        {ctx.isEditable ?(
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
      <div className={classes.root}>
        {ctx.isEditable ?(
            editable
        ):(
            <>
            <OwlCarousel className={clsx(classes.owlSlide,"owl-theme")} {...options}>
              {card.map((item, index) => (
                <div className={classes.card} key={index}>
                  <img src={item.img} alt={item.title} />
                  
                </div>
              ))}
            </OwlCarousel>
            </>
        )}
      </div>
        </>
    )
}