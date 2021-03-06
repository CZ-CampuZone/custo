import { useState, useContext } from "react";
import AuthContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import Loader from "../../loader/Loader";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Bgicon1 } from "../../Assests/xd1.svg";
import { ReactComponent as Bgicon2 } from "../../Assests/xd2.svg";
// import { ReactComponent as Bgicon3 } from "../../Assests/xd3.svg";
import { ReactComponent as Bgicon3 } from "../../Assests/xd4.svg";
import Logo from "../../Assests/fickle1.png";
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
    right: "33%",
    bottom: "6%",
    zoom: "0.6",
    transform: "rotate(204deg)",
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
const Login = (props) => {
  const classes = useStyles();
  const ctx = useContext(AuthContext);
  // const [modalstate, setModalstate] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState("");
  const [forgotPassword, setForgotpassword] = useState(false);
  const navigate = useNavigate();
  const titleCase = (str) => {
    return str
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  onAuthStateChanged(auth, (currentuser) => {
    setUser(currentuser);
  });
  function resetHanler(e) {
    e.preventDefault();
    setloading(true);
    if (userCred.email === "") {
      setError("Enter Email");
      setloading(false);
    }
    else {
      sendPasswordResetEmail(auth, userCred.email)
        .then(() => {
          alert("verificaton email was sent")
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
          const errorCode = error.code;
          const message = errorCode.substring(5);
          setError(titleCase(message));
        });

    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    setloading(true);
    if (userCred.email === "") {
      setError("Enter Email");
      setloading(false);
    } else if (userCred.password === "") {
      setError("Enter Password");
      setloading(false);
    } else {
      signInWithEmailAndPassword(auth, userCred.email, userCred.password)
        .then((res) => {
          setloading(false);
          console.log("success");
          ctx.setUserId(res.user.uid);

          setTimeout(() => {
            user && navigate(`/${res.user.uid}/home`);

          }, 1000);
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
          const errorCode = error.code;
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
      <div className=" Login-Edit position-relative overlay" style={{ height: "100vh" }}>
        <Bgicon1 className={classes.Bgicon1} />
        
        <Bgicon1   className={classes.Bgicon2}/>
        {/* <Bgicon2 className={classes.Bgicon2} /> */}

        <Bgicon3  className={classes.Bgicon3} />
        <Bgicon3  className={classes.Bgicon4}/>
        <Bgicon3  className={classes.Bgicon5} />
        <nav class="navbar navbar-expand-lg navbar-light  headercol ">
          <a class="navbar-brand position-relative" href="#">
            <img
              style={{ width: "8%" }}
              className="img-thumbnail d-inline"
              src={Logo}

              alt=""
            />

            <h2 style={{ top: "0", bottom: "0", left: "0", right: "0" }} className=" mt-2 text-white position-absolute  Login-name text-center" >Fickle</h2>


          </a>

        </nav>



        {/* // <div class=" shadow position-absolute" style={{ zIndex: "999999999", left: "0", right: "0", top: "0", bottom: "0" }} > */}
        <div className="row">
          <div className="col-md-6 marg">
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
          <div className="col-md-6 p-4 ">
            <div className="shadow">
              <div class="modal-dialog modal-login">
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
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          name="email"
                          placeholder=" Enter Email"
                          required="required"
                          value={userCred.email}
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"

                          onChange={onChangeHandler}
                        />
                      </div>
                      {forgotPassword === false && <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          placeholder="Enter Password"
                          required="required"
                          value={userCred.password}
                          id="exampleInputPassword1"

                          onChange={onChangeHandler}
                        />
                      </div>}
                      {error && (
                        <small className=" text-right d-block ">
                          {error}
                        </small>
                      )}
                      <div class="form-group text-center">
                      <button
                         onClick={forgotPassword ? resetHanler : handleLogin}
                          type="submit"
                          style={{
                            
                            fontSize:"20px",
                            color: "#fff",
                            borderRadius: "20px",
                            boxShadow: "0 3px 6px #00000036",
                          }}
                          class="btn mt-3 px-5 btntclr "
                        >
                           {forgotPassword ? "Sent" : "Login"}
                        </button>
                       
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer" onClick={() => { forgotPassword ? setForgotpassword(false) : setForgotpassword(true) }}>
                    <p >   {forgotPassword ? "Back to login" : "Forgot Password"}</p>
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
export default Login;
