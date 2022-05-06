import { useState, useContext } from "react";
import AuthContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import Loader from "../../loader/Loader";
import { setDoc, doc } from "firebase/firestore";
import Logo from "../../Assests/fickle1.png";
import { setUserId } from "firebase/analytics";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Bgicon1 } from "../../Assests/xd1.svg";
import { ReactComponent as Bgicon2 } from "../../Assests/xd2.svg";
// import { ReactComponent as Bgicon3 } from "../../Assests/xd3.svg";
import { ReactComponent as Bgicon3 } from "../../Assests/xd4.svg";
const useStyles = makeStyles({
  Bgicon1: {
    position: "fixed",
    top: "33%",
    left: "9%"
  },
  Bgicon2: {

    top: "-10%",
    left: "67%",
    position: "fixed",
  },
  Bgicon3: {
    position: "fixed",
    bottom: "-8%",
    left: "-8%",

  },

  Bgicon4: {
    position: "fixed",
    right: "37%",
    bottom: "3%",
    zoom: "0.6",
  },
  Bgicon5: {
    position: "fixed",
    right: "5%",
    bottom: "27%",
  },

  "@media (max-width: 1200px)": {
    Bg2: {
      left: "-73% "
    }
  }

});
const Signup = (props) => {
  const classes = useStyles();
  const ctx = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [uid, setUid] = useState();
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
    websitename: "",
    // companyname: "",
    phoneno: "",
  });
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const titleCase = (str) => {
    return str
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setloading(true);
    if (userCred.email === "") {
      setError("Enter Email");
      setloading(false);
    } else if (userCred.password === "") {
      setError("Enter Password");
      setloading(false);
    } else if (userCred.password !== userCred.confirmpassword) {
      setError("password and confirm password not match");
      setloading(false);
    } else if (
      userCred.username === "" ||
      userCred.websitename === "" ||
      userCred.phoneno === ""
    ) {
      setError("please enter the remaining fields");
      setloading(false);
    } else {
      createUserWithEmailAndPassword(auth, userCred.email, userCred.password)
        .then((res) => {
          var user = auth.currentUser;
          console.log("success", user.uid);
          setDoc(doc(db, "users", user.uid), {
            username: userCred.username,
            email: userCred.email,
            phoneno: userCred.phoneno,
            websitename: userCred.websitename,
            password: userCred.password,
          })
          setDoc(doc(db, "layout", user.uid), {
            layout: []
          });
          setDoc(doc(db, "websitedata", user.uid), {
            websiteData: {}
          });
          setTimeout(() => {
            navigate("/login");
            alert("sucessfully registered");
            setloading(false);
          }, 3000);
          console.log(uid);
        })
        .catch((error) => {
          setloading(false);
          const errorCode = error.code;
          console.log(errorCode, error);
          const message = errorCode.substring(5);
          setError(titleCase(message));
        });
    }
  };
  const onChangeHandler = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setUserCred((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val,
      };
    });
  };
  return (
    <>
      {loading && (
        <>
          <Loader />
        </>
      )}



      <div className=" Login-Edit overlay" style={{ height: "100vh" }}>
        <Bgicon1 className={classes.Bgicon1} />

        <Bgicon1 className={classes.Bgicon2} />
        {/* <Bgicon2 className={classes.Bgicon2} /> */}

        <Bgicon3 className={classes.Bgicon3} />
        <Bgicon3 className={classes.Bgicon4} />
        <Bgicon3 className={classes.Bgicon5} />

        <nav class="navbar navbar-expand-lg navbar-light  headercol ">
          <a class="navbar-brand position-relative" href="#">
            <img
              style={{ width: "8%" }}
              className="img-thumbnail d-inline"
              src={Logo}

              alt=""
            />

            <h2 style={{ top: "0", bottom: "0", left: "0", right: "0"}} className=" mt-2 text-white position-absolute   Login-name text-center" >Fickle</h2>


          </a>

        </nav>



        {/* // <div class=" shadow position-absolute" style={{ zIndex: "999999999", left: "0", right: "0", top: "0", bottom: "0" }} > */}
        <div className="row">
          <div className="col-md-5 marg">
            <div className="col-md-7 m-auto">
              <h2 className="content text-center">
                Your<br /> Business<br />  At<br />  Your<br />  Fingertips
              </h2>
              {/* <p className="align-top pcolor mt-3">
            Create the perfect palette or get inspired by thousands of
            beautiful color schemes.
          </p> */}
              {/* <button onClick={() => { setModalstate(true) }} type="button" href="#myModal" class="btn px-4 btntclr mt-3" data-toggle="modal">
              Login
            </button> */}
            </div>

          </div>
          <div className="col-md-7  mt-5 ">
            <div className="shadow">
              <div class="mt-4 modal-signup" style={{ maxWidth: "562px" }}>
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Hello Buddy!</h4>
                    {/* <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={() => { setModalstate(false) }}
                  >
                    &times;
                  </button> */}
                  </div>
                  <div class="modal-body">
                    <form
                      action="/examples/actions/confirmation.php"
                      method="post"
                    >
                      <div className="row">
                        <div className="form-group col-sm-6 ">

                          <input
                            type="text"
                            name="username"
                            required="required"
                            maxlength="12"
                            autocomplete="off"
                            className="form-control"
                            value={userCred.username}
                            id="Inputusername"
                            placeholder="Username"
                            onChange={onChangeHandler}

                          />

                        </div>
                        <div className="form-group col-sm-6">

                          <input
                            type="text"
                            name="websitename"
                            required="required"
                            className="form-control"
                            value={userCred.websitename}
                            autocomplete="off"
                            id="exampleInputschoolname"
                            placeholder="Website Name"
                            onChange={onChangeHandler}

                          />

                        </div>
                        <div className="form-group col-sm-6">

                          <input
                            type="email"
                            name="email"
                            required="required"
                            value={userCred.email}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            autocomplete="off"
                            onChange={onChangeHandler}

                          />

                        </div>

                        <div className="form-group col-sm-6">

                          <input
                            type="number"
                            name="phoneno"
                            maxlength="10"
                            required="required"
                            className="form-control"
                            value={userCred.phoneno}
                            id="exampleInputschoolname"
                            placeholder="PhoneNo"
                            autocomplete="off"
                            onChange={onChangeHandler}
                          // ref={passwordRef}
                          // onChange={(e) => setPassword(e.target.valve)}
                          />
                          {/* <p className="errorMsg">{passwordError}</p> */}
                        </div>
                        <div className="form-group col-sm-6 ">

                          <input
                            type="password"
                            name="password"
                            required="required"
                            className="form-control"
                            value={userCred.password}
                            id="InputPassword1"
                            placeholder="Password"
                            onChange={onChangeHandler}
                            autocomplete="off"
                          />

                        </div>
                        <div className="form-group col-sm-6 ">

                          <input
                            autocomplete="off"
                            type="password"
                            name="confirmpassword"
                            required="required"
                            className="form-control"
                            value={userCred.confirmpassword}
                            id="exampleInputPassword1"
                            placeholder="Confirm Password"
                            onChange={onChangeHandler}

                          />

                        </div>

                        {error && (
                          <small className="text-danger text-right d-block pt-2">
                            {error}
                          </small>
                        )}
                      </div>
                    
                      <div class="form-group  text-center">
                        <button
                          onClick={handleSignup}
                          type="submit"
                          style={{
                            
                            fontSize:"20px",
                            color: "#fff",
                            borderRadius: "20px",
                            boxShadow: "0 3px 6px #00000036",
                          }}
                          class="btn mt-3 px-5 btntclr "
                        >
                          Register Now
                        </button>
                      </div>
                    </form>
                  </div>
               
                </div>
              </div>
            </div>
            {/* <img src="https://s3-alpha.figma.com/hub/file/314494079/976a59d3-cf17-4dcc-a3d8-6651da344ee4-cover" /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
