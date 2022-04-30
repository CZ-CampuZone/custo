import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import BannerImage1 from "../../../Assests/images/banner1.jpg";
import BannerImage2 from "../../../Assests/images/banner2.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import "./Hero2.css"
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const useStyles = makeStyles(() =>
    createStyles({

        addCard: {
            borderRadius: "1rem",
            position: "absolute",
            background: "#fff",
            padding: "1rem 2rem",
            cursor: "pointer",
            top: "1rem",
            right: "1rem",
            boxShadow: "2px 2px 3px 0 #ccc",
        },


        introHeader: {

            background: "transparent",
            outline: 0,
            border: "none",
            // fontSize: "1.5rem !important",

            width: "100%",
            height: "fit-content",

            fontSize: "40px",

        },
        introText: {

            background: "transparent",
            outline: 0,
            border: "none",
            fontSize: "1rem !important",
            height: "fit-content",

            width: "100%",

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
        "@media (max-width: 600px)": {
            introText: {
                fontSize: "12px !important",
            },
            introHeader: {
                fontSize: "20px !important",
            },

        },
    })
);
export const Hero2 = (props) => {
    const ctx = useContext(AuthContext);
    const classes = useStyles()
    const [loading, setloading] = useState(false);
    const data = [
        {
            img: BannerImage1,
            header: "Intro header 1",
            para: "loerum ipsum is a dummy language for website content writing",
            id: "0",
        },
        {
            img: BannerImage2,
            header: "Intro header 2",
            para: "loerum ipsum is a dummy language for website content writing and adiitonal purposes",
            id: "1",
        },
    ]
    const [localData, setLocalData] = useState(
        ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
    );
    const options = {
        loop: true,
        margin: 0,
        dots: false,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 3000,
        autoplayHoverPause: false,
        items: 1,
        touchDrag: false,
    };
    const onChangeHandler = (e, details, index) => {
        setLocalData((prevState) => {
            let updatedData = null;
            if (e.target.id === "header") {
                updatedData = {
                    ...details,
                    header: e.target.value,
                };
            } else {
                updatedData = {
                    ...details,
                    para: e.target.value,
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
        const uploadPath = `images/${localData[i].header + localData[i].id}`; // upload path
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
            img: BannerImage1,
            header: "",
            para: "",
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
        <>
            <div className="position-relative">
                {localData?.map((details, index) => (
                    <>
 
                        <div key={index} class="d-sm-flex my-2 position-relative align-items-center justify-content-between w-100" style={{ height: "100vh" }}>
                           
                            <input
                                type="file"
                                onChange={(e) => onImageChange(e, index)}
                                className={classes.inputFile}
                                id={details.id}
                                name={details.header}
                            />
                            <label className={classes.inputLabel} htmlFor={details.id}>
                                <i className="fa fa-upload"></i>
                            </label>
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
                            <div class="col-md-4 mx-auto p-0 mb-4 mb-sm-0 headline">

                                <input
                                    onChange={(e) => onChangeHandler(e, details, index)}
                                    className={clsx(classes.introHeader, "display-4 my-4 font-weight-bold")}
                                    id="header"
                                    placeholder="Header"
                                    value={details.header}
                                    style={{ width: "75%" }}
                                />

                                <textarea
                                    onChange={(e) => onChangeHandler(e, details, index)}
                                    className={clsx(classes.introText, "text-secondary text-uppercase mb-3 ")}
                                    id="para"
                                    placeholder="text"
                                    value={details.para}
                                    style={{ width: "75%" }}
                                />
                                <a href="#" class="btn px-5 mt-3 py-3 text-white mt-3 mt-sm-0" style={{ borderRadius: "30px", backgroundColor: "#9B5DE5" }}>Get Started</a>
                            </div>



                            <div class="col-md-8 h-100 clipped" style={{ minHeight: "350px", backgroundImage: `url(${details.img})`, backgroundPosition: "center", backgroundSize: "cover" }}>

                            </div>
                        </div>
                    </>

                ))}
                <div className={classes.addCard} onClick={addCard}>
                    Add Card
                </div>

            </div>


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
                                background: "#9e3a8ccc",
                                fontSize: "20px",
                                color: "white",
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

                <OwlCarousel className="owl-theme" {...options} aut>
                    {localData.map((item, index) => (
                        <div key={index} class="d-sm-flex align-items-center justify-content-between w-100" style={{ height: "100vh" }}>
                            <div class="col-md-4 mx-auto p-0 mb-4 mb-sm-0 headline">
                                <h1 class="display-4 my-4 font-weight-bold">{item.header} </h1>
                                <p class="text-secondary text-uppercase mb-3 ">{item.para}</p>
                                <a href="#" class="btn px-5 mt-3 py-3 text-white mt-3 mt-sm-0" style={{ borderRadius: "30px", backgroundColor: "#9B5DE5" }}>Get Started</a>
                            </div>

                            <div class="col-md-8 h-100 clipped" style={{ minHeight: "350px", backgroundImage: `url(${item.img})`, backgroundPosition: "center", backgroundSize: "cover" }}>

                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            )}

        </>
    );
}
