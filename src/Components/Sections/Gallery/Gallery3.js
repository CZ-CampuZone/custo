import React, { useContext, useState } from "react";
import AuthContext from "../../../Context/Context";
import styles from "./Gallery.module.css";
import Loader from "../../../loader/Loader";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Gallery from "../../../Assests/diviImages/gallery.jpg";
import { ReactComponent as DeleteIcon } from "../../../Assests/delete.svg";
import { Update } from "../../../loader/Update";

const Gallery3 = (props) => {
  const ctx = useContext(AuthContext);
  const [updatestatus, setUpdatestatus] = useState(false);
  const [loading, setloading] = useState(false);

  const cardData = {
    header: "Gallery",
    data: [
      {
        name: "Image Name",
        img: Gallery,
        id: 0,
      },
      {
        name: "Image Name",
        img: Gallery,
        id: 1,
      },
      {
        name: "Image Name",
        img: Gallery,
        id: 2,
      },
    ],
  };
  const [localData, setLocalData] = useState(
    ctx.websiteData[props.id] === undefined
      ? cardData
      : ctx.websiteData[props.id]
  );
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

  const onChangeHandler = (e, details, index) => {
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    if (e.target) {
      tempEventInputs[e.target.name] = e.target.value;
    } else {
      tempEventInputs["path"] = e.value;
    }
    setCard((prevState) => {
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
    const uploadPath = `images/${card[i].title}`; // upload path
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
    // setError(null);
  };
  const addCard = () => {
    let updatedData = {
      name: "Image Name",
      img: Gallery,
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
  let editable = (
    <>
    {updatestatus === true && <Update />}
    <section id="#Gallery" className="position-relative">
      <div className={styles.galleryheading}>
        <input
          className={styles.inputHeader}
          placeholder="Header"
          id="header"
          onChange={onChange}
          value={localData.header}
        />
      </div>
      <div className={styles.gallery}>
        {card.map((details, index) => (
          <div key={index}>
            <div className={`position-relative w-100 ${styles.uploadImage}`}>
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
                className={styles.fileType}
                id={details.name + index}
                name={index}
              />
              <label
                className={styles.fileLabel}
                htmlFor={details.name + index}
              >
                <i className="fa fa-upload fa-3x"></i>
              </label>
              <img
                src={details.img}
                className="position-relative"
                alt="preview"
                style={{ zIndex: "2" }}
              />
            </div>
            <input
              type="text"
              onChange={(e) => onChangeHandler(e, details, index)}
              className={styles.inputPara}
              placeholder="title"
              id="name"
              name="name"
              value={details.name}
            />
          </div>
        ))}

        <div className={styles.addCard} onClick={addCard}>
          <i class="fa fa-plus-circle mx-2" aria-hidden="true"></i> Add Card
        </div>
      </div>
    </section>
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
  return (
    <>
      {ctx.isEditable ? (
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
        <section id="#Gallery">
          <div className={styles.galleryheading}>
            <h2 className="">{localData.header}</h2>
          </div>
          <div className={styles.gallery}>
            {card.map((details, index) => (
              <a href="#" className="gal" key={index}>
                <div className={styles.gal_wrapper}>
                  <div className={styles.hidden_cover}></div>
                  <img src={details.img} alt={details.name} />
                  <h4>{details.name}</h4>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Gallery3;
