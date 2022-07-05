import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import OwlCarousel from "react-owl-carousel";
import AuthContext from "../../../Context/Context";
import Loader from "../../../loader/Loader";
import clsx from "clsx";
import Cat2 from "../../../Assests/images/cat2.jpg";
import Cat1 from "../../../Assests/images/cat1.jpg";

import { Update } from "../../../loader/Update";
import { db } from "../../../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() =>
  createStyles({
    btnSubmit: {
      borderRadius: "20px",
      border: "1px solid #e6983f",
      backgroundColor: "#e6983f",
      color: "#ffffff",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "12px 45px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      transition: "transform 80ms ease-in",
      cursor: "pointer",
      "&:focus": {
        opacity: "0.7",
      },
    },
    inputForm: {
      backgroundColor: "#eee",
      border: "none",
      padding: "12px 15px",
      margin: " 8px 0",
      width: "100%",
      fontSize: "0.8rem",
      "&:focus": { outline: "1px solid #e6983f" },
    },
    editableHeader: {
      width: "100%",
      fontSize: "25px",
      textAlign: "center",
      color: "red",
      background: "transparent",
      outline: "0",
      border: "none",
      marginBottom: "10px",
    },
    editable: {
      width: "100%",
      textAlign: "center",
      color: "black",
      background: "transparent",
      outline: "0",
      border: "none",
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
      col: {
        width: "100%",
      },
    },
  })
);

export const Form2 = (props) => {
  const [loading, setloading] = useState(false);
  const [updatestatus, setUpdatestatus] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "",
    id: 0,
  });
  const onChange = (event) => {
    let val = event.target.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val,
      };
    });
  };
 
  function formHandler(e) {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message === ""
    ) {
      toast.warn("Fill the required fields");
    } else {
      let d = new Date();
      let newContent = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        company: formData.company,
        id: d.getTime(),
      };
      updateDoc(doc(db, "formdata", ctx.userId), {
        message: arrayUnion(newContent),
      }).then((res) => {
        toast.success("Successfully Submited");
      });
    }
  }
  const ctx = useContext(AuthContext);
  const data = [
    {
      header: "layatex",
      para: "Fixyman is proud to be the name that nearly 1 million homeowners have trusted since 1996 for home improvement and repair,providing virtually any home rep.",
      address: "Intro header 1 Vel Nagar, Aavadi",
      contact: "l472487229",
      email: "loerum@gmail.com",
      img1: Cat1,
      img2: Cat2,
    },
  ];

  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined ? data : ctx.websiteData[props.id]
  );

  const onChangeHandler = (e, details, index) => {
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    if (e.target) {
      tempEventInputs[e.target.id] = e.target.value;
    }
    setLocalData((prevState) => {
      prevState[index] = tempEventInputs;
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
    const uploadPath = `images/${
      localData[i].title + localData[i].id + e.target.name
    }`; // upload path
    const storageRef = ref(storage, uploadPath); // create refernce to store data

    uploadBytes(storageRef, selected).then((snapshot) => {
      // console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
        setLocalData((prevState) => {
          let updatedData = null;
          updatedData = {
            ...prevState[i],
            img1: url,
          };

          prevState[i] = updatedData;
          return [...prevState];
        });
      });
    });
    // setError(null);
  };
  const onImgChange = (e, i) => {
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
            img2: url,
          };

          prevState[i] = updatedData;
          return [...prevState];
        });
      });
    });
    // setError(null);
  };
  const classes = useStyles();
  let editable = (
    <>
      {updatestatus === true && <Update />}
      <div
        class="rounded mx-auto col-lg-7 col-md-10 row my-3 p-0"
        style={{
          boxShadow:
            "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
        }}
      >
        <div
          class="left-container  col-md-6 p-0 d-flex justify-content-center align-items-center  text-white"
          style={{ backgroundColor: "#e6983f" }}
        >
          <div class="text-center p-2" style={{ lineHeight: "22px" }}>
            <h2>Let's Chat</h2>
            <p style={{ fontSize: "0.9rem" }}>
              Whether you have a question, want to start a project or simply
              want to connect.
            </p>
            <br />
            <p style={{ fontSize: "0.9rem" }}>
              Feel free to send me a message in the contact form
            </p>
          </div>
        </div>
        <div class="right-container col-md-6 p-0  d-flex justify-content-center align-items-center bg-white">
          <div class="text-center p-3">
            <form action="#">
              <h2 class="lg-view">Enquiry Form</h2>

              <input
                type="text"
                placeholder="Name *"
                onChange={(e) => onChange(e)}
                name="name"
                className={classes.inputForm}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                onChange={(e) => onChange(e)}
                className={classes.inputForm}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                onChange={(e) => onChange(e)}
                className={classes.inputForm}
              />
              <input
                type="phone"
                name="phone"
                placeholder="Phone"
                onChange={(e) => onChange(e)}
                className={classes.inputForm}
              />
              <textarea
                rows="4"
                name="message"
                placeholder="Message"
                onChange={(e) => onChange(e)}
                className={classes.inputForm}
              ></textarea>
              <button
                className={classes.btnSubmit}
                onClick={(e) => formHandler(e)}
              >
                Submit
              </button>
            </form>
          </div>
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
        <>
          <ToastContainer />
          <div
            class="rounded mx-auto col-lg-7 col-md-10 row my-3 p-0"
            style={{
              boxShadow:
                "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
            }}
          >
            <div
              class="left-container  col-md-6 p-0 d-flex justify-content-center align-items-center  text-white"
              style={{ backgroundColor: "#e6983f" }}
            >
              <div class="text-center p-2" style={{ lineHeight: "22px" }}>
                <h2>Let's Chat</h2>
                <p style={{ fontSize: "0.9rem" }}>
                  Whether you have a question, want to start a project or simply
                  want to connect.
                </p>
                <br />
                <p style={{ fontSize: "0.9rem" }}>
                  Feel free to send me a message in the contact form
                </p>
              </div>
            </div>
            <div class="right-container col-md-6 p-0  d-flex justify-content-center align-items-center bg-white">
              <div class="text-center p-3">
                <form action="#">
                  <h2 class="lg-view">Enquiry Form</h2>

                  <input
                    type="text"
                    placeholder="Name *"
                    onChange={(e) => onChange(e)}
                    name="name"
                    className={classes.inputForm}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    onChange={(e) => onChange(e)}
                    className={classes.inputForm}
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    onChange={(e) => onChange(e)}
                    className={classes.inputForm}
                  />
                  <input
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={(e) => onChange(e)}
                    className={classes.inputForm}
                  />
                  <textarea
                    rows="4"
                    name="message"
                    placeholder="Message"
                    onChange={(e) => onChange(e)}
                    className={classes.inputForm}
                  ></textarea>
                  <button
                    className={classes.btnSubmit}
                    onClick={(e) => formHandler(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Form2;
